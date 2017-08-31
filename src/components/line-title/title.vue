<template>
  <div class="line-title">
    <div class="line"></div>
    <div class="text">{{ text }}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .line-title
    margin:28px auto 0px auto
    width:80%
    display:flex
    .line
      flex:1
      height:1px
      border-bottom:1px solid rgba(255,255,255,0.2)
      margin-top:6px
    .text
      margin:0px 12px
      font-size:14px
      font-weight:700
</style>
