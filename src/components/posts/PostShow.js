import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import my_api from '../../apis/my_api';
import CommentList from './CommentList';
import ShowLoginModal from './ShowLoginModal';

const PostShow = (props) => {
    const { postName } = props;

    const [liked, setLiked] = useState(null);
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [heartIcon, setHeartIcon] = useState(faHeartRegular);
    const [showModal, setShowModal] = useState(false);
    let userId = null;
    if (localStorage.getItem('user')) { userId = JSON.parse(localStorage.getItem('user'))._id; }


    useEffect(() => {
        my_api.get(`/api/likes/${postName}`)
            .then(response => {
                console.log(userId)
                setNumberOfLikes(response.data.length);
                response.data.map(like => {
                    if (like.userId === userId) {
                        setLiked(true);
                        setHeartIcon(faHeartSolid);
                        console.log('already liked', postName)
                    }
                });
            });


        /* const getLikes = async () => {
            const response = await my_api.get(`/api/likes/${postName}`);
            

        };

        getLikes(); */

    }, []);

    /* useEffect in sonunda [postName, userId] vardi, kaldirdim */


    const onHeartClick = async () => {
        if (props.isSignedIn !== true) {
            return setShowModal(true);
        }

        if (!liked) {
            await my_api.post('/api/likes/upLike', {
                userId: userId,
                postName: postName
            },
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                });

            setLiked(true);
            setHeartIcon(faHeartSolid);
            setNumberOfLikes(numberOfLikes + 1);
        } else if (liked) {
            // We send a request to cancel the like
            await my_api.post('/api/likes/unLike', {
                userId: userId,
                postName: postName
            },
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                });

            setLiked(false);
            setHeartIcon(faHeartRegular);
            setNumberOfLikes(numberOfLikes - 1);
        }

    };

    const hideModal = () => {
        setShowModal(false);
    }
    return (
        <div className="padding-y-2">
            <ShowLoginModal
                hideModal={hideModal}
                showModal={showModal}
            />
            <img src={props.imgSrc} style={{ width: "100%", borderRadius: "2%" }} alt={postName} />


            <div id="below-post" >
                <div id="show-likes">
                    <FontAwesomeIcon onClick={onHeartClick} icon={heartIcon} className="fa-fill"
                        style={{ cursor: "pointer", color: "#e34544", fontWeight: 900 }} />

                    <span style={{ margin: "0 0.5rem" }}>{numberOfLikes} likes </span>
                </div>
                <span style={{ fontSize: "0.9rem" }}>{props.imgAttribution}</span>


            </div>
            <CommentList postName={postName} />
        </div>
    );
};

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps)(PostShow);