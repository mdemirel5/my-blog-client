import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteBlog } from '../../actions';
import Modal from '../Modal'

class DeleteClick extends Component {

    renderActions() {
        return (
            <React.Fragment>
                <button
                    onClick={() => {
                        this.props.deleteBlog(this.props.blog._id);
                        this.props.hideModal();
                    }}
                    className="ui button negative">Delete</button>
                <button
                    onClick={this.props.hideModal}
                    className="ui button">Cancel</button>
            </React.Fragment>
        );
    };
    renderContent() {
        if (!this.props.blog.title) {
            return "Are you sure you want to delete this blog?";
        }
        return `Are you sure you want to delete the blog with title "${this.props.blog.title}"?`
    }


    render() {
        if (!this.props.showModal) {
            return null;
        }
        return (
            <Modal
                title="Delete Blog"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={this.props.hideModal}
            />
        )
    };
}

export default connect(null, { deleteBlog })(DeleteClick);