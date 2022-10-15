import React,{useState} from 'react'
import axios from "axios"



const BookingComponents = () => {
    
    //state to hold the form details that needs to be added . when user enter the values the state gets updated 
    const [data,setData] = useState({
        bouquetName:"",
        bookedOn:"",
        emailId:"",
        flowerCount:"",
    });

    const [successMessage,setSuccessMessage] = useState("");
    // const [mandatory,setMandatory] = useState(false);
    const [errorMessages,setErrorMessage] = useState("");
    const [errorMessage,setErrorMessages] = useState({
        bouquetNameError:"",
        flowerCountError:"",
        emailIdError:"",
        bookedOnError:"",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if(Object.values(data).every((value) => value !=="")) {
            axios.post("http://localhost:4000/bookings",data)
            .then((res)=> {
                console.log("res",res)
                setSuccessMessage ("data submitted successfully for ID number" + res.data.id);               
            })
            .catch((err) =>{
                setErrorMessages("Enter all Fields");
            })
        }
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData({...data,[name]:value})
        console.log("value" , value);
    };

  return (
    <>
    <div className='CreateBooking'>
        <div className='row'>
            <div className='card' style={{width:"500px"}}>
                <div className='card-header bg-custom'>
                    <h4>Book Your Bouquet</h4>
                </div>
                <div className='card-body'>
                    <form className='form' data-testid="bouquet-form" noValidate onSubmit={handleSubmit}>
                        <div className="form-group" >
                            <label>Bouquet Name</label>
                            <select name="bouquetName" value={data.bouquetName} onChange={handleChange}  data-testid="bouquetName" className='form-control'>
                            <option value="" disabled>Select a bouquet</option>
                                <option value="RosalineRed" disabled>Select a bouquet</option>
                                <option value="TerifficTulip">Teriffic Tulip</option>
                                <option value="ChineseChandelier">Chinese Chandelier</option>
                            </select>

                            {errorMessage.bouquetNameError ?(<span className='text-danger'>{errorMessage.bouquetNameError}</span>):null}
                        </div>
                        <div className='form-group'>
                            <label>Email Id</label>
                            <input type="email" value={data.emailId} onChange={handleChange} data-testid="emailId" name="emailId" className="form-control" placeholder="Enter your Email"></input>
                            {errorMessage.emailIdError ?(<span className='text-danger'>{errorMessage.emailIdError}</span>):null}
                        </div>
                        <div className='form-group'>
                            <label>No of Bouquet</label>
                            <input type="number" value={data.flowerCount} onChange={handleChange}  data-testid="flowerCount" name="flowerCount" className="form-control" placeholder="Number of Bouquets"></input>
                            {errorMessage.flowerCountError ?(<span className='text-danger'>{errorMessage.flowerCountError}</span>):null}
                        </div>
                        <div className='form-group'>
                            <label>Booking  Date</label>
                            <input type="date" value={data.bookedOn} onChange={handleChange} data-testid="bookedOn" name="bookedOn" className="form-control"></input>
                            {errorMessage.bookedOnError ?(<span className='text-danger'>{errorMessage.bookedOnError}</span>):null}
                        </div>
                        {/* disabled={!mandatory} */}
                        <button data-testid="button"  type='submit' name="active" className='btn btn-primary'>Book Bouquet</button><br></br>
                        {successMessage?(<span className='text-success'>{successMessage}</span>):null}
                        {setErrorMessage?(<span className='text-danger'>{setErrorMessages}</span>):null}
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default BookingComponents
