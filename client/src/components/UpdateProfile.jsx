import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import Button from "../ui/Button";
import { logoutUser } from "../services/apiTODOio";

function UpdateProfile({ setProfileCard }) {
  const { username, email, profilePic, id, dispatch: AuthDispatch } = useAuth();
  const user = { username, email, profilePic, id };

  const [editUser, setEditUser] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.username || "",
    email: user?.email || "",
    profilePic: user?.profilePic || "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profilePic: url }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSave(formData);
  };

  const handleLogout = async () => {
    const data = await logoutUser(id);

    if (data.status === "success") {
      AuthDispatch({ type: "logout" });
      setProfileCard(false);
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white rounded-3xl shadow-xl p-8 w-[90%] max-w-md flex flex-col gap-6">
        <button
          className="absolute top-2 right-2 p-4 rounded-full text-amber-900 hover:bg-amber-100 transition"
          onClick={() => setProfileCard(false)}
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-amber-900 text-center">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Profile Photo Preview */}
          <div className="flex flex-col justify-center items-center gap-2">
            <img
              src={formData.profilePic || "https://i.pravatar.cc/150?u=user"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-amber-300"
            />
            {editUser && (
              <input
                type="file"
                accept="image/*"
                name="profilePic"
                onChange={handleChange}
                className="text-sm text-amber-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-900 hover:file:bg-amber-200"
              />
            )}
            {!editUser && (
              <Button type="primary" onClick={handleLogout}>
                LogOut
              </Button>
            )}
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block font-semibold text-amber-800 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-amber-50 border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-900 disabled:opacity-50"
              placeholder="Your full name"
              disabled={!editUser}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-amber-800 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-amber-50 border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-900 disabled:opacity-50"
              placeholder="you@example.com"
              disabled={!editUser}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setEditUser(!editUser);
              }}
              className="px-4 py-2 rounded-lg border-2 border-amber-900 text-amber-900 font-semibold hover:bg-amber-50 transition"
            >
              {editUser ? "Cancel" : "Edit Profile"}
            </button>
            {editUser && (
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-amber-900 text-white font-semibold hover:bg-amber-800 transition"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateProfile;
