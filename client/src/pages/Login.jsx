import { useContext, useState } from 'react';
import { FaUser } from "react-icons/fa6";
import { TbLock } from "react-icons/tb";
import { HiEye, HiEyeOff } from "react-icons/hi";
import SignupImage from '../assets/register_login.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api/base'
import '../styles/index.css'
import { userContext } from '../context/userContext';

const Login = () => {
    const [data, setData] = useState({
      username: '',
      password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const {setuserDetail}=useContext(userContext);

    const loginUser = async (e) => {
      e.preventDefault();
      try {
        // const response = await api.post('/',data);
        // const data=response.data;
        // setuserDetail(data);
        // toast.success("Login Successful");
        // navigate('/home');
        const response = await api.post('/', data);

        // Check if response is undefined
        if (!response) {
            throw new Error('Server did not return a response.');
        }
        

        // Log the response object to understand its structure
        console.log('Response from server:', response);

        // Check if response.data exists
        if (response.data) {
            const userData = response.data;
            setuserDetail(userData);
            toast.success("Login Successful");
            navigate('/home');
        } else {
            throw new Error('Unexpected response format: No data property found.');
        }
    } catch (err) {
        toast.error(err.response.data);
    }
  };

    const showpassword = () => {
      setShowPassword(!showPassword);
      const updatedIconColor = [...iconColor];
      updatedIconColor[1].type = showPassword? 'password' : 'text';
      setIconColor(updatedIconColor);
    }

    const handleInputChange = (event) => {
      const { id, value } = event.target;
      setData(prevData => ({
          ...prevData,
          [id]: value
      }));
    };

    const [iconColor, setIconColor ] = useState([
        {icon: <FaUser />, colorClass: 'text-gray-600', iconColor: false, label: 'Username', type: 'text', id: 'username'},
        {icon: <TbLock />, colorClass: 'text-gray-600', iconColor: false, label: 'Password', type: 'password', id: 'password'}
    ]);

    const inputClicked = (index) => {
        const updatedIconColor = [...iconColor];
        updatedIconColor[index].iconColor = true;
        setIconColor(updatedIconColor);
    }

    const inputNotClicked = (index) => {
        const updatedIconColor = [...iconColor];
        updatedIconColor[index].iconColor = false;
        setIconColor(updatedIconColor);
    }

    return (
      <div className='text-sm flex justify-center items-center h-screen customsm:overflow-hidden bg-white login'>
        <div className="w-full flex justify-center items-center h-screen xl:w-1/2">
          <div className="border-2 border-customBorderPurple rounded-3xl text-start  customsm:border-none" style={{ width: "450px", height: "480px", padding: '10px 70px' }}>
            <h1 className="mt-14 font-semibold text-xl text-center">Get More Access</h1>
            <form action="" onSubmit={loginUser} className="mt-6">
              {iconColor.map((item, index) => (
                <div key={index} className='container'>
                  <div className='relative mt-6'>
                    <input
                      type={item.type}
                      value={data[item.id]}
                      id={item.id}
                      className={`input ${data[item.id] ? 'border-customInputBorderPurple' : ''}`}
                      onFocus={() => inputClicked(index)}
                      onBlur={() => inputNotClicked(index)}
                      onChange={(event) => {
                        handleInputChange(event, item.id);
                        switch (item.id) {
                            case 'username':
                              setData(prevData => ({ ...prevData, username: event.target.value }));
                              break;
                            case 'password':
                              setData(prevData => ({ ...prevData, password: event.target.value }));
                              break;
                            default:
                                break;
                        }
                    }}
                    autoComplete='current-password'
                    />
                    {item.id === 'password' && (
                      <div className='absolute top-5 right-2 customsm:left-72'>
                        <span onClick={showpassword} className='text-gray-400 cursor-pointer customsm:ml-auto'>{showPassword ? <HiEye /> : <HiEyeOff />}</span>
                      </div>
                    )}
                    <div className={`label ${data[item.id] ? "has-content" : ""} ${iconColor[index].iconColor ? "text-customIconColor" : ""}`}>
                      <span className='icon'>{item.icon}</span> 
                      <span style={{ marginTop: '-2px' }} className='labelText'>{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className='flex justify-end mt-2'>
                <div>
                  <a href="" className='text-customBlue font-medium underline underline-offset-4'>Forgot Password?</a>
                </div>
              </div>
              <p className='font-normal ml-5 mt-3' style={{ fontSize: '0.7rem'}}>By clicking Login, you agree to our <Link to='/policies' className='text-customBlue font-semibold cursor-pointer underline'>User Agreement</Link></p>
              <button type='submit' className='mt-3 border border-customBlue p-2 w-customButtonWidth rounded-xl bg-customBlue text-white font-semibold text-base'>Login</button>
              <div className='mt-2 text-gray-400 text-center'>
                Not Yet Have an Account?
                <span className='text-customBlue font-medium underline underline-offset-4 cursor-pointer'>
                  <Link to="/register" >Register</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className='w-1/2 hidden xl:block'>
          <p className='text-center text-xl'>Good to see you again, Login to start your journey</p>
          <img src={SignupImage} alt="" className='mt-10' style={{ height: '28rem'}} />
        </div>
      </div>
    );
}

export default Login;