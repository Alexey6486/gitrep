import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.github.com/',
});

export const repInfoApi = {
    getRepInfoApi(repOwner: string, repName: string) {
        return instance
            .get(`/repos/${repOwner}/${repName}`)
            .then(res => res.data)
    }
};