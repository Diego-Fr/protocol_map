import Image from "next/image";
import Map from "../components/map/Map";
import { MapProvider } from "@/providers/MapProvider";
import SidebarInfo from "@/components/sidebarinfo/SidebarInfo";
import Slider from "@/components/slider/Slider";
import LocationButton from "@/components/map/components/locationButton/LocationButton";
import Legend from "@/components/legend/Legend";


export default function Home() {

  return (
    <div className='main-container'>
      <MapProvider>
        <Map></Map>
        <SidebarInfo/>
        <Slider/>
        <LocationButton/>
        <Legend/>
      </MapProvider>
    </div>
  );
}
