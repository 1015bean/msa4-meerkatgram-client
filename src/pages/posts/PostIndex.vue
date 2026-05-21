<script setup>
import { onBeforeMount, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import myAxios from '../../api/myAxios';

// todo: 테스용 나중에 삭제 start
const testList = [
  "test/bookWater.jpg"
  , "test/catSwim2.jpg"
  , "test/catWater.jpg"
  , "test/wallKingyou.jpg"
  , "test/bubble.jpg"
  , "test/catFish.jpg"
  , "test/huuring.jpg"
  , "test/kurage.jpg"
  , "test/kingyouBig.jpg"
  , "test/catSwim.jpg"
  , "test/catSea.jpg"
  , "test/catKingyou.jpg"
  , "test/kingyou.jpg"
  ]
  // todo: 테스용 나중에 삭제 end
  
// -------------------------------------------------------------------------
// 백에서 받아온 데이터를 담아 저장할 변수
  // currentPage의 경우, 데이터바인딩 필요X (데이터값이 바뀌면 화면 리로딩 해야함)
const posts = ref([]);
const isLastPage = ref(false);
let currentPage = 1;

// 다음 페이지 불러오는 함수
const getPostPagination = async () => {
  
  // 가장 마지막 페이지가 아닐 경우만 실행
  if(!isLastPage.value) {

    try {
      const url = '/api/posts';
      const params = {
        page: currentPage,
      };
  
      // 백엔드에 데이터 요청해 변수에 저장
      const res = await myAxios.get(url, {params});
      // console.log(res.data);  // 엑시오스가 데이터 잘 받아오는지 확인
      const data = res.data.data;
      isLastPage.value = data.lastpage;  // lastPage 여부
      posts.value.push(...data.posts);   // data: {}, { posts: item }, {}

    } catch(error) {
      console.log(error);
    }
  }
}

// 라이프 사이클: 화면 랜딩 시 메소드 실행
onBeforeMount(getPostPagination);

</script>

<template>
  <div class="card-container">
    <div 
      v-for="item in posts"
      :key="item.id"
      class="card"
      :style="{backgroundImage: `url(${item.image})`}"
    ></div>
  </div>
  <MyButton
    v-if="!isLastPage" 
    :color="'gray'"
    :size="'big'"
    :content="'more posts form dazzing'" 
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
