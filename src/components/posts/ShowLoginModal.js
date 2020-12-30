import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteBlog } from '../../actions';
import Modal from '../Modal'
import Login from '../login-register/Login';

class ShowLoginModal extends Component {

    renderActions() {
        return (
            <React.Fragment>

                <div >
                    <i
                        onClick={this.props.hideModal}
                        className="fas fa-times fa-2x"
                        style={{ cursor: "pointer" }}></i>

                    <h2 className="text-center">Log in to comment or like</h2>
                </div>
                <Login hideModal={this.props.hideModal} />
            </React.Fragment>
        );
    };

    /*  onDismiss = () => {
         this.props.onDismiss
     }; */

    render() {
        if (!this.props.showModal) {
            return null;
        }
        return (
            <Modal
                /* title="Delete Blog" */
                /* content=  *//* {this.renderContent()} */
                actions={this.renderActions()}
                onDismiss={this.props.hideModal}
            />
        )
    };
}

export default connect(null, { deleteBlog })(ShowLoginModal);