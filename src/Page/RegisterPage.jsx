import React from "react";
import logo from "/src/assets/3dLogo.png";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate(); // Get the navigate function

  const handleRegisterClick = (route) => {
    navigate(route); // Use the navigate function to go to the '/register' route
  };
  return (
    <div className="flex items-center justify-center min-h-screen p-12 bg-gray-200">
      <div className="grid w-full max-w-4xl grid-cols-2 bg-white rounded-lg shadow-lg">
        {/* Left Section: Form */}
        <div className="p-8">
          <div className="flex flex-col justify-center h-full">
            <p className="text-gray-600">Create an account</p>
            <h1 className="mb-8 text-3xl font-bold">Register</h1>
            <input
              type="text"
              placeholder="Full Name"
              className="px-4 mb-4 border-2 rounded-lg h-14"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 mb-4 border-2 rounded-lg h-14"
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 mb-4 border-2 rounded-lg h-14"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="px-4 mb-6 border-2 rounded-lg h-14"
            />
            <button
              className="w-full py-3 mb-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={() => handleRegisterClick("/")}
            >
              REGISTER
            </button>
            <div className="flex justify-center space-x-2">
              <p>Already have an account?</p>
              <a
                href="#"
                className="text-blue-500 hover:underline"
                onClick={() => handleRegisterClick("/")}
              >
                Log in now!
              </a>
            </div>
          </div>
        </div>
        {/* Right Section: Information */}
        <div className="flex flex-col items-center justify-center p-8 bg-blue-600 rounded-r-lg">
          <h1 className="mb-6 text-3xl font-bold text-white">
            Sistem Registrasi Pasien
          </h1>
          <img src={logo} alt="Logo" className="w-48 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
