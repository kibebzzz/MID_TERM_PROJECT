import API from "./api";

export const createSupportTicket = async (data) => {

  const response = await fetch(

    `${API}/support`,

    {

      method: "POST",

      headers: {

        "Content-Type":"application/json",

      },

      body: JSON.stringify(data),

    }

  );

  return await response.json();

};

export const getSupportTickets = async () => {

  const response = await fetch(

    `${API}/support`

  );

  return await response.json();

};

export const updateSupportStatus = async (

  id,

  status

) => {

  const response = await fetch(

    `${API}/support/${id}`,

    {

      method:"PATCH",

      headers:{

        "Content-Type":"application/json",

      },

      body:JSON.stringify({

        status,

      }),

    }

  );

  return await response.json();

};