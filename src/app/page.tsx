
import "../styles/globals.css"
import Navbar from "@/components/navBar/Navbar";
import Footer from "@/components/common/footer/Footer"
import LandingPage from "@/components/common/landingPage/LandingPage";



export default function Home() {
  return (
    <div>
      <Navbar/>
    
    <LandingPage/>
    
      <Footer/>
 
    </div>
  );
}
