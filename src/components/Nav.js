import React from 'react'
import {Link} from "react-router-dom"

const Nav = () => {
  return (
    <div>
      <nav data-testid="navbar" className='navbar navbar-expand-lg navbar-light bg-custom'>
        <span className='navbar-brand'>Bouquet of Love</span>
        <div className='nav navbar-nav' style={{float:"right",width:"96%"}}>
          <Link className="btn btn-outline-light me-2" data-testid="bookBouquet-link" to="/">
            Book Bouquet
          </Link>

          <Link className="btn btn-outline-light me-2" data-testid="viewBookings-link" to="/viewBookings">
            View Bookings
          </Link>

          <Link className="btn btn-outline-light me-2" data-testid="allBookings-link" to="/allBookings">
            View All Bookings
          </Link>

        </div>
      </nav>
      
    </div>
  )
}

export default Nav
