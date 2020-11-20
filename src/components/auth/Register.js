import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import history from '../../history';
import my_api from '../../apis/my_api';

class Register extends React.Component {
    state = {
        email: '@abc.de',
        password: '123',
        name: '',
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

    onNameChange = e => {
        this.setState({ name: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password, name } = this.state;

        // stop here if form is invalid
        if (!email || !password || !name) return;

        this.setState({ loading: true });

        const newUser = _.pick(this.state, ['email', 'password', 'name']);
        my_api.post('/api/users', newUser)
            .then((res) => {

                console.log('the user is created successfully')
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
        const { email, password, name, error, submitted, loading } = this.state;
        return (
            <div>
                <form className="ui form" onSubmit={this.onSubmit}>
                    <div className="field">
                        <label>Name: </label>
                        <input type="text" value={name} onChange={this.onNameChange} />
                        {submitted && !name &&
                            <div>Name is reqired!</div>
                        }
                    </div>
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

export default connect(null)(Register);