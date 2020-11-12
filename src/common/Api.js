import axios from 'axios';

const url = 'https://my-json-server.typicode.com/amir1411/mac-notes';
export default {
    getList: () => axios.get(`${url}/db`)
}
