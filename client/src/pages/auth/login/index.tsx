// src/components/Login.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { studentLogin, studentLogout } from '../../../redux/studentSlice';
import { instituteLogin, instituteLogout } from '../../../redux/instituteSlice';
const Login = () => {
  const navigate = useNavigate();
  const [userID, setuserID] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('student');
  const dispatch = useDispatch();
  const handleLogin = async () => {

    toast.dismiss();
    const emailLength = userID.length;
    const passLength = password.length;

    if (emailLength === 0) {
      return toast.error('Email is required');
    }
    if (passLength === 0) {
      return toast.error('Password is required');
    }
    toast.loading('Logging In');
    try {
      const response = await fetch(`${process.env.SERVER_URL}auth/login`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID, password })
      })
      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem('jwt', data.token)
        const response = await fetch(process.env.SERVER_URL + 'auth/get-details', {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem('jwt') || ''
          },
        })

        const userData = await response.json();

        if (userData.success) {
          if (userData.type === 'student') {
            dispatch(studentLogin({ details: userData.details }))
          } else {
            console.log(userData.details)
            dispatch(instituteLogin({ details: userData.details }))
          }
          toast.dismiss();
          navigate('/');
          toast.success("Logged In")
        }

        if (!userData.validated) {
          dispatch(studentLogout());
          dispatch(instituteLogout());
          toast.dismiss();
          toast.error("Something Went Wrong");
          return;
        }
        
      } else {
        toast.dismiss();
        toast.error(data.error)
      }
    } catch {
      toast.dismiss();
      toast.error("Server Error")
    }
  };
  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-lightTheme-secondary dark:bg-darkTheme-secondary dark:text-darkTheme-text'>

      <div className='hidden lg:flex px-20'>
        <img className='' src="/svg/login.svg" alt="Logo" />
      </div>

      <form className=" w-3/4 h-full mx-auto flex flex-col justify-center lg:justify-start lg:pt-40" onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-4xl font-semibold mb-4">Login</h2>
        {
          type === 'student'
            ? <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="text-black w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
                type="email"
                id="email"
                value={userID}
                onChange={(e) => setuserID(e.target.value)}
                placeholder='Enter your email'
                required={true}
              />
            </div>
            : <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="aishe">
                User ID
              </label>
              <input
                className="text-black w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
                type="text"
                id="aishe"
                value={userID}
                onChange={(e) => setuserID(e.target.value)}
                placeholder='Enter user ID'
                required={true}
              />
            </div>
        }

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="text-black w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required={true}
          />
        </div>
        <div className='mb-2 flex items-center gap-3'>
          <p className='inline'>Login as </p>
          <div>
            <input onChange={() => setType('student')} checked={type === 'student'} id='student' type="radio" name="type" />
            <label htmlFor="student">Student</label>
          </div>
          <div>
            <input onChange={() => setType('institute')} type="radio" id="institute" checked={type === 'institute'} name="type" />
            <label htmlFor="institute">Institute</label>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className='mt-3'>New to Prayog? <Link className='hover:text-red-500 text-yellow-500' to='/auth/register'>Register</Link></p>
        <p>I am an <Link className='hover:text-red-500 text-yellow-500' to='/admin'>Admin</Link></p>
      </form>
    </div>
  );
};

export default Login;
