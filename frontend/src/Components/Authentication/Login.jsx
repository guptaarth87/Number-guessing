import React,{useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { API_URL } from '../../_helper';
import Loader from '../Loader/Loader';

const Login = ({ onSwitch }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading ,setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const gameremail = Cookies.get('gameremail');
    console.log(gameremail);
    if (gameremail) {
      // If gameremail cookie is not found, redirect to /auth
      navigate('/index');
    } 
  }, [navigate]);
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      setIsLoading(false);
      Cookies.set('gameremail', data.email, { expires: 7 }); // Set cookie for 7 days
      alert(response.data.message);
      navigate('/index');
    } catch (err) {
      setIsLoading(false);
      alert(err.response.data.error || 'Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen background-clr ">
      {
        isLoading ?
        <Loader/>
        :
        <div className="background-clr p-8 rounded shadow-md w-96 text-white">
        <h2 className="text-white text-2xl mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-slate-700 text-black border border-slate-600"
              {...register('email', { required: true })}
            />
            {errors.email && <span className="text-red-500">Email is required</span>}
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-slate-700 text-black border border-slate-600"
              {...register('password', { required: true })}
            />
            {errors.password && <span className="text-red-500">Password is required</span>}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Sign In
          </button>
        </form>
        <p className="text-white text-center mt-4">
          Don't have an account?{' '}
          <button className="text-blue-400" onClick={onSwitch}>
            Register here
          </button>
        </p>
      </div>
      }
     
    </div>
  );
};

export default Login;
