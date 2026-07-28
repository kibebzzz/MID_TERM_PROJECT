import { Outlet } from "react-router-dom";

import ArtistSidebar from "./components/ArtistSidebar";
import ArtistTopbar from "./components/ArtistTopbar";

const ArtistLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      <ArtistSidebar />

      <div className="flex-1 flex flex-col">

        <ArtistTopbar />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default ArtistLayout;