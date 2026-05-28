import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/myAxios";
import useMyErrorStore from "../errors/useMyErrorStore";

export const useAuthStore = defineStore('authStore', () => {
  // State
  const isLoggedIn = ref(false);
  const accessToken = ref('');
  const userInfo = ref(null);

  // Getters

  // Actions
  
    // 인증정보 초기화
  const clearAuthStore = () => {
    isLoggedIn.value = false;
    accessToken.value = '';
    userInfo.value = null;
  }

    // 리퀘스트받은 정보로 DB데이터 불러오기
  const login = async (loginForm) => {
    try{
      const url = '/api/login';

      const res = await myAxios.post(url, loginForm);
      const data = res.data.data;
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true;

    } catch(error) {
      if(error.response) {
        if(error.response.data.code === 'E01') {
          alert(error.response.data.data);
          return;
        }
      }
      
      useMyErrorStore().setErrorInfo(error);
    }
  }

  return {
    // stare
    isLoggedIn,
    accessToken,
    userInfo,

    // getters

    // actions
    login,
  }
});
