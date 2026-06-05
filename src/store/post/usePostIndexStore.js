// Pinia
// 전체 혹은 복수의 컴포넌트에서 공용으로 사용가능한 데이터를 작성
// store에서 관리하는 데이터는 화면이 리로드 될 때까지 데이터가 남아있음

import { defineStore } from "pinia";
import { computed, ref } from "vue";
import myAxios from "../../api/myAxios";
import useMyErrorStore from "../errors/useMyErrorStore";

const usePostIndexStore = defineStore("postIndex", () => {
  // 1. state (ref, 변수)
  const items = ref([]);
  const isLastPage = ref(false);
  const currentPage = ref(0);

  // 2. getter (computed, state를 기반으로 가공된 값, 읽기 전용)
  const getNextPageNumber = computed(() => currentPage.value + 1);

  // 3. Acttions (function, state 변경 & 로직 실행 메소드)
  const clearPostIndex = () => {
    items.value = [];
    isLastPage.value = false;
    currentPage.value = 0;
  }

  const getPostPagination = async (page = 1) => {
  
    // 가장 마지막 페이지가 아닐 경우만 실행
    if(!isLastPage.value) {
      
      try {
        const url = '/api/posts';
        const params = {
          page,
        };    

        // 백엔드에 데이터 요청해 변수에 저장
        const res = await myAxios.get(url, {params});
        // console.log(res.data);  // 엑시오스가 데이터 잘 받아오는지 확인
        const data = res.data.data;
        isLastPage.value = data.lastpage;  // lastPage 여부
        items.value.push(...data.posts);   // data= [ {}, { posts: item }, {} ], 기존 게시글 + 새 게시글 누적해서 보여주므로 spead문법 사용

        currentPage.value++;
      } catch(error) {
        console.error(error);
        throw error;
      }

    }
  }

  return {
    //state
    items,
    isLastPage,

    //getter
    getNextPageNumber,

    //actions
    clearPostIndex,
    getPostPagination,
  }
});

export default usePostIndexStore;
