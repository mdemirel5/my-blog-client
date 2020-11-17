import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthButton from './auth/AuthButton';
import './header.css';

const Header = props => {
    return (
        <div id="header" className="ui secondary menu">
            <div id="left-menu-css">
                <Link to="/" className="item">All Blogs</Link>
                <Link to="/create" className="item">New Blog</Link>
            </div>

            <div id="right-menu" className="right menu">
                {props.username &&
                    <div style={{ margin: 10 }}>signed in as
                    <span style={{ fontWeight: 1000, fontSize: '1.2rem', fontStyle: 'italic' }}> {props.username}</span>
                    </div>}
                <AuthButton />
            </div>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        username: state.auth.username,
        isSignedIn: state.auth.isSignedIn
    };
}
export default connect(mapStateToProps)(Header);