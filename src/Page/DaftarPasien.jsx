import SidebarPasien from "../Components/SidebarPasien";
import { useEffect, useState } from "react";

const BASE_URL = "http://127.0.0.1:8000/kesehatan.php?table=pasien";

const DaftarPasien = () => {
  const [patiens, setPatiens] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const patient = await response.json();
        setPatiens(patient);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="flex">
      <SidebarPasien />

      <div className="flex flex-col w-full bg-slate-100">
        <div className="flex justify-between items-center mb-4 p-4 ml-10">
          <h1 className="text-2xl font-bold">Daftar Pasien</h1>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-10">
            <img
              src="path_to_profile_photo.jpg"
              alt="Profil"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <hr className="mb-4 border-gray-300 w-full" />

        <div className="flex-1 p-6">
          <div className="flex items-center p-6">
            <div className="mr-4">
              <p className="text-lg">Filter By</p>
            </div>
            <div className="flex">
              <select className="border border-gray-300 px-12 py-6 text-lg rounded-md">
                <option value="">Filter 1</option>
                {/* Tambahkan opsi lain sesuai kebutuhan */}
              </select>

              <select className="border border-gray-300 px-12 py-6 text-lg rounded-md ml-2">
                <option value="">Filter 2</option>
                {/* Tambahkan opsi lain sesuai kebutuhan */}
              </select>

              <select className="border border-gray-300 px-12 py-6 text-lg rounded-md ml-2">
                <option value="">Filter 3</option>
                {/* Tambahkan opsi lain sesuai kebutuhan */}
              </select>
            </div>

            <div className="ml-4">
              <p className="text-lg">↻ Reset Filter</p>
            </div>
          </div>

          <table className="min-w-full text-left text-sm font-light text-surface dark:text-black bg-white rounded-lg">
            <thead>
              <tr className="border">
                <th scope="col" className="px-4 py-2 text-lg">
                  #
                </th>
                <th scope="col" className="px-4 py-2 text-lg">
                  Nama Pasien
                </th>
                <th scope="col" className="px-4 py-2 text-lg">
                  Umur
                </th>
                <th scope="col" className="px-4 py-2 text-lg">
                  Alamat
                </th>
                <th scope="col" className="px-4 py-2 text-lg">
                  Jenis Kelamin
                </th>
                <th scope="col" className="px-4 py-2 text-lg">
                  No. Telepon
                </th>
              </tr>
            </thead>

            <tbody>
              {patiens.map((patient, index) => (
                <tr
                  key={patient.ID_Pasien}
                  className="border-b border-neutral-200 dark:border-white/10"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {patient.nama}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {patient.umur}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {patient.alamat}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {patient.jenis_Kelamin}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {patient.no_Telepon}
                  </td>
                </tr>
              ))}
              {/* Tambahkan baris lain sesuai kebutuhan */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DaftarPasien;
