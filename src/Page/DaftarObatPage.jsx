import SidebarObat from "../Components/SidebarObat";
import { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";

const BASE_URL = "http://127.0.0.1:8000/kesehatan.php?table=obat";

// Set the app element for react-modal
Modal.setAppElement("#root");

const DaftarObatPage = () => {
  const [obats, setObats] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentObat, setCurrentObat] = useState(null);
  const [newObat, setNewObat] = useState({
    nama_Obat: "",
    deskripsi_Obat: "",
  });

  const fetchObats = useCallback(async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const obat = await response.json();
      setObats(obat);
    } catch (error) {
      console.error("Failed to fetch obats:", error);
    }
  }, []);

  useEffect(() => {
    fetchObats();
  }, [fetchObats]);

  const openModal = () => {
    setModalIsOpen(true);
    setIsEditing(false);
    setNewObat({
      nama_Obat: "",
      deskripsi_Obat: "",
    });
  };

  const openEditModal = (obat) => {
    setModalIsOpen(true);
    setIsEditing(true);
    setCurrentObat(obat);
    setNewObat({
      nama_Obat: obat.nama_Obat,
      deskripsi_Obat: obat.deskripsi_Obat,
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentObat(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewObat((prevObat) => ({
      ...prevObat,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newObat).forEach((key) => {
      formData.append(key, newObat[key]);
    });

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await fetchObats(); // Refetch obats after successful add
      closeModal();
    } catch (error) {
      console.error("Failed to add new obat:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const requestBody = new URLSearchParams();
    requestBody.append("nama_Obat", newObat.nama_Obat);
    requestBody.append("deskripsi_Obat", newObat.deskripsi_Obat);

    try {
      const response = await fetch(
        `${BASE_URL}&ID_Obat=${currentObat.ID_Obat}`,
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
      await fetchObats(); // Refetch obats after successful edit
      closeModal();
    } catch (error) {
      console.error("Failed to update obat:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}&ID_Obat=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await fetchObats(); // Refetch obats after successful delete
    } catch (error) {
      console.error("Failed to delete obat:", error);
    }
  };

  return (
    <div className="flex">
      <SidebarObat />

      <div className="flex flex-col w-full bg-slate-100">
        <div className="flex justify-between items-center mb-4 p-4 ml-10">
          <h1 className="text-2xl font-bold">Daftar Obat</h1>
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
                Tambah Obat
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
                  Nama Obat
                </th>
                <th scope="col" className="px-4 py-2 text-lg">
                  Deskripsi Obat
                </th>
                <th scope="col" className="px-4 py-2 text-lg">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {obats.map((obat, index) => (
                <tr
                  key={`${obat.ID_Obat}-${index}`} // Ensure each child has a unique key prop
                  className="border-b border-neutral-200 dark:border-white/10"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {obat.nama_Obat}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {obat.deskripsi_Obat}
                  </td>
                  <td className="whitespace-nowrap py-4 flex justify-evenly">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openEditModal(obat)}
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
                      onClick={() => handleDelete(obat.ID_Obat)}
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
              {/* Tambahkan baris lain sesuai kebutuhan */}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={isEditing ? "Edit Obat" : "Tambah Obat"}
        // className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            {isEditing ? "Edit Obat" : "Tambah Obat"}
          </h2>
          <form onSubmit={isEditing ? handleEditSubmit : handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg mb-2">Nama Obat</label>
              <input
                type="text"
                name="nama_Obat"
                value={newObat.nama_Obat}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2">Deskripsi Obat</label>
              <textarea
                name="deskripsi_Obat"
                value={newObat.deskripsi_Obat}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                required
              ></textarea>
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
        </div>
      </Modal>
    </div>
  );
};

export default DaftarObatPage;
