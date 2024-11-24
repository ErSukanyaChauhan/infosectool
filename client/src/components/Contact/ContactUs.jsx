import React from 'react';
import Navbar from '../Navbar/Navbar';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import { styled } from "@mui/material/styles";
import { Link } from 'react-router-dom';
const ContactUs = () => {
    const [value, setValue] = React.useState(0);

    const BottomNavigation = styled(MuiBottomNavigation)(`
        color: green;
        background-color: #9033bc;
        height: 136px;
      `);
    const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
        color: green;
        background-color: #9033bc;
        &.Mui-selected {
          color: white;
       }
        
      `);
    return (
        <>
            <Navbar />
            <Box sx={{ height: "100%" }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction
                        label="Contact Us"
                        sx={{
                            "& .MuiBottomNavigationAction-label": {
                                fontSize: "27px !important",
                                fontWeight: 600,
                            },
                        }}
                    />
                </BottomNavigation>
            </Box>
            <div className='search-bar-container'>
                <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify", margin: "20px 0" }}>
                    If you have questions or concerns about this Privacy Policy, feel free to contact us:
                    Email: <span style={{ fontWeight: "600", color: "#9033bc" }}>support@infosectool.com</span> Website: <span style={{ fontWeight: "600", color: "#9033bc" }}>www.infosectool.com</span> By using <Link to="https://infosectool.com/"style={{ textDecoration: "none"}}>InfosecTool.com</Link>, you acknowledge and agree to this Privacy Policy. </p>


            </div>

        </>

    )
}

export default ContactUs