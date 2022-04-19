import Add from "@mui/icons-material/AddBox";
import Exit from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { destroyCookie, setCookie } from "nookies";
import * as React from "react";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface IPropsNav {
  title: string;
  isAdm: boolean | undefined;
}

const salesTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#F9A826",
    },
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function NavBar({ title, isAdm }: IPropsNav) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleLogout() {
    setCookie(null, "token", "");
    window.location.href = "/";
  }

  return (
    <ThemeProvider theme={salesTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
          onClick={handleDrawerClose}
        >
          <List style={{ marginTop: "12px" }}>
            {isAdm ? (
              <>
                <ListItem button>
                  <ListItemText primary="Adicionar produto" />
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                </ListItem>

                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                  <ListItemIcon>
                    <Exit />
                  </ListItemIcon>
                </ListItem>
              </>
            ) : (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
                <ListItemIcon>
                  <Exit />
                </ListItemIcon>
              </ListItem>
            )}
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
