import React, { useState, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Button, Paper } from '@mui/material';
import { FaSearch } from "react-icons/fa";
import { styled } from '@mui/material/styles';
import Navbar from '../Navbar/Navbar';
import "../ip/ipdetail.css";
import TableHead from '@mui/material/TableHead';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
const IpDetail = ({ theme, setTheme }) => {
    const [ipAddress, setIPAddresses] = useState('');
    const [ipAddressDetails, setIPAddressDetails] = useState([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(false);

    const agentRef = useRef(null);

    const getIpAddressDetail = async (ip) => {
        try {
            setloading(true);
            const response = await fetch(`http://infosectool.com:4000/api/check/${ip}`);
            if (!response.ok) throw new Error(`Failed to fetch details for IP: ${ip}`);
            const result = await response.json();

            console.log(`Response for ${ip}:`, result); // Log to inspect API response
            setloading(false);
            return result;
        } catch (err) {
            console.error(`Error fetching details for ${ip}:`, err.message);
            return { error: err.message };
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
    
        const trimmedIP = ipAddress.trim(); // Trim whitespace
    
        // Check if multiple IPs are entered by looking for commas
        if (trimmedIP.includes(',')) {
            setError('Only a single IP address is allowed.');
            return;
        }
    
        // Regular expression to validate IPv4 format
        const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
        // Validate input and display error if invalid
        if (!ipPattern.test(trimmedIP)) {
            setError('Please enter a valid IP address.');
            return;
        }
    
        setIPAddressDetails([]); // Clear previous results
        setloading(true); // Show loading indicator
        try {
            const details = await getIpAddressDetail(trimmedIP); // Fetch details for the single IP
            setIPAddressDetails([details]); // Store result in an array for consistency
            setError(''); // Clear any previous errors
        } catch (err) {
            setError('Error fetching IP details. Please try again.'); // Handle API error
        } finally {
            setloading(false); // Hide loading indicator
        }
    };
    
    const columns = [
        { id: "ipAddress", name: "IP" },
        { id: "countryCode", name: "Country" },
        { id: "isp", name: "ISP" },
        { id: "abuseConfidenceScore", name: "Score" },
        { id: "threatIntel", name: "Threat Intel" },
        { id: "additional", name: "Additional Data" },

    ];
    const [anchor, setAnchor] = React.useState(null);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    return (
        <>
            <Navbar />
            <div className='Search'>
            <div className='search-bar-container'>
                <form onSubmit={handleSubmit}>
                    <div className='input-wrapper'>
                        <input
                            type="text"
                            placeholder='Enter a single IP address'
                            value={ipAddress}
                            onChange={(e) => {
                                setIPAddresses(e.target.value);
                                setError(''); // Clear error on new input
                            }}
                        />
                        <Button className="Searchbutton" type="submit">
                            <FaSearch id="search-icon" />
                        </Button>
                    </div>
                    {error && <p style={{ color: 'red',paddingTop: '20px',textAlign:'center',fontSize: '15px' }}>{error}</p>}
                </form>
            </div>
        </div>
            <Paper sx={{ width: "90%", marginLeft: "5%", marginTop: "60px" }}>
                <TableContainer >
                    <Table sx={{ minWidth: 700 }} >
                        <TableHead>
                            <TableRow style={{ backgroundColor: "rgba(154, 101, 198, 1)", color: "white" }} >
                                {columns.map((column) => (
                                    <TableCell style={{ backgroundColor: "rgba(154, 101, 198, 1)", color: "white" }} key={column.id}
                                        align='center'>{column.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {!loading && ipAddressDetails && ipAddressDetails.map((detail, index) => (
                                <>
                                    {/* AbuseIPDB Data Row */}
                                    <TableRow key={`abuse-${index}`}>
                                        <TableCell align="center">{detail.abuseIPDB?.data?.ipAddress || 'N/A'}</TableCell>
                                        <TableCell align="center">{detail.abuseIPDB?.data?.countryName || 'N/A'}</TableCell>
                                        <TableCell align="center">{detail.abuseIPDB?.data?.isp || 'N/A'}</TableCell>
                                        <TableCell align="center">{detail.abuseIPDB?.data?.abuseConfidenceScore || '0'}</TableCell>
                                        <TableCell align="center">AbuseIPDB</TableCell>
                                        <TableCell component="th" scope="row" align="center">

                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    localStorage.setItem('ipDetails', JSON.stringify(detail.abuseIPDB.data, null, 2));
                                                    window.open('/ipdetails', '_blank'); // Open in a new tab
                                                }}
                                            >
                                                More Info
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                    {/* VirusTotal Data Row */}
                                    <TableRow key={`virusTotal-${index}`}>
                                        <TableCell align="center">{detail?.virusTotal?.data?.id || 'N/A'}</TableCell>
                                        <TableCell align="center">{detail?.virusTotal?.data?.attributes?.country || 'N/A'}</TableCell>
                                        <TableCell align="center">{detail?.virusTotal?.data?.attributes?.as_owner || 'N/A'}</TableCell>
                                        <TableCell align="center">{(detail?.virusTotal?.data?.attributes?.last_analysis_stats.malicious)} / {(detail?.virusTotal?.data?.attributes?.last_analysis_stats.malicious + detail?.virusTotal?.data?.attributes.last_analysis_stats.undetected + detail?.virusTotal?.data?.attributes?.last_analysis_stats.harmless)}
                                        </TableCell>
                                        <TableCell align="center">VirusTotal</TableCell>
                                        <TableCell component="th" scope="row" align="center">

                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    localStorage.setItem('ipDetails', JSON.stringify(detail.virusTotal.data, null, 2));
                                                    window.open('/ipdetails', '_blank'); // Open in a new tab
                                                }}>
                                                More Info
                                            </Button>
                                        </TableCell>


                                    </TableRow>
                                    {/* MetaDefender Data Row */}
                                    <TableRow key={`metaDefender-${index}`}>
                                        <TableCell align="center">{detail?.metaDefender?.address || 'N/A'}</TableCell>
                                        <TableCell align="center">{detail?.metaDefender?.geo_info?.country?.name || 'N/A'} {detail?.metaDefender?.geo_info?.city?.name || 'N/A'}</TableCell>
                                        <TableCell align="center">{detail?.metaDefender?.as_owner || 'N/A'}</TableCell>
                                        <TableCell align="center">{detail?.metaDefender?.lookup_results?.detected_by} / 22
                                        </TableCell>
                                        <TableCell align="center">MetaDefender</TableCell>
                                        <TableCell component="th" scope="row" align="center">

                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    localStorage.setItem('ipDetails', JSON.stringify(detail.metaDefender, null, 2));
                                                    window.open('/ipdetails', '_blank'); // Open in a new tab
                                                }}>
                                                More Info
                                            </Button>
                                        </TableCell>


                                    </TableRow>
                                </>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
            </Paper>
        </>
    );
};
const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const PopupBody = styled('div')(
    ({ theme }) => `
                        width: max-content;
                        padding: 12px 16px;
                        margin: 8px;
                        border-radius: 8px;
                        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
                        background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
                        box-shadow: ${theme.palette.mode === 'dark'
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`
        };
                        font-family: 'IBM Plex Sans', sans-serif;
                        font-size: 0.875rem;
                        z-index: 1;
                        `,
);

//   const Button = styled('button')(
//     ({theme}) => `
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-weight: 600;
//     font-size: 0.875rem;
//     line-height: 1.5;
//     background-color: ${blue[500]};
//     padding: 8px 16px;
//     border-radius: 8px;
//     color: white;
//     transition: all 150ms ease;
//     cursor: pointer;
//     border: 1px solid ${blue[500]};
//     box-shadow: 0 2px 1px ${
//       theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
//     }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

//     &:hover {
//       background-color: ${blue[600]};
//     }

//     &:active {
//       background-color: ${blue[700]};
//       box-shadow: none;
//     }

//     &:focus-visible {
//       box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
//       outline: none;
//     }

//     &.disabled {
//       opacity: 0.4;
//       cursor: not-allowed;
//       box-shadow: none;
//       &:hover {
//         background-color: ${blue[500]};
//       }
//     }
//   `,
//   );
export default IpDetail;
