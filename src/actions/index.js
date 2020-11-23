import history from '../history';
import my_api from '../apis/my_api';
import {
    FETCH_BLOG,
    FETCH_BLOGS,
    EDIT_BLOG,
    SIGN_IN,
    SIGN_OUT, CREATE_BLOG, DELETE_BLOG
} from './kinds';

export const signIn = (user) => {
    return {
        type: SIGN_IN,
        payload: user
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const fetchBlogs = () => async dispatch => {
    const response = await my_api.get('/blogs', {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    });

    dispatch({
        type: FETCH_BLOGS,
        payload: response.data
    });
};
export const fetchBlog = id => async dispatch => {
    const response = await my_api.get(`/blogs/${id}`);

    dispatch({
        type: FETCH_BLOG,
        payload: response.data
    })
};

export const editBlog = (id, blog) => async dispatch => {
    const response = await my_api.put(`blogs/${id}`,
        blog,
        {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });

    dispatch({
        type: EDIT_BLOG,
        payload: response.data
    });
    history.push("/");
};

export const createBlog = (blog) => async dispatch => {
    const response = await my_api.post('/blogs',
        blog,
        {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });

    dispatch({
        type: CREATE_BLOG,
        payload: response.data
    });
    history.push("/");
};

export const deleteBlog = id => async dispatch => {
    await my_api.delete(`/blogs/${id}`, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    });

    dispatch({
        type: DELETE_BLOG,
        payload: id
    });

    alert('Your blog has been deleted');
};