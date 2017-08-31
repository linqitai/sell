<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to="/Goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/Ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="/Seller">商家</router-link></div>
    </div>
    <transition name="component-fade" mode="out-in">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue'
  const ERR_OK = 0
  export default {
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data)
          console.log(response.data)
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>
<style  lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
              display: block
              font-size: 14px
              color: rgb(77, 85, 93)
              &.active
               color: rgb(240, 20, 20)
  .component-fade-enter-active, .component-fade-leave-active
    transition: opacity .1s ease;

  .component-fade-enter, .component-fade-leave-to
    opacity: 0;
</style>
