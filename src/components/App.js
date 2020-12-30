import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import PostList from './posts/PostList';
import BlogList from './blogs/BlogList';
import BlogCreate from './blogs/BlogCreate';
import BlogEdit from './blogs/BlogEdit';
import Login from './login-register/Login';
import Register from './login-register/Register';
import history from '../history';
import Header from './header/Header';

const App = () => {
    return (
        <div className="container-small">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={PostList} />
                        <Route path="/blogs" exact component={BlogList} />
                        <Route path="/create" exact component={BlogCreate} />
                        <Route path="/edit/:id" exact component={BlogEdit} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;