import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { TbMessageReportFilled, TbReportSearch } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";
import UseRole from "../Hooks/UseRole";
import logo from "../assets/logo.png";
import { FaHome, FaUsers } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import {
  MdManageAccounts,
  MdOutlineAppBlocking,
  MdOutlineAssignmentTurnedIn,
  MdOutlineViewCarousel,
} from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { GiCloverSpiked } from "react-icons/gi";

const DashboardLayout = () => {
  const { role } = UseRole();
  console.log("this is role", role);

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* CONTENT */}
      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            ☰
          </label>
          <div className="px-4">City Fix Dashboard</div>
        </nav>

        <Outlet />
        <div className="p-4" />
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">
            {/* HOME */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <img className="w-[70px]" src={logo} alt="logo" />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard Home"
              >
                <FaHome></FaHome>
                <span className="is-drawer-close:hidden">Dashboard Home</span>
              </NavLink>
            </li>

            {/* ================= ADMIN ================= */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/all-issus-table"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip=" View All Issues"
                  >
                    <MdOutlineViewCarousel />
                    <span className="is-drawer-close:hidden">
                      View All Issues
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manage-staff"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage staff"
                  >
                    <MdManageAccounts />
                    <span className="is-drawer-close:hidden">Manage Staff</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-profile"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Profile"
                  >
                    <ImProfile />
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/user-block-manage"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="User Block Manage"
                  >
                    <MdOutlineAppBlocking />
                    <span className="is-drawer-close:hidden">
                      User Block Manage
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/user-management"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="User Management"
                  >
                    <FaUsers />
                    <span className="is-drawer-close:hidden">
                      User Management
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/view-payments"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="View Payments"
                  >
                    <RiSecurePaymentFill />
                    <span className="is-drawer-close:hidden">
                      View Payments
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* ================= STAFF ================= */}
            {role === "staff" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/assigned-issues"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assigned Issues"
                  >
                    <MdOutlineAssignmentTurnedIn />
                    <span className="is-drawer-close:hidden">
                      Assigned Issues
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-profile"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Profile"
                  >
                    <ImProfile />
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* ================= CITIZEN ================= */}
            {role === "user" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-issus"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Issus"
                  >
                    <TbReportSearch />
                    <span className="is-drawer-close:hidden">My Issues</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-profile"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Profile"
                  >
                    <ImProfile />
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
