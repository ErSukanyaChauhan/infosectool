import React from 'react';
import Navbar from '../Navbar/Navbar';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import { styled } from "@mui/material/styles";
import { Link } from 'react-router-dom';
const AboutPage = () => {
    const [value, setValue] = React.useState(0);

    const BottomNavigation = styled(MuiBottomNavigation)(`
        color: green;
        background-color: #9033bc;
        height: 116px;
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
                        label="About Us"
                        sx={{
                            "& .MuiBottomNavigationAction-label": {
                                fontSize: "32px !important",
                                fontWeight: 600,
                            },
                        }}
                    />
                </BottomNavigation>
            </Box>

            <div style={{  paddingTop: "10vh",width: "60%",margin: "auto",display: "flex",flexDirection: "column",alignItems: "center",minWidth: "200px" }}>
                <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify", margin: "20px 0" }}>
                    Infosectool is a dedicated project designed to support cybersecurity analysts in their
                    <strong>"threat hunting"</strong> efforts. This platform serves as a one-stop solution for
                    identifying and analyzing <span style={{ fontWeight: "600", color: "#9033bc" }}>Indicators of Compromise (IOCs)</span>
                    across multiple Threat Intelligence platforms.Our goal is to simplify and enhance the threat-hunting process,
                    empowering analysts to work more efficiently.
                    If you find this site useful, please consider sharing it on Twitter or contributing to its development by sharing your ideas and
                    suggestions. Together, we can make Infosectool a valuable resource for the cybersecurity community.

                </p>

                <div style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify", margin: "20px 0" }}>
                    <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>Privacy Policy</h2>
                    <p>
                        At <strong><Link to="https://infosectool.com/" style={{ textDecoration: "none" }}>InfosecTool.com</Link></strong>, we value your privacy and are committed to protecting it.
                        This Privacy Policy explains how we handle the data you interact with while using our platform.
                    </p>

                    <h3 style={{ fontWeight: "bold", marginTop: "20px" }}>No Personal Information Collected</h3>
                    <p>
                        <strong><Link to="https://infosectool.com/" style={{ textDecoration: "none" }}>InfosecTool.com</Link></strong> does not collect, store, or request any personal information from its users.
                        You are not required to create an account or provide any personal details to access our services.
                    </p>

                    <h3 style={{ fontWeight: "bold", marginTop: "20px" }}>IOC Data Handling</h3>

                    <p>The platform processes the Indicators of Compromise (IOCs) you submit for reputation checks.Submitted IOCs are processed in real-time through integrations with Threat Intelligence (TI) feeds.No submitted data is stored or retained by InfosecTool.com after processing.</p>


                    <h3 style={{ fontWeight: "bold", marginTop: "20px" }}>Cookies and Tracking</h3>

                    <p>We do not use cookies to track user behavior or store personal data.
                        Minimal tracking may occur to monitor platform performance and detect potential misuse,
                        but this data is anonymized and non-identifiable.
                    </p>


                    <h3 style={{ fontWeight: "bold", marginTop: "20px" }}>Security Measures</h3>
                    <p>
                        We employ strict security practices to protect the integrity of our platform. Your submitted
                        data is encrypted during processing to prevent unauthorized access.
                    </p>

                    <h3 style={{ fontWeight: "bold", marginTop: "20px" }}>Third-Party Services</h3>
                    <p>
                        Reputation data is sourced from external Threat Intelligence feeds through APIs. While we ensure
                        secure connections, we are not responsible for how third-party services handle data.
                    </p>

                    <h3 style={{ fontWeight: "bold", marginTop: "20px" }}>Changes to This Policy</h3>
                    <p>
                        <strong><Link to="https://infosectool.com/" style={{ textDecoration: "none" }}>InfosecTool.com</Link></strong> reserves the right to update this Privacy Policy as needed. Updates will be
                        posted on this page, and continued use of the platform signifies acceptance of the revised terms.
                    </p>
                </div>


                <div style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify", margin: "20px 0" }}>
                    <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>Desclaimer</h2>
                    <p>
                        <Link to="https://infosectool.com/" style={{ textDecoration: "none" }}>Infosectool.com </Link>is a personal project designed to assist cybersecurity analysts with tools and resources
                        for threat intelligence and threat hunting. This platform aggregates data from various third-party threat
                        intelligence APIs and does not host or generate original threat data. While we strive to ensure the accuracy
                        and reliability of information presented, Infosectool.com cannot guarantee the completeness, accuracy, or
                        suitability of third-party data for any specific purpose.

                        <Link to="https://infosectool.com/" style={{ textDecoration: "none" }}>Infosectool.com </Link> is not liable for any damages or losses resulting from the use of information, links, or resources on this site.
                        Users are encouraged to independently verify any data and exercise caution before making security-related decisions based on the
                        information provided.

                        <Link to="https://infosectool.com/" style={{ textDecoration: "none" }}>Infosectool.com </Link> does not endorse any third-party products or services linked on the site. All content and functionality are
                        provided “as-is” without warranties, express or implied. Contributions and feedback are welcome to improve the platform for the
                        cybersecurity community.
                    </p>


                </div>

            </div>




        </>
    );
};

export default AboutPage;
