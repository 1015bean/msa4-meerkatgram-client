import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/myAxios";

export const usePostShowStore = defineStore('postShowStore', () => {
  // state
  const post = ref();

  // getters

  // actions
  const getPost =  async (id) => {
    try {
      const url = `/api/posts/${id}`;
      const result = await myAxios.get(url);

      post.value = result.data.data;
    } catch (error) {
      throw error;
    }
  }

  const clearPostShow = () => {
    post.value = null;
  }

  return{
    post,
    getPost,
    clearPostShow,
  }
});
