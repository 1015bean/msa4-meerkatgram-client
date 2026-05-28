import axios from "axios";

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

export default myAxios;
