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

    render() {
        if (!this.props.blog) {
            if (this.state.deleted === true) {
                return <div></div>;
            } else {
                return <div>Loading...</div>
            }
        }

        return (
            <div className="blog-div">
                <h2>{this.props.obj.title}</h2>
                <p>{this.props.obj.content}</p>
                <div className="ui buttons">
                    <Link to={`/edit/${this.props.obj._id}`} className="ui blue basic button">Edit</Link>
                    <button className="ui red basic button"
                        onClick={this.onDeleteClick}>
                        Delete
                        </button>
                </div>

                <hr />
            </div>
        );
    }

};

const mapStateToProps = (state, ownProps) => {
    return { blog: state.blogs[ownProps.obj._id] };
}
export default connect(mapStateToProps, { deleteBlog })(BlogShow);