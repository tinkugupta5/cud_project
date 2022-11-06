import React,{useState,useEffect} from 'react'
import axios from "axios"
import {validation} from './../validators/validation';

import { useNavigate , useParams } from 'react-router-dom';



const UpdateBooking = () => {
    const navigate = useNavigate();
    console.log(navigate)
    const id = useParams()
  
    
    //state to hold the form details that needs to be added . when user enter the values the state gets updated 
    const [state,setState] = useState({
        bouquetName:"",
        bookedOn:"",
        emailId:"",
        flowerCount:""
    });

    const [formErrors,setFormErrors] = useState({
        emailIdError:"",
        flowerCountError:"",
        bouquetNameError:"",
        bookedOnError:"",
    })


    // const { bouquetName ,bookedOn,emailId,flowerCount } = state;

    const [mandatory,setMandatory] = useState(false);
    const [successMessage,setSuccessMessage] = useState("");
    const [errorMessages,setErrorMessage] = useState("");
    console.log(errorMessages);
    // const [errorMessage,setErrorMessages] = useState({
    //     bouquetNameError:"",
    //     flowerCountError:"",
    //     emailIdError:"",
    //     bookedOnError:"",
    // });

    const [messages] = useState({
        BOUQUET_NAME_ERROR:"Please select bouquet type",
        EMAILID_ERROR:"Please enter valid email",
        FLOWER_COUNT_ERROR:"Bouquet count(s) should be 1 or more",       
        BOOKED_ON_ERROR:"Booking date should be after today date",
        ERROR:"Something went wrong",
        MANDATORY:"Enter all the form fields"

    })


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setState({...state,[name]:value})
        console.log("value" , value);
        // validateField(name,value);
    };

    // step 2


      useEffect(() => {
        loadUsers();
      },[])

      const handleSubmit = async(event) => {
        event.preventDefault();
        // if(Object.values(state).every((value) => value !=="")) {
                    
             await axios.put(`http://localhost:4000/bookings/${id}`,state)
             
            .then((res)=> {
                console.log("res",res)
                setSuccessMessage ("data submitted successfully updated for ID number" + res.data.id);               
            })
            .catch((err) =>{
                setFormErrors(messages.ERROR);
            })       
    }
   
      const loadUsers =  () => {
        const result =  axios.get(`http://localhost:4000/bookings/${id}`);
        console.log(result);
        setState(result.data);
      }
      

  
      //   navigate(0);



    // setp 1 

 

    // const validateField = (name,value) => {
    //     let error = formErrors;
    //     switch(name) {
    //         case "bouquetName":
    //         if (!validation.validateBouquet(value)){
    //             error.bouquetNameError = messages.BOUQUET_NAME_ERROR;
    //         }
    //         else {
    //             console.log("Checked");
    //             error.bouquetNameError = "";
    //         }
    //         break;

    //         case "flowerCount":
    //             if(!validation.validFlowerCount(value)){
    //                 error.flowerCountError = messages.FLOWER_COUNT_ERROR;
    //             }
    //             else {
    //                 console.log("Checked");
    //                 error.flowerCountError = "";
    //             }
    //             break;

    //             case "emailId":
    //             if(validation.validateEmail(value)){
    //                 error.emailIdError = "";
    //             }

    //             // if(!validation.validateEmail(value)){
    //             //     error.emailIdError = messages.EMAILID_ERROR
    //             // }  for certification

                
    //             else {
    //                 console.log("Checked");
    //                 error.emailIdError = messages.EMAILID_ERROR;
    //             }
    //             break;


    //             case "bookedOn":
    //                 if(!validation.validDate(value)){
    //                     error.bookedOnError = messages.BOOKED_ON_ERROR;
    //                 }
    //                 else {
                        
    //                     error.bookedOnError="";
    //                 }
    //                 break;

    //                 case "":
    //                 if(!validation(value)){
    //                     error.bookedOnError = messages.BOOKED_ON_ERROR;
    //                 }
    //                 else {
                        
    //                     error.bookedOnError="";
    //                 }
    //                 break;

    //             default:
    //                 break;
    //     }

    //     setErrorMessage(error);
    //     if(Object.values(error).every((value) => value === "")) {
    //         setMandatory(true);
    //     }

    //     else
    //     {
    //         setMandatory(false);
    //     }

    // }

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
                            <select  value={state.bouquetName} onChange={handleChange}  data-testid="bouquetName" name="bouquetName" className='form-control'>
                            <option value=''>Select a bouquet</option>
                                <option value="RosalineRed" >Rosaline Red</option>
                                <option value="TerifficTulip">Teriffic Tulip</option>
                                <option value="ChineseChandelier">Chinese Chandelier</option>
                            </select>

                            {/* {formErrors.bouquetNameError ?(<span className='text-danger'>{formErrors.bouquetNameError}</span>):null} */}
                        </div>
                        <div className='form-group'>
                            <label>Email Id</label>
                            <input type="email" value={state.emailId} onChange={handleChange} data-testid="emailId" name="emailId" className="form-control" placeholder="Enter your Email"></input>
                            {/* {formErrors.emailIdError ?(<span className='text-danger'>{formErrors.emailIdError}</span>):null} */}
                        </div>
                        <div className='form-group'>
                            <label>No of Bouquet</label>
                            <input type="number" value={state.flowerCount} onChange={handleChange}  data-testid="flowerCount" name="flowerCount" className="form-control" placeholder="Number of Bouquets"></input>
                            {/* {formErrors.flowerCountError ?(<span className='text-danger'>{formErrors.flowerCountError}</span>):null} */}
                        </div>
                        <div className='form-group'>
                            <label>Booking  Date</label>
                            <input type="date" value={state.bookedOn} onChange={handleChange} data-testid="bookedOn" name="bookedOn" className="form-control"></input>
                            {/* {formErrors.bookedOnError ?(<span className='text-danger'>{formErrors.bookedOnError}</span>):null} */}
                        </div>
                        <br></br>
                        {/* disabled={!mandatory} */}
                        <button disabled={!mandatory}  data-testid="button"  type='submit' name="active" className='btn btn-primary'>Book Bouquet</button><br></br>
                        {/* {mandatory?(<span className='text-success'>{messages.MANDATORY}</span>):null} */}
                        
                        {successMessage?(<span className='text-success'>{successMessage}</span>):null}
                        { setErrorMessage?(<span className='text-danger'>{setFormErrors}</span>):null}
                    </form>                
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default UpdateBooking