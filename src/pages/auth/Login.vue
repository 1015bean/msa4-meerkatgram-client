<script setup>
import { reactive } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';
import MyStrikeThroughBehindeWord from '../../components/decoration/MyStrikeThroughBehindeWord.vue';
import { useAuthStore } from '../../store/auth/useAuthStore.js';
import { useRouter } from 'vue-router';
import loginValidator from '../../util/vaildator/domain/auth/loginValidator.js';

const authStore = useAuthStore();
const router = useRouter();

// 자식(<MyInput>)으로부터 받아야하므로 데이터바인딩 객체:reactive() 사용
const loginForm = reactive({
  email: '',
  password: '',
})

// form @submit 시 실행할 함수
const handleSubmit = async () => {
  // 이메일&비번 유효성 검사
  const resultValidationEmail = loginValidator.email(loginForm.email);
  const resultValidationPassword = loginValidator.password(loginForm.password);

  if(!resultValidationEmail && !resultValidationPassword) {
    // 유효성 검사 통과 패턴
    await authStore.login(loginForm);
    router.replace('/posts');
  } else {
    // 유효성 검사 실패 패턴
    alert(`${resultValidationEmail}\n${resultValidationPassword}`);
  }
}
</script>

<template>
  <!-- @submit.prevent = event.preventDefault(): 기본 동작 실행x, 대신 원하는 함수 실행 -->
<form @submit.prevent="handleSubmit">

  <!-- 
    <MyInput> 컴포넌트 그대로 가져와서 쓸게요~ 
    v-model: input 태그와 연결됨 = 실제로는 Login컴포넌트가 아니라 MyInput컴포넌트에 정보 입력되는 중
    -->
  <MyInput
    :type="'email'"
    :placeholder="'Email'"
    :readonly="false"
    :required="true"
    v-model="loginForm.email"
  ></MyInput>

  <MyInput
    :type="'password'"
    :placeholder="'password'"
    :readonly="false"
    :required="true"
    v-model="loginForm.password"
  ></MyInput>

  <MyButton
  :btnType="'submit'"
  :color="'gray'"
  :size="'middle'"
  :content="'Login'"
  />

  <MyStrikeThroughBehindeWord
    :content="'or'"
  />

  <MyButton
    :btnType="'button'"
    :color="'white'"
    :size="'middle'"
    :content="'Sign Up'"
  />
</form>
</template>

<style scoped>
form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
