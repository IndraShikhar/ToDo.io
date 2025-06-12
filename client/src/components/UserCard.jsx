import { useToDo } from "../contexts/ToDoContext";
import ProfilePic from "./ui/ProfilePic";
import LogOut from "@mui/icons-material/PowerSettingsNew";

function UserCard({ handleLogout, setEditProfile }) {
  const { user } = useToDo();

  return (
    <div className="flex flex-1 gap-4 justify-end p-8 text-3xl font-bold text-amber-100 border-amber-300 bg-amber-900">
      <p className="flex flex-col mr-auto">
        Welcome,<span>{user.displayname}</span>
      </p>
      <div
        className="self-start cursor-pointer flex"
        onClick={() => {
          console.log("Logout");
          handleLogout();
        }}
      >
        <LogOut className="text-amber-50 cursor-pointer" />
      </div>
      <ProfilePic
        onClick={() => {
          setEditProfile(true);
        }}
      />
    </div>
  );
}

export default UserCard;
