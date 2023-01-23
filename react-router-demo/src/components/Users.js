import { Outlet, NavLink, useSearchParams } from "react-router-dom";

export const Users = () => {
  const userLinkStyles = ({ isActive }) => {
    return {
      display: isActive ? "block" : "block",
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "none",
    };
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const showActiveUsers = searchParams.get("filter") === "active";
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

      <div>
        <button onClick={() => setSearchParams({ filter: "active" })}>
          Active Users
        </button>
        <button onClick={() => setSearchParams({})}>Reset Filter</button>
      </div>
      {showActiveUsers ? (
        <h2>Showing all active users</h2>
      ) : (
        <h2>Showing all users</h2>
      )}
    </div>
  );
};
