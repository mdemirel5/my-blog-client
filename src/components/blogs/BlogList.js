import React from 'react';
import { connect } from 'react-redux';
import BlogShow from './BlogShow';
import { fetchBlogs } from '../../actions';
import Login from '../login-register/Login';


class BlogList extends React.Component {

    componentDidMount() {
        this.props.fetchBlogs();
    };

    renderList() {
        const blogs_sorted = this.props.blogs.slice().reverse();
        return blogs_sorted.map((blog, i) => {
            return (
                <div key={i}>
                    <BlogShow blog={blog} />
                </div>
            );
        });
    }
    render() {

        return (
            <div style={{ maxWidth: 660, margin: 'auto' }}>
                {!this.props.isSignedIn &&
                    <Login />}
                {this.props.isSignedIn &&
                    <div className="ui items" >
                        {this.renderList()}
                    </div>}
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