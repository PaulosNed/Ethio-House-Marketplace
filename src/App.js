import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-zinc-100 ">  
        <main className="flex-auto">
          <Routes>
            <Route path="/" element={<Explore />}/>
            <Route path="/offers" element={<Offers />} />
            <Route path="/profile" element={<Signin />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/forgotPassword" element={<ForgotPassword />}/>
          </Routes>
        </main>
      <Navbar />
    </div>
    </BrowserRouter>
  );
}

export default App;
