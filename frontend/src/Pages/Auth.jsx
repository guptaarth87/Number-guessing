import React, { useState } from 'react';
import Signup from '../Components/Authentication/Signup';
import Login from '../Components/Authentication/Login';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? (
        <Login onSwitch={toggleAuth} />
      ) : (
        <Signup onSwitch={toggleAuth} />
      )}
    </div>
  );
};

export default Auth;
