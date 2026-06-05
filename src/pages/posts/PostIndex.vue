<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import usePostIndexStore from '../../store/post/usePostIndexStore';
import { useRouter } from 'vue-router';
import MyError from '../errors/MyError.vue';
import useMyErrorStore from '../../store/errors/useMyErrorStore.js';
  
// ----------------------- 스토어로 이관 start --------------------------------------------------
// 백에서 받아온 데이터를 담아 저장할 변수
  // currentPage의 경우, 데이터바인딩 필요X (데이터값이 바뀌면 화면 리로딩 해야함)
// const posts = ref([]);
// const isLastPage = ref(false);
// let currentPage = 0;

// 페이지 불러오는 함수
  // curruntPage 원본을 직접적으로 수정하면 getPostPaginaition이 오류났을 때 curruntPage만 2로 늘어남.
  // 따라서 getPageNation에 파라미터로 page값을 지정해주는 방식을 사용
  // 메소드(page = 1): 디폴트 파라미터. 파라미터 값 초기화
// const getPostPagination = async (page = 1) => {
  
//   // 가장 마지막 페이지가 아닐 경우만 실행
//   if(!isLastPage.value) {

//     try {
//       const url = '/api/posts';
//       const params = {
//         page,
//       };
  
//       // 백엔드에 데이터 요청해 변수에 저장
//       const res = await myAxios.get(url, {params});
//       // console.log(res.data);  // 엑시오스가 데이터 잘 받아오는지 확인
//       const data = res.data.data;
//       isLastPage.value = data.lastpage;  // lastPage 여부
//       posts.value.push(...data.posts);   // data= [ {}, { posts: item }, {} ], 기존 게시글 + 새 게시글 누적해서 보여주므로 spead문법 사용

//       currentPage++;
//     } catch(error) {
//       console.log(error);
//     }
//   }
// }
// ----------------------- 스토어로 이관 end --------------------------------------------------

// store 사용
const postIndexStore = usePostIndexStore();
const router = useRouter();
const myErrorStore = useMyErrorStore();

const getPagination = async (page = 1) => {
  try {
    await postIndexStore.getPostPagination(page);
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace('/error');
  }
}

// 다음 페이지 불러오는 함수
const getNextPage = async () => {
  await getPagination(postIndexStore.getNextPageNumber);
}

// 상세 게시글 page로 이동하는 함수
const redirectShow = (id) => {
  router.push(`/posts/${id}`);
}

// 라이프 사이클: 화면 랜딩 시 메소드 실행
onBeforeMount(getPagination);

// 라이프 사이클: 화면 꺼질 때 postIndex 변수값 초기화
onBeforeUnmount(postIndexStore.clearPostIndex);

</script>

<template>
  <div class="card-container">
    <div 
      v-for="item in postIndexStore.items"
      :key="item.id"
      class="card"
      :style="{backgroundImage: `url(${item.image})`}"
      @click="redirectShow(item.id)"
    ></div>
  </div>
  <MyButton
    v-if="!postIndexStore.isLastPage" 
    :color="'gray'"
    :size="'big'"
    :content="'more posts form dazzing'" 
    @click="getNextPage()"
  />
</template>

<style scoped>
.card-container {
  gap: 10px;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.card {
  border-radius: 10px;
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
