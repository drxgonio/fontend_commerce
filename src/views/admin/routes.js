import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";

import DashboardPage from "./components/Dashboard/Dashboard.js";
import UserProfile from "../admin/components/UserProfile/UserProfile";
import Product_QL from "./components/Product_QL/Product_QL.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "#",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "#",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Quản lý Danh Mục",
    rtlName: "#",
    icon: "content_paste",
    component: Product_QL,
    layout: "/admin"
  },
  {
    path: "/product",
    name: "Quản lý Sản Phẩm",
    rtlName: "#",
    icon: LibraryBooks,
    component: Product_QL,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Quản lý đơn hàng",
    rtlName: "#",
    icon: BubbleChart,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "",
    icon: LocationOn,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "#",
    icon: Notifications,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/rtl-page",
    name: "Đăng xuất",
    rtlName: "#",
    icon: Language,
    component: DashboardPage,
    layout: "/rtl"
  }
];

export default dashboardRoutes;
