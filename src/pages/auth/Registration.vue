<script setup>
import MyButton from '../../components/button/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';


// // form @submit 시 실행할 함수
const handleSubmit = async () => {

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
  ></MyInput>

  <MyInput
    :type="'password'"
    :placeholder="'password'"
    :readonly="false"
    :required="true"
  ></MyInput>

  <MyInput
    :type="'password'"
    :placeholder="'passwordChk'"
    :readonly="false"
    :required="true"
  ></MyInput>

  <MyInput
    :type="'text'"
    :placeholder="'Nick'"
    :readonly="false"
    :required="true"
  ></MyInput>
  <label for="file" class="file-upload-btn">File Upload</label>
  <input type="file" accept="image/*" id="file">

  <MyButton
  :btnType="'submit'"
  :color="'black'"
  :size="'middle'"
  :content="'Sign Up'"
  />


</form>
</template>

<style scoped>
#file {
  display: none;
}

.file-upload-btn{
  padding: 5px;
  border: 1px solid #000000;
  width: 300px;
  text-align: center;
}

form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
