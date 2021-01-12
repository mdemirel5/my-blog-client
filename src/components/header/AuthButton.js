import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';


class AuthButton extends React.Component {

    // If a user is found on the local storage, then the user is signed in
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.props.signIn(user);
        }
    }

    onSingOutClick = () => {
        this.props.signOut();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    }

    renderLoginButton() {
        return (
            <div>
                <Link to="/login" className="ui button">Log in</Link>
                <Link to="/register" className="ui primary button" id="register-button">Register</Link>

            </div>

        );
    };


    renderLogoutButton() {
        return (
            <button id="user-info-button" className="ui button "
                onClick={this.onSingOutClick}>{this.props.name}</button>
        );
    };

    render() {
        return (
            <div className="auth-buttons">
                {this.props.isSignedIn ?
                    this.renderLogoutButton() : this.renderLoginButton()}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        name: state.auth.name_user
    }
}
export default connect(mapStateToProps, { signIn, signOut })(AuthButton);