
import React from "react";
import ReactDOM from "react-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import 'antd/dist/antd.css';
// pages
import Index from "views/Index.js";

// others

ReactDOM.render(

  <Index/>,
  document.getElementById("root")
);
