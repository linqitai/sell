<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt=""/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail" transition="fade">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <v-title :text="titleText.discountText"></v-title>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="support in seller.supports">
                <span class="icon" :class="classMap[support.type]"></span>
                <span class="description">{{support.description}}</span>
              </li>
            </ul>
            <v-title :text="titleText.sellerBulletin"></v-title>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star'
  import title from '../line-title/title'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false,
        titleText: {
          discountText: '优惠信息',
          sellerBulletin: '商家公告'
        }
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      showDetail: function () {
        this.detailShow = true
      },
      hideDetail: function () {
        this.detailShow = false
      }
    },
    components: {
      star,
      'v-title': title
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      overflow:hidden
      padding: 24px 12px 18px 24px
      font-size:0
      display:flex
      .avatar
        display:inline-block
        img
          border-radius: 2px
      .content
        flex:1
        margin-left: 16px
        vertical-align: top
        .title
          margin: 2px 0 8px 0
          display:flex
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            flex:1
            width:100%
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            vertical-align: top
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height: 12px
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      clear:both
      position:relative
      height:28px
      line-height:28px
      white-space: nowrap
      overflow:hidden
      text-overflow: ellipsis
      padding:0 22px 0 12px
      background: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display: inline-block
        vertical-align: middle
        width:22px
        height:12px
        bg-image('bulletin')
        background-size: 22px 12px
      .bulletin-text
        font-size:10px
        margin:0 4px
      i
        position: absolute
        font-size: 10px
        right: 12px
        top: 10px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background-color:rgba(0,0,0,0.8)
      backdrop-filter: blur(10px)
      /* 设置持续时间和动画函数 */
      &.fade-enter-active
        transition: all .5s ease;
      &.fade-leave-active
        transition: all .3s ease;
      &.fade-enter, &.fade-leave-to
        opacity: 0;
      .detail-wrapper
        min-height:100%
        width: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top:16px
            text-align:center
          .supports
            margin: 24px auto 0 auto
            width:80%
            padding:0px 12px
            .support-item
              line-height:16px
              margin:0 12px 12px 12px
              font-size:0
              &:last-child
                margin-bottom:0
              .icon
                display:inline-block
                vertical-align:top
                width:16px
                height:16px
                background-size:16px 16px
                background-repeat:no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .description
                margin-left:6px
                font-size:12px
                line-height:16px
                font-weight:200
          .bulletin
            width: 80%
            margin: 24px auto 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0px auto
        clear: both
        font-size: 32px
</style>


