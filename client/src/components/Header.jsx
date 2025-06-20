import { Link, useLocation, useNavigate } from "react-router";
import Button from "../ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import ProfilePic from "../ui/ProfilePic";
import UpdateProfile from "./UpdateProfile";

function Header() {
  const [primary, setPrimary] = useState(false);
  const [profileCard, setProfileCard] = useState(false);
  const { username, isLoggedIn, profilePic } = useAuth();
  const location = useLocation();
  const navigator = useNavigate();

  useEffect(
    function () {
      const pathname = location.pathname;
      setPrimary(pathname.startsWith("/app"));
    },
    [location.pathname]
  );

  return (
    <>
      {profileCard && <UpdateProfile setProfileCard={setProfileCard} />}
      <div className={`font-bold tracking-widest max-h-20`}>
        <div className="flex items-center justify-between px-6 py-4 bg-amber-400 h-full">
          <div className="flex items-center">
            <Link
              to="/"
              className={`flex items-center text-amber-900 text-2xl`}
            >
              ToDo<span className="text-amber-50">.io</span>
            </Link>
          </div>
          {!isLoggedIn && (
            <div>
              <Button to="/login" type="primary">
                Login
              </Button>
            </div>
          )}
          {isLoggedIn && (
            <div
              className="flex items-center"
              onClick={() => {
                setProfileCard(true);
              }}
            >
              <ProfilePic src={profilePic} />
              <span className="ml-2 uppercase">{username}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );

  // return (
  //   <div
  //     className={`${
  //       primary
  //         ? "text-xl font-bold tracking-widest px-10 py-8 flex items-center justify-between bg-amber-800"
  //         : "text-xl font-bold tracking-widest px-6 py-4 flex items-center justify-between bg-amber-400"
  //     } transition-all duration-300`}
  //   >
  //     {!primary && (
  //       <>
  //         <div className="flex items-center">
  //           <Link to="/" className={`flex items-center text-amber-900`}>
  //             ToDo<span className="text-amber-50">.io</span>
  //           </Link>
  //         </div>
  //         {!isLoggedIn && (
  //           <div>
  //             <Button to="/login" type="primary">
  //               Login
  //             </Button>
  //           </div>
  //         )}
  //       </>
  //     )}
  //     {/* {primary && (
  //       <>
  //         <div className="flex flex-col items-center">
  //           Welcome Back,<span className="uppercase">{username}</span>
  //         </div>
  //         <div className="flex gap-4 justify-center items-center">
  //           <p
  //             className={`text-base font-semibold tracking-normal uppercase ${
  //               primary ? "text-amber-50" : "text-amber-900"
  //             }`}
  //           >
  //             {username}
  //           </p>
  //           <ProfilePic src={profilePic} />
  //         </div>
  //       </>
  //     )} */}
  //     {primary && (
  //       // <div className="flex flex-1 gap-4 justify-end p-8 text-3xl font-bold text-amber-100 border-amber-300 bg-amber-900">
  //       <>
  //         <p className="flex flex-col mr-auto">
  //           Welcome,<span>{username}</span>
  //         </p>
  //         <div
  //           className="self-start cursor-pointer flex"
  //           onClick={() => {
  //             //   handleLogout();
  //           }}
  //         >
  //           <LogOut className="text-amber-50 cursor-pointer" />
  //         </div>
  //       </> // </div>
  //     )}

  //     <div className="flex gap-4 justify-center items-center">
  //       {!primary && isLoggedIn && (
  //         <p
  //           className={`text-base font-semibold tracking-normal uppercase ${
  //             primary ? "text-amber-50" : "text-amber-900"
  //           }`}
  //         >
  //           {username}
  //         </p>
  //       )}
  //       <ProfilePic
  //         src={profilePic}
  //         type={`${primary ? "large" : "basic"}`}
  //         onClick={() => {
  //           //   setEditProfile(true);
  //         }}
  //       />
  //     </div>
  //   </div>
  // );
}

export default Header;
