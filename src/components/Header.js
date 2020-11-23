import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthButton from './auth/AuthButton';
import './header.css';


const Header = props => {
    return (
        <div id="header" className="ui secondary menu">
            <div id="left-menu-css">
                <Link to="/" id="logo" className="item">
                    <h1>THE BLOG</h1>
                </Link>
                {props.isSignedIn &&
                    <Link to="/create" className="item">
                        <i className="fas fa-plus"></i>
                                &nbsp; Write a blog</Link>}
                <div>{!props.isSignedIn &&
                    <h3>Here you can get and share information</h3>}</div>

            </div>

            <div id="right-menu" className="right menu">
                {props.name_user &&
                    <div style={{ margin: "10px" }}>signed in as
                    <span style={{ fontWeight: "bold", fontSize: '16px', fontStyle: 'italic' }}> {props.name_user}</span>
                    </div>}
                <AuthButton />
            </div>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        name_user: state.auth.name_user,
        isSignedIn: state.auth.isSignedIn
    };
}
export default connect(mapStateToProps)(Header);