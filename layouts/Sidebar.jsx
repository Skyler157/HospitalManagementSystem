import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsPeopleFill, BsPrescription2 } from "react-icons/bs";
import { FiMenu, FiHome } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { VscReferences } from "react-icons/vsc";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { FaAngleRight, FaHospitalUser } from "react-icons/fa6";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { GiArchiveRegister } from "react-icons/gi";


import { useAuth } from "../auth/useAuth";
import {
  MdDashboard,
  MdLocalPharmacy,
  MdOutlineLocalPharmacy,
  MdMedicalInformation,
  MdBed
} from "react-icons/md";
import { FaHospitalSymbol } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { FaPerson } from "react-icons/fa6";


const staticMenuItems = [
  { icon: <MdDashboard size={20} />, label: "Dashboard", path: "/app", roles: ["admin", "doctor", "nurse", "receptionist", "pharmacist", "lab technician", "cashier", "hospital administrator", "patient", "triage nurse"] },
  { icon: <GiArchiveRegister size={20} /> , label: "Registry", path: "/app/registry", roles: ["admin", "doctor", "nurse", "lab technician", "hospital administrator"] },
  { icon: <FaWpforms size={20} /> , label: "Triage", path: "/app/triage", roles: ["admin", "doctor", "nurse", "lab technician", "hospital administrator"] },
  
  {

    icon: <MdMedicalInformation   size={20} />,
    label: "Medical Record Tab",
    path: "/app/treatment-plan",
    roles: [
      "admin",
      "doctor",
      "nurse",
      "receptionist",
      "pharmacist",
      "lab technician",
      "cashier",
      "hospital administrator",
      "patient",
      "triage nurse",
    ],
  },
  { icon: <SlCalender size={20} />, label: "Appointments", path: "/app/appointments", roles: ["admin", "doctor", "nurse", "receptionist", "pharmacist", "lab technician", "cashier", "hospital administrator", "patient", "triage nurse"] },
  { icon: <BsPrescription2 size={20} />, label: "Prescription", path: "/app/prescription", roles: ["admin", "doctor", "pharmacist", "hospital administrator"] },
  { icon: <VscReferences size={20} />, label: "Referrals", path: "/app/referrals", roles: ["admin", "doctor", "nurse", "receptionist", "hospital administrator"] },
  { icon: <MdOutlineLocalPharmacy size={20} />, label: "Pharmacy", path: "/app/pharmacy", roles: ["admin", "doctor", "nurse", "receptionist", "pharmacist", "hospital administrator"] },
  { icon: <FaHospitalSymbol size={20} />, label: "Laboratory", path: "/app/laboratory", roles: ["admin", "doctor", "nurse", "lab technician", "hospital administrator"] },
  { icon: <FaWpforms size={20} />, label: "MOHForms", path: "/app/mohforms", roles: ["admin", "doctor", "nurse", "lab technician", "hospital administrator"] },
  { icon: <TbReportSearch size={20} />, label: "Reports", path: "/app/reports", roles: ["admin", "doctor", "nurse", "lab technician", "hospital administrator"] },
  { icon: <FaPerson size={20} />, label: "Patient", path: "/app/patient", roles: ["admin", "doctor", "nurse", "lab technician", "hospital administrator"] },




  // {
  //   icon: <MdMedicalInformation size={20} />,
  //   label: "Medical Record",

  // },
  

  {
    icon: <MdBed size={20} />,
    label: "Bedrest Management",
    path: "/app/bedrest-management",
    roles: [
      "admin",
      "doctor",
      "nurse",
      "receptionist",
      "pharmacist",
      "lab technician",
      "cashier",
      "hospital administrator",
      "patient",
      "triage nurse",
    ],

  },
];

const collapsibleItems = [
  {
    key: "billing",
    icon: <RiMoneyDollarBoxLine size={20} />,
    label: "Billing",
    roles: ["admin", "cashier", "hospital administrator"],
    children: [
      { label: "Billing", path: "/app/billing" },
      // { label: "Patients Bills", path: "/app/patients-bills" },
      // { label: "Over the Counter", path: "/app/over-the-counter" },
      { label: "Receipts", path: "/app/receipts" },
      // { label: "Payments", path: "/app/payments" },
    ],
  },
  // {
  //   key: "clinical",
  //   icon: <LiaStethoscopeSolid size={20} />,
  //   label: "Clinical",
  //   roles: ["admin", "doctor", "nurse", "lab technician"],
  //   children: [{label:"Registry",path:"/app/registry"},{label:"Triage",path:"/app/triage"}],
  // },
];

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const { user } = useAuth();

  const toggleDropdown = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const sidebarWidth = !isCollapsed || isHovering ? "w-60" : "w-20";

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white flex flex-col text-sm z-50 transition-all duration-300 ${sidebarWidth}`}
    >
      {/* Toggle button */}
      <button
        className="text-white mb-3 p-5 bg-primary flex items-center justify-between cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {!isCollapsed || isHovering ? (
          <span className="text-white font-bold text-md">EHR System</span>
        ) : null}
        <FiMenu size={24} />
      </button>

      {/* Menu */}
      <ul
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex flex-col pl-2"
      >
        {staticMenuItems?.filter((item) => item?.roles?.includes(user?.role))
          .map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded-md transition-all duration-200 hover:text-blue-800 ${isActive ? "text-primary font-bold" : ""
                  }`
                }
              >
                {item.icon}
                {(!isCollapsed || isHovering) && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}

        {collapsibleItems
          .filter((item) => item.roles.includes(user?.role))
          .map(({ key, icon, label, children }) => (
            <li key={key}>
              <div
                onClick={() => toggleDropdown(key)}
                className="flex justify-between items-center p-2 cursor-pointer hover:text-blue-800"
              >
                <div className="flex items-center space-x-2">
                  {icon}
                  {(!isCollapsed || isHovering) && <span>{label}</span>}
                </div>
                {(!isCollapsed || isHovering) && (
                  <FaAngleRight
                    className={`transform transition-transform ${activeDropdown === key ? "rotate-90" : ""
                      }`}
                  />
                )}
              </div>
              <ul
                className={`pl-10 bg-gray-100 text-sm transition-all duration-300 ease-in-out ${activeDropdown === key && (!isCollapsed || isHovering)
                    ? "block"
                    : "hidden"
                  }`}
              >
                {children.map((child, i) => (
                  <li
                    key={i}
                    className="py-1 text-gray-600 hover:text-primary cursor-pointer"
                  >
                    <NavLink to={`${child.path}`}>{child.label}</NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
