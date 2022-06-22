import MainContent from "../src/sections/MainContent";
import { NavBar } from "../src/sections";
import { useRouter } from "next/router";




export default function PersistentDrawerLeft() {
  const router = useRouter();
  const { dependency } = router.query;
  return (
    <>
    <NavBar>
      <MainContent dependency={dependency}/>
    </NavBar>
    </>
  );
}
