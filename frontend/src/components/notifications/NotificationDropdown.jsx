import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  Bell,
  Star,
  Package,
  ShieldCheck,
  LifeBuoy,
  Trash2,
} from "lucide-react";
import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
  clearNotifications,
} from "../../services/notificationService";

import { useAuth } from "../../context/AuthContext";

const NotificationDropdown = ({
  notifications,
  refreshNotifications,
  onClose,
}) => {

  const navigate = useNavigate();

  const { user } = useAuth();

  

  const handleClick = async (notification) => {

    if (!notification.isRead) {

      await markNotificationRead(
        notification.id
      );

      await refreshNotifications();

    }

    if (notification.link) {

      navigate(notification.link);

    }

    onClose();

  };

  const getIcon = (type) => {

  switch (type) {

    case "SUPPORT":
      return <LifeBuoy className="text-red-500" size={20} />;

    case "ORDER":
      return <Package className="text-green-500" size={20} />;

    case "REVIEW":
      return <Star className="text-yellow-500" size={20} />;

    case "VERIFICATION":
      return <ShieldCheck className="text-cyan-500" size={20} />;

    default:
      return <Bell className="text-gray-500" size={20} />;

  }

};

const getTimeAgo = (date) => {

  const seconds =
    Math.floor(
      (Date.now() - new Date(date)) / 1000
    );

  if (seconds < 60)
    return "Just now";

  const minutes =
    Math.floor(seconds / 60);

  if (minutes < 60)
    return `${minutes} min ago`;

  const hours =
    Math.floor(minutes / 60);

  if (hours < 24)
    return `${hours} hr ago`;

  const days =
    Math.floor(hours / 24);

  if (days === 1)
    return "Yesterday";

  return `${days} days ago`;

};

  return (

    <motion.div

  initial={{
    opacity: 0,
    y: -15,
    scale: 0.96,
  }}

  animate={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}

  exit={{
    opacity: 0,
    y: -15,
    scale: 0.96,
  }}

  transition={{
    duration: 0.22,
  }}

  className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border z-50 max-h-[500px] overflow-y-auto"

>

      <div className="p-5 border-b">

       <div className="flex justify-between items-center">

  <h2 className="font-bold text-xl">

    Notifications

  </h2>

  {notifications.length > 0 && (

    <button

      onClick={async()=>{

        await clearNotifications(user.id);

       await refreshNotifications();

      }}

      className="text-red-500 text-sm"

    >

      Clear All

    </button>

  )}

</div>

      </div>

      {notifications.length === 0 ? (

        <div className="text-center py-12">

  <Bell
    size={50}
    className="mx-auto text-gray-300"
  />

  <h3 className="font-bold mt-5">

    You're all caught up!

  </h3>

  <p className="text-gray-500 mt-2">

    No new notifications.

  </p>

</div>

      ) : (

        notifications.map((notification)=>(

          <motion.div

  initial={{
    opacity: 0,
    x: 25,
  }}

  animate={{
    opacity: 1,
    x: 0,
  }}

  exit={{
    opacity: 0,
    x: 25,
  }}

  layout
  key={notification.id}
  className={`border-b transition ${
    !notification.isRead
      ? "bg-cyan-50 border-l-4 border-cyan-500"
      : "bg-white"
  }`}
>

  <div
    onClick={() => handleClick(notification)}
    className="cursor-pointer p-5 hover:bg-gray-50"
  >

    <div className="flex justify-between">

      <div className="flex gap-3">

        {getIcon(notification.type)}

        <div>

          <h3 className="font-bold">

            {notification.title}

          </h3>

          <p className="text-gray-600 mt-1">

            {notification.message}

          </p>

          <p className="text-xs text-gray-400 mt-2">

            {getTimeAgo(notification.createdAt)}

          </p>

        </div>

      </div>

      <button

        onClick={async (e) => {

          e.stopPropagation();

          await deleteNotification(notification.id);

          await refreshNotifications();

        }}

        className="text-red-500 hover:text-red-700"

      >

        <Trash2 size={16} />

      </button>

    </div>

  </div>

</motion.div>

        ))

      )}

    </motion.div>

  );

};

export default NotificationDropdown;