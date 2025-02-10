
import "../styles/globals.css"
import Navbar from "@/components/navBar/Navbar";
import Footer from "@/components/common/footer/Footer"
import OpenPage from "@/components/openpage/OpenPage";


export default function Home() {
  return (
    <div>
      <Navbar/>
    <OpenPage/>
      <Footer/>
 
    </div>
  );
}
