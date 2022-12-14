import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";
import Catagories from "./pages/Catagories";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
function App() {
  return (
    <>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-zinc-100">  
        <main className="flex-auto mx-5 my-7 mb-24">
          <Routes>
            <Route path="/" element={<Explore />}/>
            <Route path="/offers" element={<Offers />} />
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />}/>
            </Route>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/createListing" element={<CreateListing />}/>
            <Route path="/forgotPassword" element={<ForgotPassword />}/>
            <Route path="catagories/:catagoryName" element={<Catagories />}/>
            <Route path="catagories/:catagoryName/:listingId" element={<ListingDetails />}/>
          </Routes>
        </main>
        <div className="fixed w-full z-20 bottom-0">
          <Navbar />
        </div>
      </div>
    </BrowserRouter>
    <ToastContainer />
    </>
  );
}

export default App;
