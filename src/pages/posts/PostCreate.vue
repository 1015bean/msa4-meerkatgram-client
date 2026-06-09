<script setup>
import { reactive, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import registrationValidator from '../../util/vaildator/domain/auth/registrationValidator';
import { useFileStore } from '../../store/file/useFileStore';

const preview = ref(null);
const selectedFile = ref(null);
const PostCreateData = reactive({
  content: '',
  image: '',
})

const fileStore = useFileStore();

// form @submit 시 실핼할 함수
const handleSubmit = async () => {
  
  // 유효성 검사
  const validationList = [
    registrationValidator.content(PostCreateData.content),
    registrationValidator.image(PostCreateData.image),
  ]

  const errorList = validationList.filter(val => val);
  if( errorList.length > 0 ) {
    alert(errorList.join('\n'));
    return;
  }


}
// // form @submit 시 실행할 함수
// const handleSubmit = async () => {
//   // 유효성 검사
//   const validationList = [
//     registrationValidator.nick(registrationData.nick),
//     registrationValidator.profile(registrationData.profile),
//   ];

//   const errorList = validationList.filter(val => val);

//   if(errorList.length > 0) {
//     alert(errorList.join('\n'));
//     return;
//   }

//   try {
//     await authStore.registration(registrationData)
//     alert("회원가입에 성공했습니다.");
//     router.replace('/login');
//   } catch(error) {
//     const data = error.response.data;
//     if(data.code === "E11") {
//       alert(data.data);
//     } else if(data.code === "E21") {
//       alert("잘못된 방식입니다.");
//     } else {
//         myErrorStore.setErrorInfo(error);
//         router.replace('/error');
//     }
//   }
// }
const handleChangeProfile = async (e) => {
  const file = e.target.files[0];

  if(file) {
    // 기존에 생성된 메모리URL 있다면 해제
    if(preview.value) {
      URL.revokeObjectURL(preview.value);
    }

    // API서버에 파일저장 요청
    const fileUri = await fileStore.uploadPosts(file);

    if(fileUri) {
      selectedFile.value = file;

      //파일객체를 브라우저에서 접근가능한 임시URL로 반환
      preview.value = URL.createObjectURL(file);
    }
  }
}

// // 업로드 파일 서버에 저장 요청
//   // 파일 업로드(input type="file") 이벤트에서 유저가 선택한 파일객체 불러오기
// const handleChangeProfile = async (e) => {
//   const file = e.target.files[0];
  
//   if(file) {
//     // 기존에 생성된 메모리 URL이 있다면 해제(메모리 누수 방지)
//     if(preview.value) {
//       URL.revokeObjectURL(preview.value);
//     }
  
//     // API 서버에 파일 저장 요청
//     const fileUri = await fileStore.uploadProfile(file);

//     if(fileUri) {
//       registrationData.profile = fileUri;
//       selectedFile.value = file;

//       //  파일 객체를 브라우저에서 접근 가능한 임시URL로 변환
//       preview.value = URL.createObjectURL(file);
//     }
//   }
// }
</script>

<template>
  <!-- @submit.prevent = event.preventDefault(): 기본 동작 실행x, 대신 원하는 함수 실행 -->
<form @submit.prevent="handleSubmit">

    <textarea 
      class="content"
      placeholder="게시글 입력"
      required
    ></textarea>
    
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
    :content="'Post'"
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

.content {
  width: 500px;
  height: 300px;
  resize: none;

  outline: none;
}
.content:focus {
  border-color: #000000;
  border-width: 2px; 
}

.preview {
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}

.file-upload-btn{
  padding: 5px;
  border: 1px solid #000000;
  width: 300px;
  text-align: center;
}

#file {
  display: none;
}
</style>
