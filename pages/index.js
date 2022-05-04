import MainContent from "../src/sections/MainContent";
import { NavBar } from "../src/sections";
import { Footer } from "../src/components";




export default function PersistentDrawerLeft() {
  return (
    <>
    <NavBar>
      <MainContent/>
    <Footer/>
    </NavBar>
    </>
  );
}
