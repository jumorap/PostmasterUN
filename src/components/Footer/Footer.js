import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import FooterBody from "./FooterBody";

const drawerBleeding = 20;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.white,
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 250,
  height: drawerBleeding,
  backgroundColor: theme.palette.primary.lightRed,
  borderRadius: 8,
  position: "relative",
  left: "50%",
  transform: "translateX(-50%)",
}));

function Footer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      
      <Puller
        sx = {{
          bottom: 8,
          right: 0,
          position: "fixed",
          zIndex: 100,
        }} 
        onClick={toggleDrawer(true)}
      />

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingTop: "20px",
            paddingRight: "5px",
            paddingLeft: "5px",
            marginLeft: {sm: 0, md:"20%"},
            marginRight:{sm: 0, md:"20%"}},
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "relative",
            top: -drawerBleeding,
            overflow: "auto",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller/>
          <FooterBody/>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}


export default Footer;