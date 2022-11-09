import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: `calc(100% - ${56}px)`,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MainLayout(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [expanded, setExpanded] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="transparent" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <Stack direction="row" spacing={1}>
            <div>
              <Button
                id="basic-button"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClick}
                color='inherit'
              >
                Options
                <KeyboardArrowDownIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </Stack>
        </Toolbar>

        <Divider />
      </AppBar>

      <Drawer variant="permanent" open={open} style={{ zIndex: "0" }}>
        <DrawerHeader
          style={{
            display: "flex",
            justifyContent: "center",
            background: "rgba(0, 0, 0, .03)",
            
          }}
          className="headerrr"
        >
          <Typography variant="text" noWrap component="div" sx={{background:'white', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            Logo
          </Typography>
        </DrawerHeader>
        <div>
          <Divider />
          <Box
            sx={{
              width: "240px",
              height: "48px",
              background: "rgba(0, 0, 0, .03)",
              padding: "0 16px 0 10px",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                cursor: "pointer",
                background: "grey",
              },
            }}
          >
            <DashboardIcon sx={{ mr: 2, ml: 1 }} />
            <Typography>Dashboard</Typography>
          </Box>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={open ? handleChange("panel1") : null}
            sx={{
              "& .css-1l0yxov-MuiButtonBase-root-MuiAccordionSummary-root": {
                padding: "0 16px 0 0",
                width: "240px",
                "&:hover": {
                  background: "grey",
                },
              },
            }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <DashboardIcon sx={{ mr: 2, ml: 1 }} />

              <Typography>Users</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Lorem ipsum</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={open ? handleChange("panel2") : null}
            sx={{
              "& .css-1l0yxov-MuiButtonBase-root-MuiAccordionSummary-root": {
                padding: "0 16px 0 0",
                width: "240px",
                "&:hover": {
                  background: "grey",
                },
              },
            }}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <DashboardIcon sx={{ mr: 2, ml: 1 }} />

              <Typography>Users</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Lorem ipsum</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={open ? handleChange("panel3") : null}
            sx={{
              "& .css-1l0yxov-MuiButtonBase-root-MuiAccordionSummary-root": {
                padding: "0 16px 0 0",
                width: "240px",
                "&:hover": {
                  background: "grey",
                },
              },
            }}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <DashboardIcon sx={{ mr: 2, ml: 1 }} />

              <Typography>Users</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Lorem ipsum</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={open ? handleChange("panel4") : null}
            sx={{
              "& .css-1l0yxov-MuiButtonBase-root-MuiAccordionSummary-root": {
                padding: "0 16px 0 0",
                width: "240px",
                "&:hover": {
                  background: "grey",
                },
              },
            }}
          >
            <AccordionSummary
              aria-controls="panel4d-content"
              id="panel4d-header"
            >
              <DashboardIcon sx={{ mr: 2, ml: 1 }} />

              <Typography>Users</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Lorem ipsum</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={open ? handleChange("panel5") : null}
            sx={{
              "& .css-1l0yxov-MuiButtonBase-root-MuiAccordionSummary-root": {
                padding: "0 16px 0 0",
                width: "240px",
                "&:hover": {
                  background: "grey",
                },
              },
            }}
          >
            <AccordionSummary
              aria-controls="panel5d-content"
              id="panel5d-header"
            >
              <DashboardIcon sx={{ mr: 2, ml: 1 }} />

              <Typography>Users</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Lorem ipsum</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={open ? handleChange("panel6") : null}
            sx={{
              "& .css-1l0yxov-MuiButtonBase-root-MuiAccordionSummary-root": {
                padding: "0 16px 0 0",
                width: "240px",
                "&:hover": {
                  background: "grey",
                },
              },
            }}
          >
            <AccordionSummary
              aria-controls="panel6d-content"
              id="panel6d-header"
            >
              <DashboardIcon sx={{ mr: 2, ml: 1 }} />

              <Typography>Users</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Lorem ipsum</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel7"}
            onChange={open ? handleChange("panel7") : null}
            sx={{
              "& .css-1l0yxov-MuiButtonBase-root-MuiAccordionSummary-root": {
                padding: "0 16px 0 0",
                width: "240px",
                "&:hover": {
                  background: "grey",
                },
              },
            }}
          >
            <AccordionSummary
              aria-controls="panel7d-content"
              id="panel7d-header"
            >
              <DashboardIcon sx={{ mr: 2, ml: 1 }} />

              <Typography>Users</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Lorem ipsum</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <IconButton
          style={{
            position: "relative",
            left: "-2.4vw",
            top: "50vh",
            zIndex: "3",
            borderRadius: "50px",
            background: "#ddd",
          }}
        >
          {!open ? (
            <KeyboardDoubleArrowRightIcon
              fontSize="medium"
              onClick={handleDrawerOpen}
            />
          ) : (
            <KeyboardDoubleArrowLeftIcon
              fontSize="medium"
              onClick={handleDrawerClose}
            />
          )}
        </IconButton>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}
