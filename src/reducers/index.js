import { combineReducers } from 'redux';
import _ from 'lodash';
import { reducer as formReducer } from 'redux-form';
import {
    FETCH_BLOG,
    FETCH_BLOGS,
    EDIT_BLOG,
    CREATE_BLOG,
    SIGN_IN,
    SIGN_OUT, DELETE_BLOG
} from '../actions/kinds';


const INITIAL_STATE = { isSignedIn: null, name_user: null, userId: null };

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state, isSignedIn: true,
                name_user: action.payload.name,
                userId: action.payload._id
            };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, name_user: null, userId: null };
        default:
            return state;
    }
};

const blogReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_BLOGS: return { ...state, ..._.mapKeys(action.payload, '_id') };
        case FETCH_BLOG: return { ...state, [action.payload._id]: action.payload };
        case EDIT_BLOG: return { ...state, [action.payload._id]: action.payload };
        case CREATE_BLOG: return { ...state, [action.payload._id]: action.payload };
        case DELETE_BLOG: return _.omit(state, action.payload);
        default: return state
    }
};

export default combineReducers({
    blogs: blogReducer,
    auth: authReducer,
    form: formReducer
});