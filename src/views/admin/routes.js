import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";

import DashboardPage from "./components/Dashboard/Dashboard.js";
import Product_QL from "./components/Product_QL/Product_QL.js";
import AddProduct from "./components/Product_QL/AddProduct.js";
import EditProduct from "./components/Product_QL/EditProduct.js";


import Category_QL from "./components/Category_QL/Category_QL.js";
import AddCategory from "./components/Category_QL/AddCategory.js";
import EditCategory from "./components/Category_QL/EditCategory.js";

import User_QL from "./components/User_QL/User_QL.js";
import AddUser from "./components/User_QL/AddUser.js";
import EditUser from "./components/User_QL/EditUser.js";

import Order_QL from "./components/Order_QL/Order_QL.js";
import Map_Google from "./components/Map/Map_Google.js";


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
    path: "/add-user",
    name: "Add_User",
    rtlName: "#",
    icon: "",
    component: AddUser,
    layout: "/admin"
  },
  {
    path: "/edit-user/:id",
    name: "Edit_User",
    rtlName: "#",
    icon: "",
    component: EditUser,
    layout: "/admin"
  },
  {
    path: "/add-category",
    name: "Add Category",
    rtlName: "#",
    icon: "",
    component: AddCategory,
    layout: "/admin"
  }
  ,
  {
    path: "/edit-category",
    name: "Edit Category",
    rtlName: "#",
    icon: "",
    component: EditCategory,
    layout: "/admin"
  },
  ,
  {
    path: "/add-product",
    name: "Add Product",
    rtlName: "#",
    icon: "",
    component: AddProduct,
    layout: "/admin"
  }
  ,
  {
    path: "/edit-product/:id",
    name: "Edit Product",
    rtlName: "#",
    icon: "",
    component: EditProduct,
    layout: "/admin"
  }
  
];

export default dashboardRoutes;
