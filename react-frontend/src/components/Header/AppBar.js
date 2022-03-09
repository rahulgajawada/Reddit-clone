import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Login from './Login'
import {Grid} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const ResponsiveAppBar = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <AppBar position="static" style={{ backgroundColor: "white", color: "black"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box
            component="img"
            sx={{
            height: 55,
            }}
            alt="Your logo."
            src={"https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo.png"}
        />        
        <Grid container justifyContent="flex-end">
          <Login/>
        </Grid>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;