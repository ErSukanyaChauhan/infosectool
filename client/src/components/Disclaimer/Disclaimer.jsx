import React from 'react';
import Navbar from '../Navbar/Navbar';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import { styled } from "@mui/material/styles";
const Desclaimer = () => {
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
                        label="Desclaimer"
                        sx={{
                            "& .MuiBottomNavigationAction-label": {
                                fontSize: "32px !important",
                                fontWeight: 600,
                            },
                        }}
                    />
                </BottomNavigation>
            </Box>

            <div className='search-bar-container'>
                <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify", margin: "20px 0" }}>

                    Infosectool.com is a personal project designed to assist cybersecurity analysts with tools and resources
                    for threat intelligence and threat hunting. This platform aggregates data from various third-party threat
                    intelligence APIs and does not host or generate original threat data. While we strive to ensure the accuracy
                    and reliability of information presented, Infosectool.com cannot guarantee the completeness, accuracy, or
                    suitability of third-party data for any specific purpose.

                    Infosectool.com is not liable for any damages or losses resulting from the use of information, links, or resources on this site.
                    Users are encouraged to independently verify any data and exercise caution before making security-related decisions based on the
                    information provided.

                    Infosectool.com does not endorse any third-party products or services linked on the site. All content and functionality are
                    provided “as-is” without warranties, express or implied. Contributions and feedback are welcome to improve the platform for the
                    cybersecurity community.


                </p>
            </div >





        </>
    );
};

export default Desclaimer;
