import React from 'react';
import SidebarBeranda from "../Components/SidebarBeranda";

const BerandaPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-300">
      <SidebarBeranda />

        <div className="flex flex-col w-full  bg-slate-100">
          <div className="flex justify-between items-center mb-4 p-4 ml-10">
            <h1 className="text-2xl font-bold">Beranda</h1>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-10">
            <img src="path_to_profile_photo.jpg" alt="Profil" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
          <hr className="mb-4 border-gray-300 w-full" />

        <div className="flex flex-col md:flex-row w-full ">
          <div className="w-full md:w-[30%] p-5 ml-10 ">
            <h2 className="text-3xl font-bold mb-2 text-blue-600">Akun</h2>
            <div className="container mx-auto w-full bg-blue-600 rounded-lg">
            <h2 className="text-4xl font-bold text-white p-2 ml-6">Email</h2>
            <p className="text-xl text-white p-2 mb-4 ml-6">alifffamin@gmail.com</p>
            <h2 className="text-4xl font-bold text-white p-2 ml-6">Username</h2>
            <p className="text-xl text-white p-2 mb-4 ml-6">alifffamin</p>
            <h2 className="text-4xl font-bold text-white p-2 ml-6">Role</h2>
            <p className="text-xl text-white p-2 mb-4 ml-6">Admin</p>
            <div className="container mx-auto bg-blue-800 flex justify-end p-4 rounded-lg">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <img src="src\assets\settingslogo.png" alt="Profil" className="w-full h-full object-cover rounded-full" />
            </div>
            </div>
            </div>
          </div>

          <div className="w-full md:w-[70%] p-4 ml-16 bg-slate-100 md:ml-4  md:mt-0 ">
            <h1 className="text-2xl font-bold mb-4">Jadwal Pasien</h1>
            <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-4 lg:-mx-8">
            <div className="inline-block min-w-full  sm:px-4 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-black bg-white rounded-lg">
                <thead className="border-b border-neutral-200 font-medium dark:border-black/10 p-4">
                  <tr>
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">First</th>
                    <th scope="col" className="px-6 py-4">Last</th>
                    <th scope="col" className="px-6 py-4">Handle</th>
                    <th scope="col" className="px-6 py-4">Last</th>
                    <th scope="col" className="px-6 py-4">Handle</th>
                  </tr>
                </thead>
                    <tbody>
                      <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                      <td className="whitespace-nowrap px-6 py-4">Mark</td>
                      <td className="whitespace-nowrap px-6 py-4">Otto</td>
                      <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                      <td className="whitespace-nowrap px-6 py-4">Otto</td>
                      <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                      </tr>
                      <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                      <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                      <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                      <td className="whitespace-nowrap px-6 py-4">@fat</td>
                      <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                      <td className="whitespace-nowrap px-6 py-4">@fat</td>
                      </tr>
                      <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                      <td className="whitespace-nowrap px-6 py-4">Larry</td>
                      <td className="whitespace-nowrap px-6 py-4">Wild</td>
                      <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                      <td className="whitespace-nowrap px-6 py-4">Wild</td>
                      <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                      </tr>
                    </tbody>
              </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BerandaPage;
