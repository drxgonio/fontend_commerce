//login
import React ,{ useContext } from 'react';
import { useState } from 'react';
import DemoFooter from "../../components/Footers/DemoFooter.js";
import IndexHeader from "../../components/Headers/IndexHeader.js";
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import KeyWord from "../body/KeyWord";
// index sections
import Narbar from "../body/Narbar";
import ProductOfme from "../body/ProductOfme";
import ProductUserWatch from "../body/ProductUserWatch";
import Context from '../../Context/Context.js'
import { ACCESS_TOKEN } from 'API/URLMapping.js';

function IndexPage(onLogout){

    const authen = useContext(Context);
    const [a, setA] = useState("1");

    return(
  
        <>
  
       
     <IndexNavbar authenticated={authen.authenticated} onLogout={onLogout} />
       {/* <IndexNavbar/> */}
        <IndexHeader />
      <div className="main">
        <Narbar></Narbar>
        <ProductUserWatch></ProductUserWatch>
        <KeyWord></KeyWord>
        <ProductOfme></ProductOfme>
        <DemoFooter />   

      </div>
      </>
      
    );
}
export default IndexPage;