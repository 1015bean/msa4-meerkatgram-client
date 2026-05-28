import PostIndex from "../pages/posts/PostIndex.vue";
import { createRouter, createWebHistory } from "vue-router";
import MyError from "../pages/errors/MyError.vue";
import Login from "../pages/auth/Login.vue";

 // **route(라우트): URL경로(path)와 화면(컴포넌트)을 연결해주는 규칙** 
  // => 이 url일 때, 이 컴포넌트를 출력하시오
const routes = [
  {
    path: '/',
    redirect: '/posts'
  },
  // 인증 관련
  {
    path: '/login',
    component: Login,
  },
  // 게시글 관련
  {
    path: '/posts',
    component: PostIndex,
  },
  // // 에러 관련
  // {
  //   path: '/errors',
  //   component: MyError,
  // }
];

// router(라우터): 지정해둔 라우트들을 바탕으로, 실행되는 함수 
  // => '이 url일 때, 이 컴포넌트를 출력하시오" '예 출력하겠소'하는 녀석
const router =createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
