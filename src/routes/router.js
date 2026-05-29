import PostIndex from "../pages/posts/PostIndex.vue";
import { createRouter, createWebHistory } from "vue-router";
import MyError from "../pages/errors/MyError.vue";
import Login from "../pages/auth/Login.vue";
import { useAuthStore } from "../store/auth/useAuthStore.js";

// **route(라우트): URL경로(path)와 화면(컴포넌트)을 연결해주는 규칙** 
 // => 이 url(path)일 때, 이 컴포넌트(redirect)를 출력하시오
 // meta: 페이지 이용가능한 권한

const setMeta = (isAuthenticated, isGuestOnly) => {
  return {
    isAuthenticated,
    isGuestOnly,
  }
}

const routes = [
  {
    path: '/',
    redirect: '/posts',
    meta: setMeta(false, false),
  },
  // 인증 관련
  {
    path: '/login',
    component: Login,
    meta: setMeta(false, true),
  },
  // 게시글 관련
  {
    path: '/posts',
    component: PostIndex,
    meta: setMeta(false, false),
  },
  // // 에러 관련
  // {
  //   path: '/errors',
  //   component: MyError,
  // }
];

// router(라우터): 지정해둔 라우트들을 바탕으로, 실행되는 함수 
  // => '이 url일 때, 이 컴포넌트를 출력하시오" '예 출력하겠소'하는 녀석
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// --------------------------------------------------------------------------
// 네비게이션 가드
  // .beforeEach: 라우터의 각 객체가 실행되기 전에 해당코드 먼저처리
  // to:이동할 라우터객체, from:이동하기 전 라우터객체, next:라우터의 이동을 제어하는 함수
router.beforeEach(async (to, from, next) => {
  
  // authStore 임포트
  const authStore = useAuthStore(); 

  // Access Token없을 때(!isLoggedIn), 토큰 재발급 시도
  if(!authStore.isLoggedIn) {
    try{
      await authStore.reissue();
    } catch(error) {
        // alert('로그인 기간이 만료되었습니다.\n다시 로그인해주십시오.');
        // return next('/login');
    }
  } 

  // 인증 필요한 페이지인데, 로그인 안 된 경우 > 로그인 페이지로 이동
  if(to.meta.isAuthenticated && !authStore.isLoggedIn) {
    return next('/login');
  }

  // 게스트만 접근가능한 페이지인데, 로그인 중인 경우 > 메인페이지로 이동
  if(to.meta.isGuestOnly && authStore.isLoggedIn) {
    return next('/main');
  }

  // 나머지는 통과
  next();

});

export default router;
