import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthButton from './AuthButton';


const Header = props => {
    return (
        <div id="header" className="ui secondary menu padding-y-1">
            <div id="left-menu">
                <Link to="/" id="logo" className="item">
                    <h1>Mustagram</h1>
                </Link>
                {/*  // if a user is signed in, he can add a blog */}




                {/* // if a user is not signed in, he can see this */}

            </div>

            {/* // if a user is signed in, his name is here */}
            <div id="right-menu" >
                {/*  <div>
                    {props.isSignedIn &&
                        <div style={{ margin: "10px" }}>signed in as
                    <span style={{ fontWeight: "bold", fontSize: '16px', fontStyle: 'italic' }}> {props.name_user}</span>
                        </div>}

                </div> */}
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