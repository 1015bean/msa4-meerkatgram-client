import { defineStore } from "pinia";
import { ref } from "vue";

export const useMyErrorStore = defineStore('myErrorStore', () => {
  // 1. state (ref)
  const isError = ref(false);
  const errorCode = ref('');
  const errorMsg = ref('');

  // 2. getters (computed)
  
  // 3. actions (function)
  const setErrorInfo = (error) => {
      // 옵셔널 체이닝( ?. ): 값이 존재하면 접근, 없으면 undefined 반환
      // error에 response란 요소가 '있으면' 접근합니다.
    const errorData = error.response?.data || {code: 'UNKNOWN_ERROR', message: '예기치 못한 에러가 발생했습니다.'};
    errorCode.value = errorData.code;
    errorMsg.value = errorData.message;
    isError.value = true;
  }

  const clearErrorInfo = () => {
    errorCode.value = '';
    errorMsg.value = '';
    isError.value = false;
  }

  return {
    isError,
    errorCode,
    errorMsg,
    setErrorInfo,
    clearErrorInfo,
  }
})

export default useMyErrorStore;
