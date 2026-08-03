import { Outlet } from "react-router-dom";

import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">

      <AdminSidebar />

      <div className="flex-1">

        <AdminTopbar />

        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;