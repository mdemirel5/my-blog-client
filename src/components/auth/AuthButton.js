import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';

class AuthButton extends React.Component {

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.props.signIn(user);
        }
    }
    renderLoginButton() {
        return (
            <div>
                {/*   <Link to="/register" className="ui blue button">Register</Link>
                    <Link to="/login" className="ui button">Login</Link> */}
            </div>

        );
    };

    onSingOutClick = () => {
        this.props.signOut();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    renderLogoutButton() {
        return (
            <button className="ui button" style={{ width: "110px" }}
                onClick={this.onSingOutClick}>Sign out</button>
        );
    };

    render() {
        return (
            <div>
                {this.props.isSignedIn ? this.renderLogoutButton() : this.renderLoginButton()}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
}
export default connect(mapStateToProps, { signIn, signOut })(AuthButton);