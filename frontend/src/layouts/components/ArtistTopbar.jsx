import { Bell } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { useAuth } from "../../context/AuthContext";

import NotificationDropdown from "../../components/notifications/NotificationDropdown";
import { getNotifications } from "../../services/notificationService";

const ArtistTopbar = () => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

const [notifications, setNotifications] = useState([]);

const dropdownRef = useRef(null);

const loadNotifications = async () => {

  if (!user) return;

  const response =
    await getNotifications(user.id);

  if (response.success) {

    setNotifications(response.data);

  }

};

useEffect(() => {

  if (user) {

    loadNotifications();

  }

}, [user]);

const unreadCount = notifications.filter(

  (notification) => !notification.isRead

).length;

useEffect(() => {

  const handleClickOutside = (event) => {

    if (

      dropdownRef.current &&

      !dropdownRef.current.contains(event.target)

    ) {

      setOpen(false);

    }

  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

}, []);

  return (
    <header className="bg-white border-b px-8 py-5 flex justify-between items-center">

      <div>
        <h2 className="text-2xl font-bold">
          Welcome back,
        </h2>

        <p className="text-gray-500">
          {user?.fullName}
        </p>
      </div>

     <div
  className="relative"
  ref={dropdownRef}
>

  <button
    onClick={() => setOpen(!open)}
    className="relative p-3 rounded-full hover:bg-gray-100 transition"
  >

    <Bell size={22} />

    {unreadCount > 0 && (

      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">

        {unreadCount}

      </span>

    )}

  </button>

  {open && (

    <NotificationDropdown

      notifications={notifications}

      refreshNotifications={loadNotifications}

      onClose={() => {

        setOpen(false);

        loadNotifications();

      }}

    />

  )}

</div>

    </header>
  );
};

export default ArtistTopbar;