import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";

export const useFileStore = defineStore('fileStore', () => {
  //state

  //getters

  //actions
  const uploadProfile = async (file) => {
    try{
      const url = 'api/files/profiles';

      // Form Data 생성
      const data = new FormData();
      data.append('file', file);

      // Content-type 설정(원래 Axios에서 JSON으로 데이터 받기로 했으므로)
      const config = {
        headers: {
          'Content-type': 'multypart/form-data'
        }
      }

      const res = await myAxios.post(url, data, config);
      return res.data.data.fileUri;
    
    }catch(error) {
      console.error(error);
      return null;
    }

  }

  return {
    uploadProfile,
  }
});
