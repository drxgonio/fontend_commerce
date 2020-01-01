import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";

import DashboardPage from "./components/Dashboard/Dashboard.js";
import Product_QL from "./components/Product_QL/Product_QL.js";
import Category_QL from "./components/Category_QL/Category_QL.js";
import User_QL from "./components/User_QL/User_QL.js";

import Order_QL from "./components/Order_QL/Order_QL.js";
import Map_Google from "./components/Map/Map_Google.js";


const RouterSimple = [
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
    name: "Quản lý người dùng",
    rtlName: "#",
    icon: Person,
    component: User_QL,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Quản lý Danh Mục",
    rtlName: "#",
    icon: "content_paste",
    component: Category_QL,
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
    path: "/order",
    name: "Quản lý đơn hàng",
    rtlName: "#",
    icon: BubbleChart,
    component: Order_QL,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "",
    icon: LocationOn,
    component: Map_Google,
    layout: "/admin"
  }
  // ,
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "#",
  //   icon: Notifications,
  //   component: DashboardPage,
  //   layout: "/admin"
  // }
];

export default RouterSimple;
