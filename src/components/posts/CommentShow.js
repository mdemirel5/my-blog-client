import React, { } from 'react';
import { connect } from 'react-redux';

import my_api from '../../apis/my_api';

const CommentShow = (props) => {
    //variables to show
    const { content } = props.comment;
    const author = props.comment.user.name;

    //variables required for the delete operation
    const authorId = props.comment.user._id;
    const postName = props.comment.postName;
    const commentId = props.comment._id;

    const userId = props.userId;

    const onDeleteClick = async (e) => {
        if (authorId === userId) {
            await my_api.delete(`/api/comments/${postName}/${commentId}`,
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                });

            props.onCommentDelete();
        } else {
            alert('you are not authorized')
        }
    };

    const renderDeleteButton = () => {
        return (
            <div className="ui buttons">
                <button className=" red btn-link"
                    onClick={onDeleteClick}>
                    Delete
                </button>
            </div>
        );
    };

    return (
        <div className="comment flex-horizontal">
            <div className="content ">
                <span className="author">{author}</span>
                <div className="text">
                    {content}
                </div>
            </div>
            <div>
                {authorId === userId &&
                    renderDeleteButton()}
            </div>
        </div>
    );
};
const mapStateToProps = state => {
    return { userId: state.auth.userId };
}
export default connect(mapStateToProps)(CommentShow);