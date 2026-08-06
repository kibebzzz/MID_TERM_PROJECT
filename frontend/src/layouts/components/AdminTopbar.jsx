import { Bell } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { useAuth } from "../../context/AuthContext";

import NotificationDropdown from "../../components/notifications/NotificationDropdown";
import { getNotifications } from "../../services/notificationService";

const AdminTopbar = () => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

const [notifications, setNotifications] = useState([]);

const dropdownRef = useRef(null);

useEffect(() => {

  if (user) {

    loadNotifications();

  }

}, [user]);

const loadNotifications = async () => {

  if (!user) return;

  const response = await getNotifications(user.id);

  if (response.success) {

    setNotifications(response.data);

  }

};

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
    <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">

      <div>

        <h2 className="text-2xl font-bold">
          Welcome,
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
    className="relative"
  >

    <Bell size={24} />

    {unreadCount > 0 && (

      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">

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

export default AdminTopbar;