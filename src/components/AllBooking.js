import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const AllBooking = () => {

  const [bookings,setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get("http://localhost:4000/bookings")
    .then((res)=>{
      console.log(res)
      setBookings(res.data);
    })

    .catch((e)=> console.log("something went wrong"));
  }, [])


  const handleAction = (id) => {

    axios
    .delete("http://localhost:4000/bookings/" + id)
    .then(()=> {
      alert("The CV With Id Number : " + id + "is deleted");
      navigate(0);
    })

    .catch ((err) => {
      alert("Something went wrong");

    })

  }
  

  
  return (
    <div style={{marginTop:"50px",marginLeft:"30px",display:"flex" ,flexWrap: "wrap"}}>
      {bookings.map((bouquet)=>{
        return(            
              <div key={bouquet.id} className='card mb-4 box-shadow' style={{padding:"20px",borderRadius:"25px"}}>
          <div className="card-header">
            <h4 style={{textAlign:"center"}} className="my-0 font-weight-normal">{bouquet.id}</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">{bouquet.id} <small className="text-muted">ID No.</small></h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>Bouquet Name : {bouquet.bouquetName}</li>
              <li>No of Bouquet : {bouquet.flowerCount}</li>
              <li>Booking Date : {bouquet.bookedOn}</li>
              <li>Booking email id : {bouquet.emailId}</li>
            </ul>
            <button className='btn btn-lg btn-block btn-primary text-center' onClick={()=>{
              handleAction(bouquet.id)
             }}>Delete CV</button>
          </div>           
             </div>            
        );       
      })}      
    </div>
  );
};

export default AllBooking
