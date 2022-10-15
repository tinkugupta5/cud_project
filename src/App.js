import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingComponents from "./components/CreateBooking";
import ViewBooking from "./components/ViewBooking";
import AllBooking from "./components/AllBooking";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav/>
        <Routes>
          <Route path="/" element={<BookingComponents/>} />
          <Route path="/allBookings" element={<AllBooking/>} />
          <Route path="/viewBooking" element={<ViewBooking/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
