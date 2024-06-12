import Sidebar, { SidebarItem } from "./Sidebar";
import { useNavigate } from "react-router-dom";
import {
  LifeBuoy,
  Boxes,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const SidebarDokter = () => {
  const navigate = useNavigate(); // Get the navigate function

  const handleClick = (route) => {
    navigate(route); // Use the navigate function to go to the '/register' route
  };
  return (
    <div>
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          onClick={() => handleClick("/beranda")}
        />
        <SidebarItem
          icon={<UserCircle size={20} />}
          text="Daftar dokter"
          active
          alert
          onClick={() => handleClick("/daftarDokter")}
        />
        <SidebarItem
          icon={<UserCircle size={20} />}
          text="Daftar pasien"
          onClick={() => handleClick("/daftarPasien")}
        />
        <SidebarItem
          icon={<BarChart3 size={20} />}
          text="Daftar obat"
          onClick={() => handleClick("/daftarObat")}
        />
        <SidebarItem
          icon={<UserCircle size={20} />}
          text="Profil"
          onClick={() => handleClick("/profil")}
        />
        <SidebarItem
          icon={<Boxes size={20} />}
          text="Riwayat"
          onClick={() => handleClick("/riwayatPendaftaran")}
        />

        <hr className="my-3" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          onClick={() => handleClick("/settings")}
        />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Logout" />
      </Sidebar>
    </div>
  );
};

export default SidebarDokter;
