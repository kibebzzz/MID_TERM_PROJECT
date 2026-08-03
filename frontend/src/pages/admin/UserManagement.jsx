import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Menu } from "@headlessui/react";
import { MoreVertical } from "lucide-react";

import {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
} from "../../services/adminService";

const UserManagement = () => {

  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
const [roleFilter, setRoleFilter] = useState("ALL");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {

    const response = await getAllUsers(token);

    if (response.success) {
      setUsers(response.data);
    } else {
      toast.error(response.message);
    }

  };

  return (

    <section>

      <h1 className="text-5xl font-black">
        User Management
      </h1>

      <p className="text-gray-500 mt-3">
        View all users registered on Palette.
      </p>

<div className="flex flex-col md:flex-row gap-4 mt-8 mb-8">

  <input
    type="text"
    placeholder="Search by name or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="flex-1 border rounded-xl px-4 py-3"
  />

  <select
    value={roleFilter}
    onChange={(e) => setRoleFilter(e.target.value)}
    className="border rounded-xl px-4 py-3"
  >
    <option value="ALL">All Roles</option>
    <option value="BUYER">Buyer</option>
    <option value="ARTIST">Artist</option>
    <option value="ADMIN">Admin</option>
  </select>

</div>      

      <div className="bg-white rounded-3xl shadow mt-10 overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-5">
                User
              </th>

              <th>
                Email
              </th>

              <th>
                Role
              </th>

              <th>
                Joined
              </th>

              <th>Status</th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users
  .filter((user) => {

    const matchesSearch =

      user.fullName
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      user.email
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRole =

      roleFilter === "ALL" ||

      user.role === roleFilter;

    return matchesSearch && matchesRole;

  })
  .map((user) => (
    
              <tr
                key={user.id}
                className="border-t"
              >

                <td className="p-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        user.profileImage ||
                        "https://placehold.co/80"
                      }
                      className="w-14 h-14 rounded-full object-cover"
                    />

                    <div>

                      <h3 className="font-bold">
                        {user.fullName}
                      </h3>

                    </div>

                  </div>

                </td>

                <td>
                  {user.email}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === "ADMIN"
                        ? "bg-red-100 text-red-700"
                        : user.role === "ARTIST"
                        ? "bg-cyan-100 text-cyan-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >

                    {user.role}

                  </span>

                </td>

                <td>
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>

  {user.isActive ? (

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

      Active

    </span>

  ) : (

    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">

      Suspended

    </span>

  )}

</td>

                <td>

  <Menu as="div" className="relative inline-block text-left">

    <Menu.Button className="p-2 rounded-lg hover:bg-gray-100">

      <MoreVertical size={18} />

    </Menu.Button>

    <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl bg-white shadow-xl border focus:outline-none z-50">

      {user.role !== "ADMIN" && (

        <Menu.Item>

          {({ active }) => (

            <button

              className={`${
                active
                  ? "bg-gray-100"
                  : ""
              } w-full text-left px-4 py-3`}

              onClick={async () => {

                const newRole =
                  user.role === "BUYER"
                    ? "ARTIST"
                    : "BUYER";

                const response =
                  await updateUserRole(
                    token,
                    user.id,
                    newRole
                  );

                if (response.success) {

                  toast.success("Role updated.");

                  loadUsers();

                } else {

                  toast.error(response.message);

                }

              }}

            >

              {user.role === "BUYER"
                ? "Promote to Artist"
                : "Demote to Buyer"}

            </button>

          )}

        </Menu.Item>

      )}

      <Menu.Item>

        {({ active }) => (

          <button

            className={`${
              active
                ? "bg-gray-100"
                : ""
            } w-full text-left px-4 py-3 text-red-600`}

            onClick={async () => {

              const response =
                await toggleUserStatus(
                  token,
                  user.id
                );

              if (response.success) {

                toast.success("User updated.");

                loadUsers();

              } else {

                toast.error(response.message);

              }

            }}

          >

            {user.isActive
              ? "Suspend User"
              : "Reactivate User"}

          </button>

        )}

      </Menu.Item>

    </Menu.Items>

  </Menu>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>

  );

};

export default UserManagement;