import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteBlog } from '../../actions';
import { Link } from 'react-router-dom';
import Modal from '../Modal'

class DeleteClick extends Component {

    renderActions() {
        return (
            <React.Fragment>
                <button
                    onClick={e => {
                        this.props.deleteBlog(this.props.blog._id);
                        this.onDismiss(e);
                    }}
                    className="ui button negative">Delete</button>
                <Link to="/"
                    onClick={e => this.onDismiss(e)}
                    className="ui button">Cancel</Link>
            </React.Fragment>
        );
    };
    renderContent() {
        if (!this.props.blog.title) {
            return "Are you sure you want to delete this blog?";
        }
        return `Are you sure you want to delete the blog with title "${this.props.blog.title}"?`
    }
    onDismiss = e => {
        this.props.onDismiss && this.props.onDismiss(e);
    };

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <Modal
                title="Delete Blog"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={e => this.onDismiss(e)}
            />
        )
    };
}

export default connect(null, { deleteBlog })(DeleteClick);