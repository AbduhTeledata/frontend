import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu mt-4 pl-4 has-shadow">
        <p className="menu-label">
             <h2>
              <strong>Menu Dashboard</strong>
            </h2>
        </p>
        <ul className="menu-list">
             <li>
                <NavLink to={"/dashboard"}>
                    <IoHome />Dashboard
                </NavLink></li>
             <li>
                <NavLink to={"/products"}>
                  <IoPricetag />Jasa
                </NavLink>
            </li>
            <li>
                <NavLink to={"/carts"}>
                  <IoPricetag />Transaksi
                </NavLink>
            </li>
            <li>
                <NavLink to={"/reports"}>
                  <IoPricetag />Laporan
                </NavLink>
            </li>
        </ul>
        {user && user.role === "Owner" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}
       
        <p className="menu-label">
            Settings
        </p>
        <ul className="menu-list">
            <li>
                <button onClick={logout} className='is-white'>
                    <IoLogOut />Logout
                </button>
            </li>
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar;
