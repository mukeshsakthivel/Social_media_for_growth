import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Profile from '../assets/defaultProfile.png';

const ProfileDropdown = ({ closeDropdown }) => {
    return (
        <div className="flex flex-col p-2">
            <Link to='/profile' className="flex items-start" onClick={closeDropdown}>
                <div className="flex-shrink-0">
                    <img src={Profile} alt="Profile" className="w-12 h-12" />
                </div>
                <div className="text-black mt-1 ml-2">
                    <h3 className="text-sm font-semibold">Name</h3>
                    <p className="text-base">Desc</p>
                </div>
            </Link>
            <Link to='/profile' className="border border-blue-600 mb-3 text-center rounded-lg text-blue-600 mt-2" onClick={closeDropdown}>
                View Profile
            </Link>
            <hr style={{ margin: '0 -6px' }} />
            <div className="text-black mt-3">
                <h1 className="text-base font-semibold mb-2">Account</h1>
                <Link to='/settings' className="hover:underline" onClick={closeDropdown}>Settings and Privacy</Link>
            </div>
            <div className="text-black mt-3">
                <h1 className="text-base font-semibold mb-2">Manage</h1>
                <Link to='/' className="hover:underline" onClick={closeDropdown}>Sign out</Link>
            </div>
        </div>
    );
};

ProfileDropdown.propTypes = {
    closeDropdown: PropTypes.func.isRequired
};

export default ProfileDropdown;