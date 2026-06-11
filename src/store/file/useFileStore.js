import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";

export const useFileStore = defineStore('fileStore', () => {
  //state

  //getters

  //actions
  const upload = async (file, url) => {
    try{
      // Form Data 생성
      const data = new FormData();
      data.append('file', file);

      // Content-type 설정(원래 Axios에서 JSON으로 데이터 받기로 했으므로)
      const config = {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }

      const res = await myAxios.post(url, data, config);
      return res.data.data.fileUri;
    
    }catch(error) {
      console.error(error);
      return null;
    }

  }

    // 회원가입(프로필), 게시물 작성(이미지): url설정한 메소드
  const uploadProfile = (file) => {
    return upload(file, '/api/files/profiles');
  }
  const uploadPosts = (file) => {
    return upload(file, '/api/files/posts');
  }

  return {
    upload,
    uploadProfile,
    uploadPosts,
  }
});
