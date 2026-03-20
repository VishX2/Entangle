import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Sidebar from "../components/organisms/Sidebar";
import { fetchUsers, updateUser } from "../store/adminApi";
import { selectUsers, selectAdminLoading } from "../store/adminSlice";

// Mapping role IDs to readable role names
const ROLE_MAP = { 1: "Admin", 2: "User" };

export default function UserManagement() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectAdminLoading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Promote a regular user to Admin
  const handlePromote = (user) => {
    if (user.role_id === 1) return;
    dispatch(updateUser({ id: user.id, role_id: 1 }))
      .then((result) => {
        if (updateUser.fulfilled.match(result)) {
          toast.success(`${user.first_name} promoted to Admin`);
        } else {
          toast.error(result.payload || "Failed to promote");
        }
      });
  };

  // Demote an admin back to a regular user
  const handleDemote = (user) => {
    if (user.role_id === 2) return;
    dispatch(updateUser({ id: user.id, role_id: 2 }))
      .then((result) => {
        if (updateUser.fulfilled.match(result)) {
          toast.success(`${user.first_name} set to User`);
        } else {
          toast.error(result.payload || "Failed to update");
        }
      });
  };

  const handleToggleActive = (user) => {
    dispatch(updateUser({ id: user.id, is_active: !user.is_active }))
      .then((result) => {
        if (updateUser.fulfilled.match(result)) {
          toast.success(user.is_active ? "User deactivated" : "User activated");
        } else {
          toast.error(result.payload || "Failed to update");
        }
      });
  };

  // Calculate statistics for dashboard cards
  const adminCount = users.filter((u) => u.role_id === 1).length;
  const userCount = users.filter((u) => u.role_id === 2).length;

  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <p className="text-slate-500 mb-6">
          Manage users, promote to admin, or deactivate accounts
        </p>

        {/* Dashboard statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">Admins</p>
            <p className="text-2xl font-bold">{adminCount}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">Regular Users</p>
            <p className="text-2xl font-bold">{userCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
          ) : (

            // Users table
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className={`border-b border-slate-200 last:border-0 hover:bg-gray-50 transition ${!u.is_active ? "opacity-60" : ""}`}
                  >
                    <td className="px-6 py-4 font-medium">
                      {u.first_name} {u.last_name}
                    </td>

                    <td className="px-6 py-4 text-slate-600">{u.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          u.role_id === 1 ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {ROLE_MAP[u.role_id] ?? "User"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          u.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {u.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {u.role_id === 2 ? (
                        <button
                          onClick={() => handlePromote(u)}
                          className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-medium hover:bg-orange-600"
                        >
                          Promote to Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDemote(u)}
                          className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-300"
                        >
                          Set as User
                        </button>
                      )}
                      <button
                        onClick={() => handleToggleActive(u)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                          u.is_active
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {u.is_active ? "Deactivate" : "Activate"}
                      </button>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Show message if no users exist */}
          {!loading && users.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No users yet. Run seed to create admin.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
