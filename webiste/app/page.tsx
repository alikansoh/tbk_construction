import Image from "next/image";
import Hero from "./Components/Hero";
import OurServices from "./Components/OurSrvices";
import AboutUs from "./Components/AboutUs";
import Projects from "./Components/Projects";
import Location from "./Components/CoveredLocation";
export default function Home() {
  return (
    <div className="font-sans">
      <Hero />
      <OurServices />  
      <AboutUs/> 
      <Projects/>
      <Location />
      
      
    </div>
  );
}
