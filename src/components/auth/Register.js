import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import history from '../../history';
import my_api from '../../apis/my_api';
import { signIn } from '../../actions';

class Register extends React.Component {
    state = {
        username: '',
        password: '',
        name: '',
        error: '',
        submitted: '',
        loading: ''
    };

    onUsernameChange = e => {
        // It is decided to remove name as an input, but we will username as name
        this.setState({ username: e.target.value, name: e.target.value });
    };

    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    };


    onSubmit = e => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, name } = this.state;

        // stop here if form is invalid
        if (!username || !password || !name) return;

        this.setState({ loading: true });

        const newUser = _.pick(this.state, ['username', 'password', 'name']);
        my_api.post('/api/users', newUser)
            .then(() => {
                //Automatic Login starts
                const user = _.pick(this.state, ['username', 'password']);
                my_api.post('/api/auth', user)
                    .then((res) => {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('user', JSON.stringify(res.data.user));

                        // Clear password and redirect home
                        this.props.signIn(res.data.user);
                        this.setState({ password: '' });
                        history.push('/');
                    }
                    )
                    .catch(error => {
                        this.setState({ error, loading: false });
                    });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });


    }


    renderError(error) {
        if (!error) {
            return <div>Connection Problem</div>;
        } else {
            console.log('error- Register.js', error);
            return <div>The user is already registered</div>
        }
    }


    render() {
        const { username, password, error, submitted, loading } = this.state;
        return (
            <div>
                <form className="ui form" onSubmit={this.onSubmit}>
                    <div className="field">
                        {/*    <label>Name: </label>
                        <input type="text" value={name} onChange={this.onNameChange} />
                        {submitted && !name &&
                            <div>Name is reqired!</div>
                        } */}
                    </div>
                    <div className="field">
                        <label>Username: </label>
                        <input type="text" value={username} onChange={this.onUsernameChange} />
                        {submitted && !username &&
                            <div>Username is reqired!</div>
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

            </div>
        );
    };
};

export default connect(null, { signIn })(Register);