<template>
    <router-view  :locale="locale"></router-view>
</template>

<script setup>
import {ref,computed } from 'vue'
import en from 'element-plus/dist/locale/en.mjs'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const lange=ref(zhCn)
const locale = computed(() => ( lange.value.name === 'zh-cn' ? zhCn : en))
</script>

<style>
@import url('@/style/main.scss');
#app{
  width: 100%;
  height: 100%;
}

html,body{
  width: 100%;
  height: 100%;
}
</style>
