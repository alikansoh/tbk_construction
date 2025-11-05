import Image from "next/image";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import OurServices from "./Components/OurSrvices";
import AboutUs from "./Components/AboutUs";
export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <OurServices />  
      <AboutUs/> 
      
      
    </div>
  );
}
