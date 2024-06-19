import SidebarDokter from "../Components/SidebarDokter";
import { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";

const BASE_URL = "http://127.0.0.1:8000/kesehatan.php?table=dokter";

// Set the app element for react-modal
Modal.setAppElement("#root");

const DaftarDokter = () => {
  const [dokters, setDokters] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDokter, setCurrentDokter] = useState(null);
  const [newDokter, setNewDokter] = useState({
    nama: "",
    spesialisasi: "",
    no_Telepon: "",
  });

  const fetchDokters = useCallback(async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dokter = await response.json();
      setDokters(dokter);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  }, []);

  useEffect(() => {
    fetchDokters();
  }, [fetchDokters]);

  const openModal = () => {
    setModalIsOpen(true);
    setIsEditing(false);
    setNewDokter({
      nama: "",
      spesialisasi: "",
      no_Telepon: "",
    });
  };

  const openEditModal = (dokter) => {
    setModalIsOpen(true);
    setIsEditing(true);
    setCurrentDokter(dokter);
    setNewDokter({
      nama: dokter.nama,
      spesialisasi: dokter.spesialisasi,
      no_Telepon: dokter.no_Telepon,
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentDokter(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDokter((prevDokter) => ({
      ...prevDokter,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newDokter).forEach((key) => {
      formData.append(key, newDokter[key]);
    });

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await fetchDokters(); // Refetch doctors after successful add
      closeModal();
    } catch (error) {
      console.error("Failed to add new doctor:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const requestBody = new URLSearchParams();
    Object.keys(newDokter).forEach((key) => {
      requestBody.append(key, newDokter[key]);
    });

    try {
      const response = await fetch(
        `${BASE_URL}&ID_Dokter=${currentDokter.ID_Dokter}`,
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
      await fetchDokters(); // Refetch doctors after successful edit
      closeModal();
    } catch (error) {
      console.error("Failed to update doctor:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}&ID_Dokter=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await fetchDokters(); // Refetch doctors after successful delete
    } catch (error) {
      console.error("Failed to delete doctor:", error);
    }
  };

  return (
    <div className="flex">
      <SidebarDokter />

      <div className="flex flex-col w-full bg-slate-100">
        <div className="flex justify-between items-center mb-4 p-4 ml-10">
          <h1 className="text-2xl font-bold">Daftar Dokter</h1>
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
                Tambah Dokter
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
                  Nama Dokter
                </th>
                <th scope="col" className="px-4 py-2 text-lg">
                  Spesialisasi Dokter
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
              {dokters.map((dokter, index) => (
                <tr
                  key={dokter.ID_Dokter}
                  className="border-b border-neutral-200 dark:border-white/10"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{dokter.nama}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {dokter.spesialisasi}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {dokter.no_Telepon}
                  </td>
                  <td className="whitespace-nowrap py-4 flex justify-evenly">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openEditModal(dokter)}
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
                      onClick={() => handleDelete(dokter.ID_Dokter)}
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

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Dokter Modal"
        >
          <h2 className="text-2xl mb-4">
            {isEditing ? "Edit Dokter" : "Tambah Dokter"}
          </h2>
          <form onSubmit={isEditing ? handleEditSubmit : handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg mb-2">Nama:</label>
              <input
                type="text"
                name="nama"
                value={newDokter.nama}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2">Spesialisasi:</label>
              <input
                type="text"
                name="spesialisasi"
                value={newDokter.spesialisasi}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2">No. Telepon:</label>
              <input
                type="text"
                name="no_Telepon"
                value={newDokter.no_Telepon}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {isEditing ? "Update" : "Tambah"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default DaftarDokter;
