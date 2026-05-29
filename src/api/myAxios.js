import axios from "axios";
import { useAuthStore } from "../store/auth/useAuthStore";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const myAxios = axios.create({
  // Axios 호출 시, url 가장 앞부분을 미리 저장해두고 재사용
  baseURL: import.meta.env.VITE_API_BASE_URL,

  // header(http통신 시 설정부분): 데이터 보낼 때 JSON타입으로 보냅시다
  headers: {
    'Content-Type': 'application/json',
  },

  // 크로스 도메인(서로 다른 도메인; 프론트와 백의 도메인 주소가 서로 다를 경우)에 요청을 보낼 때
  // , credential 정보를 담아서 보낼지 여부를 설정
    // credential 정보: cookies, header Authorization(헤더의 메타 데이터 중 하나, 유저의 권한 정보가 담김) 항목 등등
  withCredentials: true,
});


// .interceptors~: 요청이 가는 중에, 원하는 로직이 실행되기 전에 먼저 실행되는 함수
// config: 리퀘스트하는 정보가 포괄적으로 담긴 객체
myAxios.interceptors.request.use(async (config) => {
  const authStore = useAuthStore();
  let accessToken = authStore.accessToken;
  // .reissue() 요청 가는중에 인터셉션(if~로직) 실행될 수 있으므로, 제외할 URL 설정
  const denyUrl = /^\/api\/reissue-token$/;  

  if(!denyUrl.test(config.url) && authStore.isLoggedIn) {
    // 엑세스토큰 만료 확인(시간 비교)
      // : 토큰 정보 추출 > 현재시간 획득 > 토큰 유효시간 획득(5분 빠르게) > 시간 비교
    const claims = jwtDecode(accessToken);
    const now = dayjs().unix();
    const expTime = dayjs.unix(claims.exp).add(-5, 'minute').unix();

    // 토큰 만료시 토큰 재발급
    if(now >= expTime) {
      try{
        await authStore.reissue();
        accessToken = authStore.accessToken;
      } catch(error) {
        console.log(error?.response);
      }
    }
  }

  // 인터셉터 처리는 끝났구요. 여기 엑세스토큰이랑 리쿼스트 정보 드릴게요 하려던 로직 실행하세요.
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default myAxios;
