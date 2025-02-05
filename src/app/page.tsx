import LandingPage from "@/components/common/landingPage/LandingPage";
import "../styles/globals.css"
import Navbar from "@/components/navBar/Navbar";

import Footer from "@/components/common/footer/Footer"

export default function Home() {
  return (
    <div>
      <Navbar/>
      <LandingPage/>
      <Footer/>
 
    </div>
  );
}
