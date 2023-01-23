import { Outlet, NavLink } from "react-router-dom";

export const Users = () => {
  const userLinkStyles = ({ isActive }) => {
    return {
      display: isActive ? "block" : "block",
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "none",
    };
  };

  return (
    <div className="users">
      <NavLink to="1" style={userLinkStyles}>
        Users 1
      </NavLink>
      <NavLink to="2" style={userLinkStyles}>
        Users 2
      </NavLink>
      <NavLink to="3" style={userLinkStyles}>
        Users 3
      </NavLink>

      <Outlet />
    </div>
  );
};
