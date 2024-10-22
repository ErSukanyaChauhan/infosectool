import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Grid, TextField } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Navbar from '../Navbar/Navbar';
import "../Hash/HashDetail.css";
import { FaSearch } from "react-icons/fa";
const drawerWidth = 240;
// const navItems = ['Home', 'About', 'Contact'];
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//         backgroundColor: theme.palette.common.black,
//         color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//         fontSize: 14,
//     },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     '&:last-child td, &:last-child th': {
//         border: 0,
//     },
// }));

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),

// ];

const HashDetail = (props, { theme, setTheme }) => {
    const [hash, setHashValue] = useState('');
    const [hashValueDetail, setHashValueDetail] = useState([]);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            {/* <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
        </Box>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    const paperStyle = { padding: 20, height: '30vh', width: 443, margin: "150px auto" }


    async function getHashValueDetail(hash) {
        try {
              const response = await fetch(`http://62.72.31.109:4000/api/hash/${hash}`);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = hash.split(',').map(value => value.trim());
        setHashValue(values);
        const details = await Promise.all(values.map(value => getHashValueDetail(value)));
        setHashValueDetail(details);
        console.log("details", details);
    };

    const columns = [
        { id: "id", name: "ID" },
        { id: "md5", name: "MD5" },
        { id: "sha1", name: "SHA1" },
        { id: "sha256", name: "SHA256" },
        { id: "reputaion", name: "REPUTATION" },
    ];
    const toggle_mode = () => {
        theme == 'light' ? setTheme('dark') : setTheme('light');
    }
    return (
        <>
            <Navbar />
            <div className='Search'>
                <div className='search-bar-container'>
                    <form onSubmit={handleSubmit} >
                        <div className='input-wrapper'>
                            <input placeholder='MD5,SHA1,SHA256' value={hash} onChange={(e) => setHashValue(e.target.value)} />
                            <Button className="Searchbutton" type="submit" ><FaSearch id="search-icon" /></Button>
                        </div>
                    </form>
                </div>
            </div >


            {/* For getting pdf */}
            {/* <div>
            <Button variant="contained" color="success" onClick={generatePDF}>PDF</Button>
        </div>
        <div ref={componentPDF} style={{ width: "100%" }}> */}
            <Paper sx={{ width: "90%", marginLeft: "5%", marginTop: "60px" }}>
                <TableContainer >
                    <Table sx={{ minWidth: 700 }} >
                        <TableHead>
                            <TableRow style={{ backgroundColor: "rgba(154, 101, 198, 1)", color: "white" }} >
                                {/* <TableCell className="thCell" align='center'>S.No.</TableCell>
                                <TableCell className="thCell" align='center'>MD5</TableCell>
                                <TableCell className="thCell" align='center'>SHA1</TableCell>
                                <TableCell className="thCell" align='center'>SHA256</TableCell>
                                <TableCell className="thCell" align='center'>Reputation</TableCell> */}
                                {columns.map((column) => (
                                    <TableCell style={{ backgroundColor: "rgba(154, 101, 198, 1)", color: "white" }} key={column.id} align='center'>{column.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hashValueDetail && hashValueDetail.map((detail, i) => (
                                  <TableRow key={i}>
                                  {
                                      JSON.stringify(detail.data) ?
                                          <>
                                              <TableCell component="th" scope="row">
                                                  {JSON.stringify(i + 1, null, 2)}
                                              </TableCell>
                                              <TableCell component="th" scope="row">
                                                  {JSON.stringify(detail.data.attributes.md5, null, 2)}
                                              </TableCell>
                                              <TableCell component="th" scope="row">
                                                  {JSON.stringify(detail.data.attributes.sha1, null, 2)}
                                              </TableCell>
                                              <TableCell component="th" scope="row">
                                                  {JSON.stringify(detail.data.attributes.sha256, null, 2)}
                                              </TableCell>
                                              {/* <TableCell component="th" scope="row">
                                                  (
                                                  {JSON.stringify(detail.data.attributes.last_analysis_stats.malicious, null, 2)} / {JSON.stringify(detail.data.attributes.last_analysis_stats.malicious +
                                                      detail.data.attributes.last_analysis_stats.undetected, null, 2)}
                                                  )
                                              </TableCell> */}
                                          </>
                                          :
                                          <>
                                              <TableCell component="th" scope="row">
                                                  {JSON.stringify(i + 1, null, 2)}
                                              </TableCell>
                                              <TableCell component="th" scope="row">
                                                  "NA"
                                              </TableCell>
                                              <TableCell component="th" scope="row">
                                                  "na"
                                              </TableCell>
                                              <TableCell component="th" scope="row">
                                                  "NA"
                                              </TableCell>
                                              <TableCell component="th" scope="row">
                                                  "NA"
                                              </TableCell>
                                          </>
                                  }
                              </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
            {/* </div> */}


        </>
    );
};
HashDetail.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};


export default HashDetail;
