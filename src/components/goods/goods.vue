<template>
  <div class="goods">
    <div class="menu-wrapper" id="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item"  :class="{'current':currentIndex==index}" @click="selectMenu(index,$event)">
            <span class="text"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" id="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <!--<cartcontrol :food="food" :select-foods="selectFoods"></cartcontrol>-->
                  <div class="cartcontrol">
                    <transition name="move">
                      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart(food,index,$event)">
                        <span class="inner icon-remove_circle_outline"></span>
                      </div>
                    </transition>
                    <transition :duration="300"><div class="cart-count" v-show="food.count>0">{{food.count}}</div></transition>
                    <div class="cart-add icon-add_circle" @click="addCart(food,index,$event)"></div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectedFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        selectedFoods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = Object.assign({}, this.goods, response.data)
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = document.getElementById('foods-wrapper').getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 500)
      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      },
      _initScroll () {
        this.meunScroll = new BScroll(document.getElementById('menu-wrapper'), {
          click: true
        })
        this.foodsScroll = new BScroll(document.getElementById('foods-wrapper'), {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = document.getElementById('foods-wrapper').getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      addCart(food, index, event) {
        if (!event._constructed) {
          return
        }
        if (!food.count) {
          Vue.set(food, 'count', 1)
        } else {
          food.count++
        }
        let havaFood = 0
        if (this.selectedFoods.length > 0) {
          this.selectedFoods.forEach((_food) => {
            if (_food.name === food.name) {
              havaFood = 1
            }
          })
        }
        if (havaFood === 0) {
          this.selectedFoods.push(food)
        }
        this._drop(event.target)
      },
      decreaseCart(food, index, event) {
        if (!event._constructed) {
          return
        }
        if (food.count) {
          food.count--
        }
      }
    },
    components: {
      shopcart,
      cartcontrol
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display:flex
    position:absolute
    top:174px
    bottom:46px
    width:100%
    overflow:hidden
    .menu-wrapper
      flex:0 0 80px
      width:80px
      background:#f3f5f7
      font-size:0
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        border-1px(rgba(7, 17, 27, 0.1))
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          height: 55px
          background: #fff
          font-weight: 700
          border-none()
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
    .foods-wrapper
      flex:1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            margin-top:1px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
            .cartcontrol
              font-size: 0
              .cart-decrease
                display: inline-block
                padding: 0.43rem
                transition:all 0.4s linear
                .inner
                  line-height: 24px
                  font-size: 24px
                  color: rgb(0, 160, 220)
                &.move-transition
                  opacity:1
                  transform:translate3d(0,0,0)
                  transform:rotate(0)
                &.move-enter, &.move-leave
                  opacity:0
                  transform:translate3d(24px,0,0)
                  transform:rotate(180deg)
              .cart-count
                display: inline-block
                vertical-align: top
                width: 0.3rem
                padding-top: 6px
                line-height: 24px
                text-align: center
                font-size: 10px
                color: rgb(147, 153, 159)
              .cart-add
                display: inline-block
                padding: 0.43rem
                line-height: 24px
                font-size: 24px
                color: rgb(0, 160, 220)
</style>
