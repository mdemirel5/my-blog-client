import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import history from '../../history';
import { signIn } from '../../actions';
import my_api from '../../apis/my_api';

class Login extends React.Component {
    state = {
        email: 'anna@abc.de',
        password: '123',
        error: '',
        submitted: '',
        loading: ''
    };

    onEmailChange = e => {
        this.setState({ email: e.target.value });
    };

    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;

        // stop here if form is invalid
        if (!email || !password) return;

        this.setState({ loading: true });

        const user = _.pick(this.state, ['email', 'password']);
        my_api.post('/api/auth', user)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));

                this.props.signIn(res.data.user);
                this.setState({ password: '' });
                history.push('/');
                // window.location.reload();
            }/* ,
            error => {this.setState({error, loading: false}); }*/

            )
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }

    renderError(error) {
        if (!error) {
            return <div>Connection Problem</div>;
        } else if (error.response.status === 400) {
            return <div>Email or password is wrong!</div>
        }
    }

    render() {
        const { email, password, error, submitted, loading } = this.state;
        return (
            <div>
                <form className="ui form" onSubmit={this.onSubmit}>
                    <div className="field">
                        <label>Email: </label>
                        <input type="text" value={email} onChange={this.onEmailChange} />
                        {submitted && !email &&
                            <div>Email is reqired!</div>
                        }
                    </div>
                    <div className="field">
                        <label>Password: </label>
                        <input type="text"
                            value={password}
                            onChange={this.onPasswordChange} />
                        {submitted && !password &&
                            <div>Password is required!</div>}
                    </div>
                    <div className="field">
                        <button
                            className="ui blue button"
                            type="submit"
                        >Submit
                        </button>
                        {loading &&
                            <div className="ui segment">
                                <div className="ui active inverted dimmer">
                                    <div className="ui text loader">Loading</div>
                                </div>
                            </div>}
                    </div>
                    {error &&
                        <div>{this.renderError(error)}</div>}
                </form>


                {/* {error && error.response.status === 400 &&
                <div>Email or password is wrong! </div>} */}
                {/* error && error.response.status !== 400 &&
                <div>Errr status is not 400 </div> */}
            </div>
        );
    };
};

export default connect(null, { signIn })(Login);