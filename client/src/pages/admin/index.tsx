import { useState } from 'react'
import toast from 'react-hot-toast';
import { adminLogin, adminLogout } from '../../redux/adminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function Admin() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    toast.dismiss();
    if (email.length <= 3) {
      toast.error("Invalid Email");
      return;
    }
    if (password.length <= 8) {
      toast.error("Invalid Password")
      return;
    }

    toast.loading("Logging In")
    const response = await fetch(process.env.SERVER_URL + 'auth/admin', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json();
    if (data.success) {
      sessionStorage.setItem('admin',data.token);
      const adminResponse = await fetch(process.env.SERVER_URL+'auth/get-admin',{
        method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem('admin') || ''
          },
      })
      const adminData = await adminResponse.json();
      if (adminData.success) {
        dispatch(adminLogin({ details: adminData.details }))
      }
      if (!adminData.validated) {
        dispatch(adminLogout());
      }
      toast.dismiss();
      navigate('/');
      toast.success("Logged In as Admin")
    } else {
      toast.dismiss();
      toast.error(data.error);
    }
  }
  return (
    <div
      className="min-h-screen flex bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text justify-center py-48 ">
      <form
        className="w-80 h-80 bg-white rounded shadow text-black py-3 px-5 "
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mb-5">
          <p className="text-center text-3xl font-medium">Admin Login</p>
        </div>
        <div className="mb-5">
          <label className="block" htmlFor="">Email</label>
          <input
            className="h-10 bg-gray-200 w-full rounded ps-1"
            placeholder="Enter your email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email" />
        </div>
        <div className="mb-8">
          <label className="block" htmlFor="">Password</label>
          <input
            className="h-10 bg-gray-200 w-full rounded ps-1"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password" />
        </div>
        <div className="flex justify-center items-center">
          <button onClick={handleLogin} className="px-2 py-1 rounded active:scale-95 transition-transform bg-green-500">Login</button>
        </div>
      </form>
    </div>
  )
}
