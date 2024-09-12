import React,{useEffect} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { API_URL } from '../../_helper';

const Signup = ({ onSwitch }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
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
    try {
      const response = await axios.post(`${API_URL}/signup`, data);
      Cookies.set('gameremail', data.email, { expires: 7 }); // Set cookie for 7 days
      
      alert(response.data.message);
      navigate('/index');
    } catch (err) {
      alert(err.response.data.error || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen background-clr">
      <div className="background-clr p-8 rounded shadow-md w-96 text-white">
        <h2 className="text-white text-2xl mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-slate-700 text-black border border-slate-600"
              {...register('name', { required: true })}
            />
            {errors.name && <span className="text-red-500">Name is required</span>}
          </div>

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
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && (
              <span className="text-red-500">
                Password must be at least 6 characters long
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Sign Up
          </button>
        </form>
        <p className="text-white text-center mt-4">
          Already have an account?{' '}
          <button className="text-blue-400" onClick={onSwitch}>
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
