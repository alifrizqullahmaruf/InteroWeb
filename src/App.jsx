import { BrowserRouter as Router,Routes,Route } from "react-router-dom"

import RegisterPage from './Page/RegisterPage.jsx'
import LoginPage from "./Page/LoginPage.jsx"
import BerandaPage from "./Page/BerandaPage.jsx"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/beranda" element={<BerandaPage />} />
        <Route path="/profil" element={<RegisterPage />} />
        <Route path="/daftarObat" element={<RegisterPage />} />
        <Route path="/riwayatPendaftaran" element={<RegisterPage />} />
        {/* <Route path="/Logout" element={<RegisterPage />} /> */}

      </Routes>
    </Router>
  )
}

export default App
