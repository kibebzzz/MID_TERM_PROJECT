import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getSupportTickets,
  updateSupportStatus,
} from "../../services/supportService";

const SupportTickets = () => {

  const [tickets, setTickets] = useState([]);

  const loadTickets = async () => {

    const response =
      await getSupportTickets();

    if (response.success) {

      setTickets(response.data);

    }

  };

  useEffect(() => {

    loadTickets();

  }, []);

  const changeStatus = async (
    id,
    status
  ) => {

    const response =
      await updateSupportStatus(
        id,
        status
      );

   if (response.success) {

  const refreshed =
    await getSupportTickets();

  if (refreshed.success) {

    setTickets(refreshed.data);

  }

  toast.success("Status updated.");

}

  };

  return (

    <section className="max-w-7xl mx-auto px-8 py-12">

      <h1 className="text-5xl font-black">

        Support Tickets

      </h1>

      <p className="text-gray-500 mt-3">

        Manage customer enquiries.

      </p>

      <div className="mt-10 space-y-6">

        {tickets.length === 0 ? (

          <p>No support tickets.</p>

        ) : (

          tickets.map((ticket) => (

            <div
              key={ticket.id}
              className="bg-white rounded-3xl shadow p-8"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="font-bold text-xl">

                    {ticket.subject}

                  </h2>

                  <p className="text-gray-500 mt-2">

                    {ticket.user?.fullName ||
                      "Guest User"}

                  </p>

                </div>

                <select

                  value={ticket.status}

                  onChange={(e)=>

                    changeStatus(

                      ticket.id,

                      e.target.value

                    )

                  }

                  className="border rounded-xl px-4"

                >

                  <option value="OPEN">

                    OPEN

                  </option>

                  <option value="IN_PROGRESS">

                    IN PROGRESS

                  </option>

                  <option value="RESOLVED">

                    RESOLVED

                  </option>

                </select>

              </div>

              <div className="mt-6">

                <span className="font-semibold">

                  Category:

                </span>{" "}

                {ticket.category}

              </div>

              <p className="mt-5 text-gray-600">

                {ticket.message}

              </p>

              <p className="text-gray-400 mt-6">

                {new Date(
                  ticket.createdAt
                ).toLocaleString()}

              </p>

            </div>

          ))

        )}

      </div>

    </section>

  );

};

export default SupportTickets;