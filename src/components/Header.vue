<script setup>
import { ref } from 'vue';
import MyButton from './button/MyButton.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth/useAuthStore.js';

const authStore = useAuthStore();
const router = useRouter();

//  로그인 화면으로 이동하는 함수
const redirectLogin = () => {
  // .replace: url을 히스토리 스택에 추가하지 않고 이동
  // .push: 히스토리 남기고 이동
  router.push('/login');
}

//  메인화면으로 이동하는 함수
const redirectMain = () => {
  router.push('/posts');
}

const logout = async () => {
  await authStore.logout();
  router.replace('/');
}

const redirectRegistration = () => {
  router.push('/registration');
}
</script>

<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title" @click="redirectMain()">Meerkatgram</h1>
    </div>
      <div class="btn-box">
        <!-- props: 자식:MyButton에 이런 속성으로 하여라 하고 지시(데이터 전달) -->
        <MyButton 
          v-if="!authStore.isLoggedIn"
          @click="redirectLogin()"
          :content="'sign In'"
          :color="'gray'"
          :size="'small'"
          />
          <MyButton 
          v-if="!authStore.isLoggedIn"
          @click="redirectRegistration"
          :content="'sign Up'"
          :color="'white'"
          :size="'small'"
          />
          <MyButton 
          v-if="authStore.isLoggedIn"
          :content="'Logout'"
          :color="'black'"
          :size="'small'"
          @click="logout()" 
          />
      </div>
  </div>
  <hr>
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
  cursor: pointer;
}

.btn-box {
  display: flex;
  gap: 10px;
}
</style>
