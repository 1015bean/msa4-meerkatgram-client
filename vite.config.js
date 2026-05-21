import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  // "개발 서버(localhost)" Proxy 정의
  // Proxy: 크로스 도메인일 경우 보안 때문에 통신이 잘 안 됨. 이를 해결하기 위해 브라우저에게 같은 도메인이라고 인식시킴
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Request 대상 서버 도메인
        changeOrigin: true, // Request Header Host 필드값을 대상 서버 호스트로 변경
        secure: false, // SSL 인증서 검증 무시(개발 환경에서 편하게 하기 위해)
      }
    }
  }
})
