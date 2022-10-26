import React from 'react'
import { useState } from 'react'
import axios from "axios"

let url = "http://localhost:4000/bookings/";


const ViewBooking = () => {




  // state define 

  const [state,setState] = useState({
    bookingId:"",
    bookingData:null,
    infoMessage:"",
  })


  const [messages] = useState({
    INFO:"The booking has been deleted Please refresh the page ",
    ERRINFO:"Something Went Wrong",
  });

  const handleChange = (event) => {


    const {name,value} = event.target;
    setState({
      ...state,
      [name]:value,
    })

  }


  const handleAction = (action) => {

    if(action==="onDelete"){

      axios.delete(url + state.bookingId)
      .then((res) => {
        console.log(res);
        setState({...state,infoMessage:messages.INFO})
        // window.location.reload(true)
      })


      .catch((err)=>{
        setState({
          ...state,infoMessage:"Reservation for booking id" + state.bookingId + "is not found",

        })
      })

    }

  }
 

const onsubmit = (event) => {
  event.preventDefault();
  axios 
  .get(url + state.bookingId)
  .then((res) => {
    setState({...state,
    bookingData:res.data,
  infoMessage:"",});
  })

  .catch((err)=>{

    setState({
      ...state,infoMessage:"Reservation for booking id:" +state.bookingId + "is not Found",
    });

  });
};




  return (
    <div className='row' >
      <div>
        <br/>
        <div className='card'>
          <div className='card-header bg-custom'>
            <h4>View Booking</h4>
          </div>

          <div className='card-body'>
            <form className='form' data-testid="viewBooking-form">
              <div className='form-group-view'>
                <label>Booking Id</label>
              </div>
              <input type="text" data-testid="bookingId" name="bookingId" className='form-control' value={state.bookingId} onChange={handleChange} placeholder='Enter a booking id'></input>
              <button type='submit' name="button" className='btn btn-primary mt-2' onClick={onsubmit}>Get Booking</button>

              {state.bookingData ? (<table className='table table-bordered'>
                <thead className='thead'>
                  <tr>
                  <th>Booking Id</th>
                  <th>Bouquot Name</th>
                  <th>Email Id</th>
                  <th>No of Bouquet</th>
                  <th>Booking Date</th>
                  <th>Action Items</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{state.bookingData.id}</td>
                    <td>{state.bookingData.bouquetName}</td>
                    <td>{state.bookingData.emailId}</td>
                    <td>{state.bookingData.flowerCount}</td>
                    <td>{state.bookingData.bookedOn}</td>
                    <td>
                      <button className='btn btn-danger  mt-2 ms-2' data-testid="delete-button" onClick={()=>{handleAction("onDelete");}}>Delete</button>
                      <button className='btn btn-success  mt-2 ms-2' data-testid="update-button" onClick={()=>{}}>Update</button>
                    </td>
                  </tr>
                </tbody>
              </table>):null}
              {state.infoMessage ? (<p data-testid className="text-info mt-2">{state.infoMessage}</p>):null}

            </form>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ViewBooking
