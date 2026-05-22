<script setup>
import MyError from '../pages/errors/MyError.vue';
import { useMyErrorStore } from '../store/errors/useMyErrorStore';

// myErrorStore의 isError 속성 사용하여 메인화면 출력 설정
const myErrorStore = useMyErrorStore();
</script>

<template>
  <MyError v-if="myErrorStore.isError"></MyError>
  <router-view v-else></router-view>
</template>
