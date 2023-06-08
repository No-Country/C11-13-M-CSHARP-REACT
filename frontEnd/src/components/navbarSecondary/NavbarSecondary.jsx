import { Box, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import logo from "../../assets/images/logo.png";

const NavbarSecondary = () => {
  const navigate = useNavigate();

  return (
    <Box component="header">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={4}
        sx={{ height: "68px", padding: { lg: "16px 96px", sm: "16px 32px", xs: "16px" }, backgroundColor: "primary.main", color: "white" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { lg: "8px", sm: "6px", xs: "4px" }
          }}
        >
          <LocalPhoneOutlinedIcon />
          <Typography>+52 11 1010-2020</Typography>
        </Box>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem color={"white"} />}
          spacing={2}
        >
           {/*<Typography sx={{ fontWeight: "bold" }}>ES</Typography>
            <Typography>EN</Typography>*/}
        </Stack>
      </Stack>
      <Box sx={{ backgroundColor: "custom.sienna", display: "flex", justifyContent: "center", height: { lg: "133px", sm: "112px", xs: "96px" }, padding: { lg: "16px 0", sm: "16px 0", xs: "16px 0" } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { lg: "200px", sm: "175px", xs: "110px" },
            height: "auto"
          }}
        >
          <img src={logo} alt="Logo Sabores De La Tierra" style={{ width: "100%", cursor: "pointer" }} onClick={() => navigate("/")} />
        </Box>
      </Box>
    </Box>
  )
}

export default NavbarSecondary