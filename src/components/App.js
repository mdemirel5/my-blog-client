import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';


import BlogList from './blogs/BlogList';
import BlogCreate from './blogs/BlogCreate';
import BlogEdit from './blogs/BlogEdit';
//import BlogShow from './blogs/BlogShow';
import Login from './auth/Login';
import Register from './auth/Register';
import Personal from './Personal';
import history from '../history';
import Header from './Header';
import './app.css';


const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={BlogList} />
                        <Route path="/create" exact component={BlogCreate} />
                        <Route path="/edit/:id" exact component={BlogEdit} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/personal" exact component={Personal} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;