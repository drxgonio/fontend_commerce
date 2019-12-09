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
import SectionNavbars from 'views/index-sections/SectionNavbars.js';
import SectionNavigation from 'views/index-sections/SectionNavigation.js';
import SectionProgress from 'views/index-sections/SectionProgress.js';
import SectionNotifications from 'views/index-sections/SectionNotifications.js';
import SectionTypography from 'views/index-sections/SectionTypography.js';
import SectionJavaScript from 'views/index-sections/SectionJavaScript.js';
import SectionCarousel from 'views/index-sections/SectionCarousel.js';
import SectionNucleoIcons from 'views/index-sections/SectionNucleoIcons.js';
import SectionDark from 'views/index-sections/SectionDark.js';
import SectionLogin from 'views/index-sections/SectionLogin.js';
import SectionExamples from 'views/index-sections/SectionExamples.js';
import SectionDownload from 'views/index-sections/SectionDownload.js';

function IndexPage(props){

    return(
  
        <>
  
       
     <IndexNavbar authenticated={props.authenticated} onLogout={props.onLogout} />
        <IndexHeader />
      <div className="main">
        <Narbar></Narbar>
        <ProductUserWatch></ProductUserWatch>
        <KeyWord></KeyWord>
        <ProductOfme></ProductOfme>
        <DemoFooter />   
      
        {/* <SectionNavbars />
        <SectionNavigation />
        <SectionProgress />
        <SectionNotifications /> */}
         
         <SectionTypography />
        {/* <SectionJavaScript />
        <SectionCarousel />
        <SectionNucleoIcons />
        <SectionDark />
        <SectionLogin />
       <SectionExamples />
        <SectionDownload />  */}

      </div>
      </>
      
    );
}
export default IndexPage;