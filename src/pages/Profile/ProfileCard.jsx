import { Link } from "react-router-dom";

const ProfileCard = ({ path, icon, title, description }) => {
  return (
    <Link to={path}>
      <div className="profile-card-0012">
        <div>{icon}</div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default ProfileCard;
