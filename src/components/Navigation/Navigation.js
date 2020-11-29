import React from 'react';

const Navigation = ({ onChangeRoute, isSignedin }) => {
  if(isSignedin) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick = {() => onChangeRoute('signout')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick = {() => onChangeRoute('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p>
        <p onClick = {() => onChangeRoute('register')} className="f3 link dim black underline pa3 pointer">Register</p>
      </nav>
    );
  }

}

export default Navigation;