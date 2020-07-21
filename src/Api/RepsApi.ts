import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.github.com/',

});

export const repsApi = {
    getReps(currentPage: number) {
        return instance
            .get(`search/repositories?q=all&page=${currentPage}&per_page=5&sort=stars&order=desc`)
            .then(res => res.data);
    },
    setTotalRepsApi() {
        return instance
            .get(`search/repositories?q=all&sort=stars&order=desc`)
            .then(res => res.data.total_count);
    },
};