import Image from "next/image";
import Map from "../components/map/Map";
import { MapProvider } from "@/providers/MapProvider";
import SidebarInfo from "@/components/sidebarinfo/SidebarInfo";
import Slider from "@/components/slider/Slider";
import Legend from "@/components/legend/Legend";
import SearchAddressControl from "@/components/map/components/searchAdress/SearchAddressControl";
import LocationBox from "@/components/map/components/locationBox/LocationBox";
import Logo from "@/components/map/components/logo/Logo";
import Title from "@/components/map/components/title/Title";
import CenterButton from "@/components/map/components/centerButton/centerButton";

export default function Home() {


  return (
    <div className='main-container'>
      <MapProvider>
        <Map></Map>
        <SidebarInfo/>
        <Slider/>
        <Title/>
        <Logo></Logo>
        
        <SearchAddressControl></SearchAddressControl>
        <LocationBox></LocationBox>
        <CenterButton/>
        <Legend/>
        
      </MapProvider>
    </div>
  );
}
