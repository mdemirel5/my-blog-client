import axios from 'axios';

const local = 'http://localhost:4000';

const heroku = 'https://my-blog1998.herokuapp.com';

export default axios.create({
    baseURL: heroku
});