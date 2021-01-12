import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthButton from './AuthButton';


const Header = props => {
    return (
        <div id="header" className="ui padding-y-1">
            <div id="left-menu">
                <Link to="/" id="logo" className="item">
                    <h1>Mustagram</h1>
                </Link>







            </div>

            {/* // if a user is signed in, his name is here */}
            <div id="right-menu" >

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