import {React,useState,useEffect} from 'react'
import axios from 'axios'

export default function Table(){

const [orders,setorders]=useState([]);


useEffect(()=>{
   async function name(){
 await axios.get('http://localhost:5000/orders').then((res)=>{
      console.log(res.data)
   setorders(res.data)
  }).catch( (err)=>{
      console.log(err)
  }
)
   }
   name();
},[]);

    return <div className=' seconddiv'>
        
         <table >
             <tbody>
       <tr>
          
           <th>Name</th>
           <th>Weight(kg)</th>
           <th>Country</th>
           <th>Box color</th>
           <th>Cost($)</th>
       </tr>

      
        {orders.map((ele)=>{
      return   <tr key={ele._id}>
         <td>{ele.name}</td>
         <td>{ele.weight}</td>
         <td>{ele.country}</td>
         <td><input type="color" defaultValue={ele.color} id='color' disabled/></td>
         <td>{ele.cost}</td>
     </tr>
        })}
        
        </tbody>
        
    </table>
   
    </div>
}