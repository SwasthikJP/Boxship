import {React,useState,useRef} from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {Redirect} from 'react-router-dom'

import axios from 'axios'

export default function Shippingform(){

const [name,setname]=useState("");
const [weight,setweight]=useState(0);
const [country,setcountry]=useState('Australia');
const [color,setcolor]=useState('#3F7BD3');
const [nextpage,setnextpage]=useState(false);

const formdata=useRef();


const submitfun=async(e)=>{
    e.preventDefault();
    console.log(name)
   if(name==='' || weight==='' || color==='' || country===''){
       console.log("ran")
    toast.error('Please fill all fields', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

        return;
   }else if(weight<0){
    toast.error('Please enter valid weight', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
   
    e.target['weight'].value=0;
    setweight(0)
        return;
   }

   var countries={
    Sweden: 11.42,
    China: 8.71,
    Brazil: 7.43,
    Australia: 1.83,
   }

   var cost=(weight*countries[country]+2).toFixed(2);
  
  
   var data={
       name,
       weight,
       country,
       color,
       cost
   }
  
    
  await axios.post('http://localhost:5000/create-order',data)
  .then((res)=>{
    toast.success("Order placed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setnextpage(true)
  })  .catch((err) => {
    toast.error("Error while creating order", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  });

}

const aboutfun=()=>{

            toast.info('Fill the above fields to ship your box to your country of choice', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
}

return   nextpage? <Redirect push to='/orders'></Redirect>: <div className='wholediv'>
   <h2>Enter the details</h2>
   <div className=' formdiv '>
       <form noValidate  className='need_validation' onSubmit={submitfun} >
           <label htmlFor="receivername">Enter receiver name</label> <br/>
           <input type="text" name="recievername" id="receivername" required  onChange={(e)=>{setname(e.target.value)}}/> <br/>
           <label htmlFor="receivername">Enter weight </label> <br/>
           <input type="number" name="weight" id="weight" min='0' defaultValue={weight} onChange={(e)=>{setweight(e.target.value)}} ref={formdata}/> <br/>
           <label htmlFor="country">Select country</label> <br/>
          <select name="country" id="country" onChange={(e)=>{setcountry(e.target.value)}}> 
              <option value="Australia">Australia</option>
              <option value="Brazil">Brazil</option>
              <option value="China">China</option>
              <option value="Sweden">Sweden</option>
          </select> <br/>
          <label htmlFor="colorinput">Select box color</label> <br/>
          <input type="color" name='colorinput' id='colorinput' defaultValue={color} onChange={(e)=>{setcolor(e.target.value)}}/> <br/>
          
          <input type="submit" id='submit'/>
       </form>

       <button className='about' onClick={aboutfun}>About</button>
       <ToastContainer />
   </div>
  
</div>

}