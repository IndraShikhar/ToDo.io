function ProfilePic({ onClick }) {
  return (
    <div
      className="aspect-square overflow-hidden rounded-full"
      style={{ width: "80px" }}
      onClick={onClick}
    >
      <img className="w-full" src="https://i.pravatar.cc/400?u=user" alt="" />
      {/* <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" /> */}
    </div>
  );
}

export default ProfilePic;
