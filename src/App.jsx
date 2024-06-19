import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterPage from "./Page/RegisterPage.jsx";
import LoginPage from "./Page/LoginPage.jsx";
import BerandaPage from "./Page/BerandaPage.jsx";
import NotFoundPage from "./Page/NotFoundPage.jsx";
import ProfilPage from "./Page/ProfilPage.jsx";
import DaftarObatPage from "./Page/DaftarObatPage.jsx";
import RiwayatPage from "./Page/RiwayatPage.jsx";
import Settingspage from "./Page/Settingspage.jsx";
import DaftarDokter from "./Page/DaftarDokter.jsx";
import DaftarPasien from "./Page/DaftarPasien.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/beranda" element={<BerandaPage />} />
        <Route path="/daftarObat" element={<DaftarObatPage />} />
        <Route path="/daftarDokter" element={<DaftarDokter />} />
        <Route path="/daftarPasien" element={<DaftarPasien />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/riwayatPendaftaran" element={<RiwayatPage />} />
        <Route path="/settings" element={<Settingspage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
