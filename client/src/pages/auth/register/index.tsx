import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [AISHE, setAISHE] = useState('');
    const [degree, setDegree] = useState('');
    const [password, setPassword] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [type, setType] = useState('student');
    const handleRegistration = async () => {

        toast.remove();
        
        if (name.length <= 3) {
            return toast.error('Invalid Name Length')
        }
        if (email.length <= 3) {
            return toast.error('Invalid Email Length')
        }
        if (AISHE.length <= 3) {
            return toast.error('Invalid AISHE Code')
        }
        if (password.length <= 7) {
            return toast.error('Password should atleast have 8 letters')
        }
        if(type === 'student'){
            if (!degree) {
                return toast.error('Invalid Degree')
            }
            if (Number.isNaN(rollNo)) {
                return toast.error('Invalid Roll Number')
            }
        }

        toast.loading('Processing Request')
        if(type === 'student'){
            try {
                const response = await fetch(process.env.SERVER_URL + 'auth/student/register', {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, AISHE, degree, password, rollNo })
                })
    
                const data = await response.json();
                if (data.success) {
                    toast.dismiss();
                    toast.success("Verification Initiated\nContact Your College")
                    navigate('/');
                } else {
                    toast.dismiss();
                    toast.error(data.error)
                }
            } catch {
                toast.dismiss();
                toast.error('Server Error')
            }
        }else{
            try {
                const response = await fetch(process.env.SERVER_URL + 'auth/institute/register', {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, AISHE, password })
                })
    
                const data = await response.json();
                if (data.success) {
                    toast.dismiss();
                    toast.success("Verification Initiated\nContact Prayog Support")
                    navigate('/');
                } else {
                    toast.dismiss();
                    toast.error(data.error)
                }
            } catch {
                toast.dismiss();
                toast.error('Server Error')
            }
        }
        
    };

    return (
        <div className="min-h-screen bg-lightTheme-secondary dark:bg-darkTheme-secondary dark:text-darkTheme-text grid lg:grid-cols-2 ">

            <div className='hidden lg:flex items-center px-20'>
                <img className='' src="/svg/register.svg" alt="Logo" />
            </div>

            <form
                className="w-3/4 h-full mx-auto flex flex-col justify-center lg:justify-start lg:pt-2"
                onSubmit={(e) => e.preventDefault()}
            >
                <h2 className="text-4xl font-semibold mb-4">Registration</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={type === 'student' ? 'Enter your name' : 'Enter college name'}
                    />
                </div>
                {
                    type === 'student'
                        ? <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="rollNo">
                                Roll Number
                            </label>
                            <input
                                className="w-full text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                                type="text"
                                id="rollNo"
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                                placeholder="Enter your roll number"
                            />
                        </div>
                        : null
                }

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={type === 'student' ? 'Enter your email' : 'Enter college email'}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="college">
                        College
                    </label>
                    <input
                        className="w-full text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                        type="text"
                        id="text"
                        value={AISHE}
                        onChange={(e) => setAISHE(e.target.value)}
                        placeholder="Enter AISHE code of institute"
                    />
                </div>
                {
                    type === 'student'
                        ? <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="degree">
                                Degree
                            </label>
                            <select
                                className="w-full text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                                id="degree"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                            >
                                <option value="">Select your degree</option>
                                <option value="UG">Undergraduate</option>
                                <option value="PG">Postgraduate</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Doctorate">Doctorate</option>
                            </select>
                        </div>
                        : null
                }

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="degree">
                        Password
                    </label>
                    <input
                        className="w-full text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Case Sensitive"
                    />
                </div>
                <div className='mb-2 flex items-center gap-3'>
                    <p className='inline'>Register as </p>
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleRegistration}
                >
                    Register
                </button>
                
                <p className='mt-1'>Already Registered? <Link to='/auth/login'>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;
