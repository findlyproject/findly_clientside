import LandingPage from "@/components/landingPage/LandingPage";
import "../styles/globals.css"
import Navbar from "@/components/navBar/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <LandingPage/>
    </div>
  );
}
