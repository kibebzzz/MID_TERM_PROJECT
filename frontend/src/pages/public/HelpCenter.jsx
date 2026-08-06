import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { createSupportTicket } from "../../services/supportService";

const HelpCenter = () => {

  const { user } = useAuth();

  const [form, setForm] = useState({

    subject: "",

    category: "General",

    message: "",

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await createSupportTicket({

      ...form,

      userId: user?.id,

    });

    if (response.success) {

      toast.success("Support request submitted.");

      setForm({

        subject: "",

        category: "General",

        message: "",

      });

    } else {

      toast.error(response.message);

    }

  };

  return (

    <section className="max-w-5xl mx-auto py-20 px-8">

      <h1 className="text-5xl font-black">

        Help Center

      </h1>

      <p className="text-gray-500 mt-4">

        Have a question or encountered a problem? Send a message directly to our administrators.

      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow p-10 mt-10 space-y-6"
      >

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full border rounded-xl p-4"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded-xl p-4"
        >

          <option>General</option>

          <option>Orders</option>

          <option>Payments</option>

          <option>Artists</option>

          <option>Account</option>

          <option>Technical Issue</option>

        </select>

        <textarea
          name="message"
          rows={8}
          placeholder="Describe your issue..."
          value={form.message}
          onChange={handleChange}
          className="w-full border rounded-xl p-4"
          required
        />

        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl"
        >

          Submit Request

        </button>

      </form>

    </section>

  );

};

export default HelpCenter;