import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Button, Paper, TextField, Typography } from '@mui/material';
import { FaSearch } from "react-icons/fa";
import TableHead from '@mui/material/TableHead';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Navbar from '../Navbar/Navbar';
import PropTypes from 'prop-types';

const IpDetail = ({ theme }) => {
    const [apiKey, setApiKey] = useState('');
    const [ipAddresses, setIPAddresses] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const MAX_IP_LIMIT = 20; // Set IP limit

    const fetchIPDetails = async (ip) => {
        try {
            const response = await fetch(`http://localhost:4000/api/check/${ip}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey, ip })
            });

            if (!response.ok) throw new Error(`Failed to fetch details for ${ip}`);
            return await response.json();
        } catch (err) {
            console.error(`Error fetching ${ip}:`, err);
            return { ip, error: 'Failed to fetch data' };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!apiKey.trim()) return alert('Please enter an API Key');

        const ips = ipAddresses.split(',').map(ip => ip.trim()).filter(ip => ip);

        if (ips.length === 0) return setError('Please enter at least one valid IP address.');
        if (ips.length > MAX_IP_LIMIT) return setError(`You can check up to ${MAX_IP_LIMIT} IPs at a time.`);

        const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const validIPs = ips.filter(ip => ipPattern.test(ip));

        if (validIPs.length === 0) return setError('Please enter valid IP addresses.');

        setError('');
        setResults([]);
        setLoading(true);

        const fetchedResults = await Promise.all(validIPs.map(fetchIPDetails));
        console.log(fetchedResults);
        setResults(fetchedResults);
        setLoading(false);
    };

    const columns = [
        { id: "ip", name: "IP Address" },
        { id: "country", name: "Country" },
        { id: "isp", name: "ISP" },
        { id: "score", name: "Score" },
        { id: "source", name: "Threat Intel" },
        { id: "actions", name: "Actions" },
    ];

    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Paper elevation={6} sx={{ padding: 4, width: "60%", textAlign: "center" }}>
                    <Typography variant="h5" fontWeight="bold">Check IP Address Reputation</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Enter your VirusTotal API Key"
                            variant="outlined"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            required
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            fullWidth
                            placeholder="Enter up to 20 Ip (comma-separated)"
                            value={ipAddresses}
                            onChange={(e) => {
                                const input = e.target.value;

                                // Normalize pasted input:
                                let formatted = input
                                    .replace(/\s+/g, ',')       // Replace spaces/newlines with commas
                                    .replace(/,+/g, ',')        // Replace multiple commas with one
                                    .replace(/^,|,$/g, '');     // Remove leading/trailing commas

                                setIPAddresses(formatted);
                                setError('');
                            }}
                            required
                            multiline
                            rows={3}
                            sx={{ marginBottom: 2 }}
                        />

                        <Button type="submit" variant="contained" color="primary" size="large">
                            <FaSearch />
                        </Button>
                        {error && <Typography color="error" sx={{ pt: 2 }}>{error}</Typography>}
                    </form>
                </Paper>
            </Box>

            <Paper sx={{ width: "80%", margin: "40px auto", padding: 2, borderRadius: 3 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#6200ea", color: "white" }}>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align="center" style={{ color: "white", fontWeight: "bold" }}>
                                        {column.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <LinearProgress sx={{ width: '100%' }} />
                                    </TableCell>
                                </TableRow>
                            )}

                            {!loading && results.length > 0 && results.map((detail, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{detail?.virusTotal?.data?.id || detail.ip || 'N/A'}</TableCell>
                                    <TableCell align="center">{detail?.virusTotal?.data?.attributes?.country || 'N/A'}</TableCell>
                                    <TableCell align="center">{detail?.virusTotal?.data?.attributes?.as_owner || 'N/A'}</TableCell>
                                    <TableCell align="center">
                                        {(detail?.virusTotal?.data?.attributes?.last_analysis_stats?.malicious || 0)} /
                                        {(detail?.virusTotal?.data?.attributes?.last_analysis_stats?.malicious || 0) +
                                            (detail?.virusTotal?.data?.attributes?.last_analysis_stats?.undetected || 0) +
                                            (detail?.virusTotal?.data?.attributes?.harmless || 0)}
                                    </TableCell>
                                    <TableCell align="center">VirusTotal</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            disabled={!detail?.virusTotal?.data}
                                            onClick={() => {
                                                localStorage.setItem('ipDetails', JSON.stringify(detail.virusTotal?.data, null, 2));
                                                window.open('/ipdetails', '_blank');
                                            }}>
                                            More Info
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Paper sx={{ width: "80%", margin: "20px auto", padding: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Steps to Use VirusTotal API
                </Typography>
                <Typography component="ol" sx={{ pl: 3 }}>
                    <li>
                        <strong>Get your VirusTotal API Key:</strong> Visit&nbsp;
                        <a href="https://www.virustotal.com/gui/sign-in" target="_blank" rel="noopener noreferrer">
                            virustotal.com
                        </a>, log in, go to your profile, and copy the API key.
                    </li>
                    <li>
                        <strong>Paste the API Key:</strong> In the input field labeled <em>"Enter your VirusTotal API Key"</em>.
                    </li>
                    <li>
                        <strong>Enter hashes:</strong> You can input up to 20 hashes (comma-separated) in the provided box.
                    </li>
                    <li>
                        <strong>Submit:</strong> Click the search button to fetch VirusTotal reputation data.
                    </li>
                </Typography>
            </Paper>
        </>
    );
};

IpDetail.propTypes = { theme: PropTypes.string };
export default IpDetail;
