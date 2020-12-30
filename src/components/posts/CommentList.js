import React, { useState, useEffect } from 'react';
import my_api from '../../apis/my_api';

import CommentShow from './CommentShow.js';
import CommentAdd from './CommentAdd';


const CommentList = (props) => {
    const { postName } = props;

    const [comments, setComments] = useState([]);

    const [commentChanged, setCommentChanged] = useState(false);

    // zuerst werden wir the meinungen für die post bekommen
    // first we will get the comments for the given post
    useEffect(() => {
        const getComments = async () => {
            const response = await my_api.get(`/api/comments/${postName}`);

            setComments(response.data);
        };

        getComments();


    }, [commentChanged, postName]);


    const onCommentChange = () => {
        setCommentChanged(!commentChanged);
    };

    const renderComments = () => {
        return comments.map((comment, index) => {
            return (
                <div key={index} >
                    <CommentShow comment={comment} onCommentDelete={onCommentChange} />
                </div>
            );
        });
    };

    return (
        <div className="ui comments border-gray padding-1">
            <div className="ui dividing header">Comments</div>
            <div>
                {renderComments()}
            </div>
            <CommentAdd postName={postName} onCommentAdd={onCommentChange} />
        </div>
    );
};

export default CommentList;