function ProfilePic({ src, type = "basic" }) {
  const basic = "w-12 h-12 rounded-full overflow-hidden";

  const styles = {
    basic: basic,
    large: `${basic} w-20 h-20 border-4 border-amber-50 shadow-2xl`,
  };

  return (
    <div className={styles[type]}>
      <img src={src} alt="" />
    </div>
  );
}

export default ProfilePic;
