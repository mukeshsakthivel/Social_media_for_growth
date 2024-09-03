import { useContext, useState } from 'react';
import { FaChevronUp, FaUser } from "react-icons/fa6";
import { TbLock } from "react-icons/tb";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdAlternateEmail } from "react-icons/md";
import { FaChevronDown } from 'react-icons/fa6';
import SignupImage from '../assets/register_login.png';
import api from '../api/base'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { userContext } from '../context/userContext';


const Register = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        userCareerRole: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [careerOptions] = useState([
        'Web Development',
        'AI/ML',
        'Data Science',
        'Cybersecurity',
        'Mobile Development',
        'DevOps',
        'Cloud Computing',
        'Software Testing',
        'UI/UX Design',
        'Blockchain Development'
    ]);
    const [filteredCareers, setFilteredCareers] = useState(careerOptions);
    const [careerOpen, setCareerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const {setuserDetails}=useContext(userContext);

    const navigate = useNavigate();

    const careerToggleDown = () => {
        setCareerOpen((open) => !open);
        setFilteredCareers(careerOptions);
        setSearchTerm('');
    };

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/registers', data);
            const data=response.data;
            setuserDetails(data);
            toast.success("Register successful");
            navigate('/Home');
        } catch (err) {
            toast.error(err.response.data);
        }
    };

    const showpassword = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const [iconColor, setIconColor] = useState([
        { icon: <FaUser />, colorClass: 'text-gray-600', iconColor: false, label: 'Username', type: 'text', id: 'username' },
        { icon: <MdAlternateEmail />, colorClass: 'text-gray-600', iconColor: false, label: 'Email', type: 'text', id: 'email' },
        { icon: <TbLock />, colorClass: 'text-gray-600', iconColor: false, label: 'Password', type: 'password', id: 'password' }
    ]);

    const inputClicked = (index) => {
        const updatedIconColor = [...iconColor];
        updatedIconColor[index].iconColor = true;
        setIconColor(updatedIconColor);
    };

    const inputNotClicked = (index) => {
        const updatedIconColor = [...iconColor];
        updatedIconColor[index].iconColor = false;
        setIconColor(updatedIconColor);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        setFilteredCareers(careerOptions.filter(option =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    };

    return (
        <div className='text-sm flex justify-center items-center h-screen customsm:overflow-hidden bg-white register'>
            <div className="w-full flex justify-center items-center h-screen xl:w-1/2">
                <div className="border-2 border-customBorderPurple rounded-3xl text-start customsm:border-none ml-20" style={{ width: "450px", height: "570px", padding: '10px 70px' }}>
                    <h1 className="mt-12 font-semibold text-xl text-center">Register</h1>
                    <form action="" onSubmit={registerUser} className="mt-6">
                        {iconColor.map((item, index) => (
                            <div key={index} className='container'>
                                <div className='relative mt-6'>
                                    <input
                                        type={item.id === 'password' && showPassword ? 'text' : item.type}
                                        value={data[item.id]}
                                        id={item.id}
                                        className={`input ${data[item.id] ? 'border-customInputBorderPurple' : ''}`}
                                        onFocus={() => inputClicked(index)}
                                        onBlur={() => inputNotClicked(index)}
                                        onChange={(event) => handleInputChange(event)}
                                        autoComplete='off'
                                    />
                                    <div className={`label ${data[item.id] ? "has-content" : ""} ${iconColor[index].iconColor ? "text-customIconColor" : ""}`}>
                                        <span className='icon'>{item.icon}</span>
                                        <span style={{ marginTop: '-2px' }} className='labelText'>{item.label}</span>
                                    </div>
                                    {/* Add eye icon for password field */}
                                    {item.id === 'password' && (
                                        <div className='absolute top-5 right-2'>
                                            <span onClick={showpassword} className='text-gray-400 cursor-pointer'>
                                                {showPassword ? <HiEye /> : <HiEyeOff />}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Career Selector */}
                        <div className='relative mt-5'>
                            <div onClick={careerToggleDown} className={`flex justify-between items-center w-80 p-4 bg-customGray rounded-xl cursor-pointer text-gray-400`}>
                                {data.career || 'Select Career Role'}
                                <span className='ml-4'>{careerOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                            </div>
                            <div className={`absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg transition-opacity duration-300 ${careerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                {careerOpen && (
                                    <div className='p-2 search-box'>
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            id={searchTerm}
                                            onChange={handleSearch}
                                            className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none"
                                            placeholder="Search career roles"
                                        />
                                        <div className='flex flex-col space-y-2 mt-2 h-20 overflow-y-auto dropdown-content'>
                                            {filteredCareers.length ? filteredCareers.map((item, index) => (
                                                <div key={index} className={`p-2 hover:bg-gray-100 rounded-lg ml-1 mr-1 cursor-pointer`} onClick={() => {
                                                    setCareerOpen(false);
                                                    setData(prevData => ({ ...prevData, career: item }));
                                                }}>
                                                    {item}
                                                </div>
                                            )) : <div className="text-gray-400 p-2">No results found</div>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className='font-normal ml-3' style={{ fontSize: '0.7rem' }}>By clicking Register, you agree to our <Link to='/policies' className='text-customBlue font-semibold cursor-pointer underline'>User Agreement</Link></p>
                        <button className={`mt-5 border border-customBlue p-2 w-customButtonWidth rounded-xl bg-customBlue text-white font-semibold text-base`}>Register</button>
                        <div className='mt-2 text-gray-400 text-center'>
                            Already Have an Account?
                            <span className='text-customBlue font-medium underline underline-offset-4 cursor-pointer'>
                                <Link to="/" >Login</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            <div className='w-1/2 hidden xl:block'>
                <p className='text-center text-xl'>Join Us Today and Shape Your Career Path!</p>
                <img src={SignupImage} alt="" className='mt-10' style={{ height: '28rem' }} />
            </div>
        </div>
    );
};

export default Register;