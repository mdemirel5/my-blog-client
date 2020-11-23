import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import DeleteClick from './DeleteClick';
import { deleteBlog } from '../../actions';
import history from '../../history';
import './BlogShow.css';



class BlogShow extends React.Component {
    state = { deleted: false, show: false };

    onDeleteClick = () => {
        if (this.props.userId === this.props.blog.user._id) {
            this.setState({ show: true });
        } else {
            alert('Only the author of this blog can delete this blog');
        }

    }

    onEditClick = () => {
        if (this.props.userId !== this.props.blog.user._id) {
            alert('Only the author of this blog can delete this blog');
            history.push("/");
        }
    }

    renderButtons = () => {
        return (
            <div className="ui buttons">
                <button className=" blue button btn-link"
                    onClick={this.onEditClick}>
                    <Link to={`/edit/${this.props.blog._id}`}>Edit</Link>
                </button>

                <button className=" red btn-link"
                    onClick={() => this.onDeleteClick()}>
                    Delete
                </button>
            </div>
        );
    }

    renderBlogDate = () => {
        const { blog } = this.props;

        if (blog.updatedAt === undefined) return;

        const updatedAt = moment(blog.updatedAt).format('DD.MM.YYYY');

        return (
            <span >
                {`${updatedAt}  `}
            </span>
        )
    }
    renderBlogAuthor = () => {
        const { blog } = this.props;

        if (!blog.user) {
            return <span></span>;
        }

        return (
            <span>
                <span style={{ fontWeight: 600, fontStyle: "italic" }}>
                    {blog.user.name}
                </span>
            </span>

        );
    };

    showModal = () => {
        this.setState({
            show: false
        });
    };

    render() {
        if (!this.props.blog) {
            return <div></div>;
        }

        return (
            <div className="blog-div m-top-1" style={{ fontSize: "16px" }}>
                {/*  <div id="modal"></div> */}

                <DeleteClick

                    onDismiss={this.showModal}
                    show={this.state.show}
                    blog={this.props.blog} />
                <div className="comment">
                    <div className="content">
                        <h3 className="">{this.props.blog.title}</h3>
                        <div className="description my-1" >
                            <p>{this.props.blog.content}</p>
                        </div>
                        <div className="meta-data">
                            <div className="m-top-1">
                                {this.props.isSignedIn &&
                                    this.renderButtons()}

                            </div>
                            <div>
                                <span className="date" style={{ opacity: "0.7" }}>{this.renderBlogDate()}</span>
                                <span className="author">
                                    {this.renderBlogAuthor()}
                                </span>
                            </div>

                        </div>

                    </div>
                    <hr />
                </div>
            </div>
        );
    }

};

const mapStateToProps = (state, ownProps) => {
    return {
        blog: state.blogs[ownProps.blog._id],
        isSignedIn: state.auth.isSignedIn,
        name_user: state.auth.name_user,
        userId: state.auth.userId
    };
}
export default connect(mapStateToProps, { deleteBlog })(BlogShow);