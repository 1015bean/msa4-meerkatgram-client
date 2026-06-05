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

    // loginForm: 리퀘스트받은 정보로 DB데이터 불러오기
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
        console.error(error);
        
        throw error;
      }
    }
  }

    // 토큰 재발급: 리퀘스트받은 정보로 DB데이터 불러오기
  const reissue = async () => {
    try {
      const url = '/api/reissue-token';

      const res = await myAxios.post(url);
      const data = res.data.data;
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true;
      
    } catch(error) {
      clearAuthStore();
    }
  }

  const logout = async () => {
    try{
      const url = '/api/logout';

      await myAxios.post(url);
    } catch(error) {
      console.log(error);
    } finally {
      clearAuthStore();
    }
    
  }

  const registration = async(data) => {
    try {
      const url = 'api/registration'

      await myAxios.post(url, data);
      return;

    } catch (error) {
      console.error(error);
      throw error;
      
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
    reissue,
    logout,
    registration
  }
});
