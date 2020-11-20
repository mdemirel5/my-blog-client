import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteBlog } from '../../actions';
import './BlogShow.css';

class BlogShow extends React.Component {
    state = { deleted: false };

    onDeleteClick = () => {
        this.props.deleteBlog(this.props.obj._id);
        this.setState({ deleted: true })
    }

    renderButtons = () => {
        return (
            <div className="ui buttons">
                <Link to={`/edit/${this.props.obj._id}`} className="ui blue basic btn-link">Edit</Link>
                <button className="ui red basic btn-link"
                    onClick={this.onDeleteClick}>
                    Delete
                </button>
            </div>
        );
    }
    renderBlogAuthor = () => {
        if (this.props.blog.user === undefined) return;

        return (
            <div>
                Written by <span style={{ fontWeight: 600, fontStyle: "italic" }}>
                    {this.props.blog.user.name}
                </span>
            </div>

        );
    };

    render() {
        console.log('Blogshow this.props.obj', this.props.obj);
        if (!this.props.blog) {
            if (this.state.deleted === true) {
                return <div></div>;
            } else {
                return <div></div>
            }
        }

        return (
            <div className="blog-div item m-top-1" >

                <div className="content">
                    <h3 className="">{this.props.obj.title}</h3>
                    <div className="description my-1" >
                        <p>{this.props.obj.content}</p>
                    </div>
                    <div className="meta-data">
                        <div className="m-top-1">
                            {this.props.isSignedIn &&
                                this.renderButtons()}

                        </div>
                        <div className="author">
                            {this.renderBlogAuthor()}
                        </div></div>

                </div>
                <hr />
            </div>
        );
    }

};

const mapStateToProps = (state, ownProps) => {
    return {
        blog: state.blogs[ownProps.obj._id],
        isSignedIn: state.auth.isSignedIn,
        username: state.auth.username,
    };
}
export default connect(mapStateToProps, { deleteBlog })(BlogShow);