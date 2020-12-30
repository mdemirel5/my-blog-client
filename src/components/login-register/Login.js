import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import history from '../../history';
import { signIn } from '../../actions';
import my_api from '../../apis/my_api';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        error: '',
        submitted: '',
        loading: ''
    };

    onUsernameChange = e => {
        this.setState({ username: e.target.value });
    };

    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    };

    onLoginSubmit = e => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;

        // stop here if form is invalid
        if (!username || !password) return;

        this.setState({ loading: true });

        const user = _.pick(this.state, ['username', 'password']);

        this.login(user);
    }

    loginAsGuest = () => {
        this.login({ username: 'guest', password: '123' });
    };

    login = user => {
        my_api.post('/api/auth', user)
            .then((res) => {
                // Save the Jtw and user info to the local storage
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));

                // Clear password and redirect home
                this.props.signIn(res.data.user);
                this.setState({ password: '' });

                if (this.props.hideModal) {
                    this.props.hideModal();
                } else {
                    history.push('/');
                }


            }

            )
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }


    renderError(error) {
        if (!error) {
            return <div>Connection Problem</div>;
        } else if (error.response.status === 400) {
            return <div>Username or password is wrong</div>
        }
    }

    render() {
        const { username, password, error, submitted, loading } = this.state;
        return (
            <div style={{ marginTop: "4rem", width: "90%", margin: "auto" }}>
                <form className="ui form" onSubmit={this.onLoginSubmit}>
                    <div className="field">
                        <label style={{ textAlign: "left" }} >Username: </label>
                        <input type="text" value={username} onChange={this.onUsernameChange} />
                        {submitted && !username &&
                            <div>Username is reqired!</div>
                        }
                    </div>
                    <div className="field">
                        <label style={{ textAlign: "left" }} >Password: </label>
                        <input type="password"
                            value={password}
                            onChange={this.onPasswordChange} />
                        {submitted && !password &&
                            <div>Password is required!</div>}
                    </div>
                    <div className="field">
                        <button
                            className="ui blue button btn-block"
                            type="submit"
                        >Log in
                        </button>
                        {loading &&
                            <div className="ui segment">
                                <div className="ui active inverted dimmer">
                                </div>
                            </div>}
                    </div>
                    {
                        error &&
                        <div>{this.renderError(error)}</div>
                    }

                </form >



                <div id="login-register-buttons" style={{ margin: "3rem 0 1rem" }}>
                    <button onClick={this.loginAsGuest} style={{ color: "#333" }} className="ui button btn-block ">Log in as guest</button>

                    <div className="margin-y-1 text-center">OR</div>
                    <a href="/register" style={{ color: "#333" }} className="ui button
                    btn-block"> Sign up
                    </a>
                </div>

            </div >
        );
    };
};

export default connect(null, { signIn })(Login);