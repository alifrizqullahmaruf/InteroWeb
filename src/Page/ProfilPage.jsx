import React from 'react'
import SidebarProfil from '../Components/SidebarProfil'

const ProfilPage = () => {
  return (
    <div className="flex">
      <SidebarProfil />

      <div className="flex flex-col w-full bg-slate-100">
        <div className="flex justify-between items-center mb-4 p-4 ml-10">
          <h1 className="text-2xl font-bold">Profil</h1>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-10">
              <img src="path_to_profile_photo.jpg" alt="Profil" className="w-full h-full object-cover rounded-full" />
            </div>
        </div>
        <hr className="mb-4 border-gray-300 w-full" />

        <div className="flex justify-between items-center  p-4 ml-10">
          <h1 className="text-2xl font-bold text-blue-500">Pengguna</h1>
        </div>
        <div className="flex justify-between items-center  p-10 ml-32 mr-32 bg-white mt-5 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <img src="path_to_profile_photo.jpg" alt="Profil" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="ml-4">
              <p className="text-xl font-bold">alifamin</p>
              <p className="text-md text-gray-600">Dokter</p>
            </div>
          </div>
            <button className="bg-white text-gray-700 border border-gray-700 px-4 py-2 rounded-md">✎ Edit</button>
        </div>

        <div className="flex flex-col ml-32 mr-32 mt-4 bg-white p-10 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
           <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-36">
                <p className="text-md font-bold text-gray-400">First Name</p>
                <p className="text-md font-bold text-gray-400">Alif</p>
                <p className="text-md font-bold text-gray-400 mt-4">Email Address</p>
                <p className="text-md font-bold text-gray-400">alifffamin@gmail.com</p>
              </div>
              <div className="ml-16">
                <p className="text-md font-bold text-gray-400">Last Name</p>
                <p className="text-md font-bold text-gray-400">Amin</p>
                <p className="text-md font-bold text-gray-400 mt-4">Phone</p>
                <p className="text-md font-bold text-gray-400">08123456789</p>
              </div>
            </div>
                <button className="bg-white text-gray-700 border border-gray-700 px-4 py-2 rounded-md">✎ Edit</button>
          </div>
        </div>

        <div className="flex flex-col ml-32 mr-32 mt-4 bg-white p-10 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Address</h2>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
               <div className="w-36">
                  <p className="text-md font-bold text-gray-400">Street</p>
                  <p className="text-md font-bold text-gray-400">City</p>
                  <p className="text-md font-bold text-gray-400 ">Province</p>
                </div>
                <div className="ml-16">
                  <p className="text-md font-bold text-gray-400">JL. Magelang</p>
                  <p className="text-md font-bold text-gray-400">Sleman</p>
                  <p className="text-md font-bold text-gray-400 ">Yogyakarta</p>
                </div>
            </div>
                <button className="bg-white text-gray-700 border border-gray-700 px-4 py-2 rounded-md">✎ Edit</button>
        </div>
        
      </div>
    </div>
  </div>
     
    
    
  )
}

export default ProfilPage
