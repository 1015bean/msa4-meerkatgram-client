import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";

export const usePostCreateStore = defineStore('postCreateStore', () => {

  const postCreate = async (data) => {
    try {
      const url = '/api/posts';
      await myAxios.post(url, data);
      return;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    postCreate,
  }
})
