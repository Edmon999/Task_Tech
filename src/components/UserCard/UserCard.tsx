import { useState } from "react";
import { FaEyeSlash, FaEye, FaPhone, FaMailBulk } from "react-icons/fa";

import "./UserCard.css";

interface IUserCardProps {
  userData: {
    avatar: string;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    phone_number: string;
  };
}

export const UserCard: React.FC<IUserCardProps> = ({ userData }) => {
  const { avatar, first_name, last_name, password, email, phone_number } =
    userData;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="card-wrapper">
      <img
        src={avatar}
        alt={`${first_name} ${last_name}`}
        className="card-image"
      />
      <div>
        <strong>{first_name}</strong> {last_name}
      </div>
      <div>
        <div className="card-contact">
          <FaMailBulk />
          {email}
        </div>
        <div className="card-contact">
          {" "}
          <FaPhone />
          {phone_number}
        </div>
      </div>
      <div>
        {showPassword ? password : "********"}{" "}
        <button onClick={togglePasswordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};
