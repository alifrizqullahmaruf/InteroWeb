import SidebarBeranda from "../Components/SidebarBeranda";
import { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";

const BASE_URL = "http://127.0.0.1:8000/kesehatan.php?table=";

Modal.setAppElement("#root");

const BerandaPage = () => {
  const [patients, setPatients] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pasienList, setPasienList] = useState([]);
  const [dokterList, setDokterList] = useState([]);
  const [penyakitList, setPenyakitList] = useState([]);
  const [obatList, setObatList] = useState([]);
  const [formData, setFormData] = useState({
    ID_Pasien: "",
    ID_Dokter: "",
    ID_Penyakit: "",
    ID_Obat: "",
  });

  const fetchData = useCallback(async (table, setData) => {
    try {
      const response = await fetch(`${BASE_URL}${table}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  useEffect(() => {
    fetchData("pasien", setPasienList);
    fetchData("dokter", setDokterList);
    fetchData("penyakit", setPenyakitList);
    fetchData("obat", setObatList);
  }, [fetchData]);

  const fetchPatients = async () => {
    try {
      const response = await fetch(BASE_URL + "informasipasiendokter");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const patient = await response.json();
      setPatients(patient);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL + "hubungan", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });
      if (response.ok) {
        alert("Hubungan added successfully!");
        fetchPatients(); // Update the patients list
        closeModal();
      } else {
        alert("Failed to add hubungan");
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-300">
      <SidebarBeranda />

      <div className="flex flex-col w-full bg-slate-100">
        <div className="flex justify-between items-center mb-4 p-4 ml-10">
          <h1 className="text-2xl font-bold">Beranda</h1>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-10">
            <img
              src="path_to_profile_photo.jpg"
              alt="Profil"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <hr className="mb-4 border-gray-300 w-full" />

        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-[30%] p-5 ml-10">
            <h2 className="text-3xl font-bold mb-2 text-blue-600">Akun</h2>
            <div className="container mx-auto w-full bg-blue-600 rounded-lg">
              <h2 className="text-4xl font-bold text-white p-2 ml-6">Email</h2>
              <p className="text-xl text-white p-2 mb-4 ml-6">
                alifffamin@gmail.com
              </p>
              <h2 className="text-4xl font-bold text-white p-2 ml-6">
                Username
              </h2>
              <p className="text-xl text-white p-2 mb-4 ml-6">alifffamin</p>
              <h2 className="text-4xl font-bold text-white p-2 ml-6">Role</h2>
              <p className="text-xl text-white p-2 mb-4 ml-6">Admin</p>
              <div className="container mx-auto bg-blue-800 flex justify-end p-4 rounded-lg">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <img
                    src="src/assets/settingslogo.png"
                    alt="Profil"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[70%] p-4 ml-16 bg-slate-100 md:ml-4 md:mt-0">
            <div className="flex justify-between m-4">
              <h1 className="text-2xl font-bold mb-4">Jadwal Pasien</h1>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={openModal}
              >
                Tambah Hubungan
              </button>
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-4 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-4 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light text-surface dark:text-black bg-white rounded-lg">
                      <thead className="border-b border-neutral-200 font-medium dark:border-black/10 p-4">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            #
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Waktu Konsul
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Nama Pasien
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Nama Dokter
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Penyakit
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Obat
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Alamat
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {patients.map((patient, index) => (
                          <tr
                            key={patient.ID_Hubungan}
                            className="border-b border-neutral-200 dark:border-white/10"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              29 Mei 2024
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {patient.Nama_Pasien}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {patient.Nama_Dokter}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {patient.Nama_Penyakit}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {patient.Nama_Obat}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {patient.Alamat}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Tambah Hubungan Modal"
          // className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-xl font-bold mb-4">Tambah Hubungan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Pasien:</label>
              <select
                name="ID_Pasien"
                value={formData.ID_Pasien}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded"
                required
              >
                <option value="">Pilih Pasien</option>
                {pasienList.map((pasien) => (
                  <option key={pasien.ID_Pasien} value={pasien.ID_Pasien}>
                    {pasien.nama}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Dokter:</label>
              <select
                name="ID_Dokter"
                value={formData.ID_Dokter}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded"
                required
              >
                <option value="">Pilih Dokter</option>
                {dokterList.map((dokter) => (
                  <option key={dokter.ID_Dokter} value={dokter.ID_Dokter}>
                    {dokter.nama}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Penyakit:</label>
              <select
                name="ID_Penyakit"
                value={formData.ID_Penyakit}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded"
                required
              >
                <option value="">Pilih Penyakit</option>
                {penyakitList.map((penyakit) => (
                  <option
                    key={penyakit.ID_Penyakit}
                    value={penyakit.ID_Penyakit}
                  >
                    {penyakit.nama_Penyakit}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Obat:</label>
              <select
                name="ID_Obat"
                value={formData.ID_Obat}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded"
                required
              >
                <option value="">Pilih Obat</option>
                {obatList.map((obat) => (
                  <option key={obat.ID_Obat} value={obat.ID_Obat}>
                    {obat.nama_Obat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Tambah
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
    </div>
  );
};

export default BerandaPage;
