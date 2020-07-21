import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.github.com/',

});

export const RepsApi = {
  getReps(currentPage: number) {
      return instance
          .get(`search/repositories?q=all&page=${currentPage}&per_page=10&sort=stars&order=desc`)
          .then(res => res.data);
  }
};