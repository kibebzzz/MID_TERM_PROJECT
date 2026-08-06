import API from "./api";

export const getNotifications = async (userId) => {

  const response = await fetch(

    `${API}/notifications/${userId}`

  );

  return await response.json();

};

export const markNotificationRead = async (id) => {

  const response = await fetch(

    `${API}/notifications/${id}/read`,

    {

      method: "PATCH",

    }

  );

  return await response.json();

};

export const markAllNotificationsRead = async (userId) => {

  const response = await fetch(

    `${API}/notifications/read-all/${userId}`,

    {

      method: "PATCH",

    }

  );

  return await response.json();

};

export const deleteNotification = async (id) => {

  const response = await fetch(

    `${API}/notifications/${id}`,

    {

      method:"DELETE",

    }

  );

  return await response.json();

};

export const clearNotifications = async (
  userId
) => {

  const response = await fetch(

    `${API}/notifications/user/${userId}`,

    {

      method:"DELETE",

    }

  );

  return await response.json();

};