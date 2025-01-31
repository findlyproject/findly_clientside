import LandingPage from "@/components/landingPage/LandingPage";
import "../styles/globals.css"
import Navbar from "@/components/navBar/Navbar";

import Footer from "@/components/footer/Footer"
import Faqs from "@/components/navBar/helpAndSupport/Faqs";
export default function Home() {
  return (
    <div>
      <Navbar/>
      <LandingPage/>
      <Footer/>
      <Faqs/>
    </div>
  );
}
