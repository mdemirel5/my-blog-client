import React, { useState } from 'react';
import { connect } from 'react-redux';
import my_api from '../../apis/my_api';


const CommentAdd = (props) => {
    const [content, setContent] = useState('');

    const onEnterPress = e => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            onCommentSubmit(e);
        }
    };



    const loginText = () => {
        return (
            <p><a href="/login" >Log in</a> <span className="light-gray-text">to like or comment</span> </p>
        );
    };



    const onCommentChange = (event) => {
        setContent(event.target.value);
    };

    const onCommentSubmit = async (e) => {

        e.preventDefault();

        const comment = {
            content: content,
            userId: props.userId
        };


        await my_api.post(`/api/comments/${props.postName}`, comment,
            {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });

        setContent('');

        props.onCommentAdd();

    };

    const commentArea = () => {
        return (
            <form onSubmit={onCommentSubmit}
                className="ui form">
                <div className="field flex-horizontal ">

                    <textarea
                        onChange={onCommentChange}
                        onKeyDown={onEnterPress}
                        rows="3" columns="30"
                        style={{ border: "none", width: "80%", resize: "none", overflow: "hidden" }}
                        autoComplete="off"
                        type="text" placeholder="Add a comment" name="content" value={content} />

                    <button
                        className="ui basic button"
                        type="submit">Post


                    </button>

                </div>

            </form>
        );
    };
    return (
        <div>
            <div className="ui divider"></div>

            {props.isSignedIn ? commentArea() : loginText()}

        </div >
    );
};

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps)(CommentAdd);