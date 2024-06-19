import SidebarPasien from "../Components/SidebarPasien";
import { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";

const BASE_URL = "http://127.0.0.1:8000/kesehatan.php?table=pasien";

// Set the app element for react-modal
Modal.setAppElement("#root");

const DaftarPasien = () => {
  const [patients, setPatients] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    nama: "",
    umur: "",
    alamat: "",
    jenis_Kelamin: "",
    no_Telepon: "",
  });

  const fetchPatients = useCallback(async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const patient = await response.json();
      setPatients(patient);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const openModal = () => {
    setModalIsOpen(true);
    setIsEditing(false);
    setNewPatient({
      nama: "",
      umur: "",
      alamat: "",
      jenis_Kelamin: "",
      no_Telepon: "",
    });
  };

  const openEditModal = (patient) => {
    setModalIsOpen(true);
    setIsEditing(true);
    setCurrentPatient(patient);
    setNewPatient({
      nama: patient.nama,
      umur: patient.umur,
      alamat: patient.alamat,
      jenis_Kelamin: patient.jenis_Kelamin,
      no_Telepon: patient.no_Telepon,
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentPatient(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newPatient).forEach((key) => {
      formData.append(key, newPatient[key]);
    });

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await fetchPatients(); // Refetch patients after successful add
      closeModal();
    } catch (error) {
      console.error("Failed to add new patient:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const requestBody = new URLSearchParams();
    Object.keys(newPatient).forEach((key) => {
      requestBody.append(key, newPatient[key]);
    });

    try {
      const response = await fetch(
        `${BASE_URL}&ID_Pasien=${currentPatient.ID_Pasien}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: requestBody.toString(),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await fetchPatients(); // Refetch patients after successful edit
      closeModal();
    } catch (error) {
      console.error("Failed to update patient:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}&ID_Pasien=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await fetchPatients(); // Refetch patients after successful delete
    } catch (error) {
      console.error("Failed to delete patient:", error);
    }
  };

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

            <div className="ml-auto">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={openModal}
              >
                Tambah Pasien
              </button>
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
                <th scope="col" className="px-4 py-2 text-lg">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient, index) => (
                <tr
                  key={`${patient.ID_Pasien}-${index}`} // Ensure each child has a unique key prop
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
                  <td className="whitespace-nowrap py-4 flex justify-evenly">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openEditModal(patient)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536M16.5 3a2.121 2.121 0 013 3L7.5 18H3v-4.5L16.5 3z"
                        />
                      </svg>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(patient.ID_Pasien)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Patient Modal"
        // className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Pasien" : "Tambah Pasien"}
        </h2>
        <form
          onSubmit={isEditing ? handleEditSubmit : handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block font-medium mb-1">Nama:</label>
            <input
              type="text"
              name="nama"
              value={newPatient.nama}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Umur:</label>
            <input
              type="text"
              name="umur"
              value={newPatient.umur}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Alamat:</label>
            <input
              type="text"
              name="alamat"
              value={newPatient.alamat}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Jenis Kelamin:</label>
            <input
              type="text"
              name="jenis_Kelamin"
              value={newPatient.jenis_Kelamin}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">No. Telepon:</label>
            <input
              type="text"
              name="no_Telepon"
              value={newPatient.no_Telepon}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isEditing ? "Update" : "Tambah"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Batal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DaftarPasien;
