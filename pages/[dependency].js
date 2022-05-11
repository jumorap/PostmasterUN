import MainContent from "../src/sections/MainContent";
import { NavBar } from "../src/sections";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

export default function PersistentDrawerLeft() {
  const router = useRouter();
  const { dependency } = router.query;
  return (
    <NavBar>
      <Typography
        sx={{ fontSize: "3rem", fontWeight: 500, marginBottom: "3.5rem" }}
        variant="h2"
      >
        {dependency}
      </Typography>
      <MainContent />
    </NavBar>
  );
}
