import React, {  useEffect, useState } from 'react';
import {storage} from 'ConfigFirebase/ConfigFirebase';
import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar";
import useForm from '../../Aform/useForm.js';
import { withRouter } from "react-router-dom"

import {  API_BASE_URL } from 'API/URLMapping';
import { message } from 'antd';
import Axios from "axios";

function ImageUpload(props) {
  //get user

  const[image,setImage]=useState(null);
  const[url,setUrl]=useState('');
  const[progress,setProgress]=useState(0);


  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };

  });
  function handleChange(e) {

    setImage(e.target.files[0]);

  };
  function handleUpload (){
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          //  console.log(url);
            props.ChangeURL(url)
            setUrl(url);
        })
    });
  }

 



  return (
 
          <div>
                    <input type="file" onChange={handleChange}/>
                    <button onClick={handleUpload} className="btn btn-primary">Upload</button>
                    <img src={url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="50" width="50"/>                
                    </div>
  );
}
export default withRouter(ImageUpload);