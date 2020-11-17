import React from 'react';
import { connect } from 'react-redux';
import BlogShow from './BlogShow';
import { fetchBlogs } from '../../actions';


class BlogList extends React.Component {

    componentDidMount() {
        this.props.fetchBlogs();
        setTimeout(() => {
            console.log('Bloglist', this.props.blogs);
        }, 1000);

    };

    renderList() {
        const blogs_sorted = this.props.blogs.slice().reverse();
        return blogs_sorted.map((data, i) => {
            return (
                <div key={i}>
                    <BlogShow obj={data} obj2={i} />
                </div>
            );
        });
    }
    render() {
        return (
            <div style={{ maxWidth: 660, margin: 'auto' }}>
                {this.renderList()}
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        blogs: Object.values(state.blogs),
        isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProps, { fetchBlogs })(BlogList);