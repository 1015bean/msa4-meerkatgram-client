<script setup>
import { reactive, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';
import { useFileStore } from '../../store/file/useFileStore.js';
import { useAuthStore } from '../../store/auth/useAuthStore.js';
import { useRouter } from 'vue-router';
import registrationValidator from '../../util/vaildator/domain/auth/registrationValidator.js';
import useMyErrorStore from '../../store/errors/useMyErrorStore.js';

const fileStore = useFileStore();
const authStore = useAuthStore();
const router =  useRouter();
const myErrorStore = useMyErrorStore();

const preview = ref(null);
const selectedFile = ref(null);
const registrationData = reactive({
  email: '',
  password: '',
  passwordChk: '',
  nick: '',
  profile: '',
})


// form @submit 시 실행할 함수
const handleSubmit = async () => {
  // 유효성 검사
  const validationList = [
    registrationValidator.email(registrationData.email),
    registrationValidator.password(registrationData.password),
    registrationValidator.passwordChk(registrationData.password, registrationData.passwordChk),
    registrationValidator.nick(registrationData.nick),
    registrationValidator.profile(registrationData.profile),
  ];

  const errorList = validationList.filter(val => val);

  if(errorList.length > 0) {
    alert(errorList.join('\n'));
    return;
  }

  try {
    await authStore.registration(registrationData);
    alert("회원가입에 성공했습니다.");
    router.replace('/login');
  } catch(error) {
    const data = error.response.data;
    if(data.code === "E11") {
      alert(data.data);
    } else if(data.code === "E21") {
      alert("잘못된 방식입니다.");
    } else {
        myErrorStore.setErrorInfo(error);
        router.replace('/error');
    }
  }
}

// 업로드 파일 서버에 저장 요청
  // 파일 업로드(input type="file") 이벤트에서 유저가 선택한 파일객체 불러오기
const handleChangeProfile = async (e) => {
  const file = e.target.files[0];
  
  if(file) {
    // 기존에 생성된 메모리 URL이 있다면 해제(메모리 누수 방지)
    if(preview.value) {
      URL.revokeObjectURL(preview.value);
    }
  
    // API 서버에 파일 저장 요청
    const fileUri = await fileStore.uploadProfile(file);

    if(fileUri) {
      registrationData.profile = fileUri;
      selectedFile.value = file;

      //  파일 객체를 브라우저에서 접근 가능한 임시URL로 변환
      preview.value = URL.createObjectURL(file);
    }
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
    v-model="registrationData.email"
    ></MyInput>
    
    <MyInput
    :type="'password'"
    :placeholder="'password'"
    :readonly="false"
    :required="true"
    v-model="registrationData.password"
    ></MyInput>
    
    <MyInput
    :type="'password'"
    :placeholder="'passwordChk'"
    :readonly="false"
    :required="true"
    v-model="registrationData.passwordChk"
    ></MyInput>
    
    <MyInput
    :type="'text'"
    :placeholder="'Nick'"
    :readonly="false"
    :required="true"
    v-model="registrationData.nick"
    ></MyInput>
    
    <div 
    class="preview"
    v-if="preview"
    :style="{backgroundImage: `url(${preview})`}"
    ></div>
    
    <label for="file" class="file-upload-btn">File Upload</label>
    <input 
    type="file" 
    accept="image/*" 
    id="file"
    @change="handleChangeProfile"
    >

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

.preview {
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
</style>
