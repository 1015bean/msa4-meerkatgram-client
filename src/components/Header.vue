<script setup>
import { ref } from 'vue';
import MyButton from './button/MyButton.vue';

// todo: 로그인 추가시 변경 필요 START
const isloggedIn = ref(false);
// todo: 로그인 추가시 변경 필요 END
</script>

<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title">Meerkatgram</h1>
    </div>
      <div class="btn-box">
        <!-- props: 자식:MyButton에 이런 속성으로 하여라 하고 지시(데이터 전달) -->
        <MyButton 
          v-if="!isloggedIn"
          :content="'sign In'"
          :color="'gray'"
          :size="'small'"
          />
          <MyButton 
          v-if="!isloggedIn"
          :content="'sign Up'"
          :color="'white'"
          :size="'small'"
          />
          <MyButton 
          v-if="isloggedIn"
          :content="'Logout'"
          :color="'black'"
          :size="'small'"
          />
      </div>
  </div>

 </template>

<style scoped>
.header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.title-box {
  display: flex;
  align-items: center;
}

.title {
  font-size: 20px;
}

.btn-box {
  display: flex;
  gap: 10px;
}
</style>
