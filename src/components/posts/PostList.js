import React from 'react';
import PostShow from './PostShow';

const tiger_img = require('../../images/tiger1.jpg');
const lion_img = require('../../images/lion1.jpg');
const jaguar_img = require('../../images/jaguar1.jpg');

const tiger_att = <span>Photo by <a href="https://unsplash.com/@waldemarbrandt67w?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Waldemar Brandt</a> on <a href="https://unsplash.com/s/photos/tiger?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>;

const lion_att = <span>Photo by <a href="https://unsplash.com/@zingcokoladamatija?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Gloria K</a> on <a href="https://unsplash.com/s/photos/lion?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>;

const jaguar_att = <span>Photo by <a href="https://unsplash.com/@ramon_vloon?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Ramon Vloon</a> on <a href="https://unsplash.com/s/photos/jaguar?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>;

const PostList = () => {
    return (
        <div>

            <PostShow imgSrc={tiger_img} postName="tiger_1" imgAttribution={tiger_att} />
            <PostShow imgSrc={lion_img} postName="lion_1" imgAttribution={lion_att} />
            <PostShow imgSrc={jaguar_img} postName="jaguar_1" imgAttribution={jaguar_att} />

        </div >
    );
};

export default PostList;