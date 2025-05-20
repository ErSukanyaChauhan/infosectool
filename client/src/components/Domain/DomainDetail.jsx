import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Typography } from '@mui/material';
import { FaSearch } from "react-icons/fa";
import Navbar from '../Navbar/Navbar';
import "../Domain/DomainDetail.css";

const DomainDetail = ({ theme }) => {
    const [apiKey, setApiKey] = useState('');
    const [domain, setDomainValue] = useState('');
    const [domainValueDetail, setDomainValueDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const MAX_DOMAIN_LIMIT = 20; // Set domain limit

    async function getDomainValueDetail(domain) {
        try {
            const response = await fetch(`http://localhost:4000/api/domain/${domain}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey, domain })
            });
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!apiKey.trim()) return alert('Please enter an API Key');




        const values = domain.split(',').map(value => value.trim()).filter(value => value);

        if (values.length === 0) return setError('Please enter at least one valid domain.');
        if (values.length > MAX_DOMAIN_LIMIT) return setError(`You can check up to ${MAX_DOMAIN_LIMIT} domains at a time.`);

        setError('');
        setDomainValue(values);
        setLoading(true);

        const details = await Promise.all(values.map(value => getDomainValueDetail(value)));
        console.log(details);
        setDomainValueDetail(details);
        setLoading(false);
    };

    const columns = [
        { id: "id", name: "ID" },
        { id: "domain", name: "Domain" },
        { id: "score", name: "Score" },
        { id: "source", name: "Threat Intel" },
        { id: "actions", name: "Actions" },
    ];

    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Paper elevation={6} sx={{ padding: 4, width: "60%", textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                        Check Domain/URL Reputation
                    </Typography>
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
                            placeholder="Enter up to 20 Domains (comma-separated)"
                            value={domain}
                            onChange={(e) => {
                                const input = e.target.value;

                                // Normalize pasted input:
                                let formatted = input
                                    .replace(/\s+/g, ',')       // Replace spaces/newlines with commas
                                    .replace(/,+/g, ',')        // Replace multiple commas with one
                                    .replace(/^,|,$/g, '');     // Remove leading/trailing commas

                                setDomainValue(formatted);
                                setError('');
                            }}
                            required
                            multiline
                            rows={3}
                            sx={{ marginBottom: 2 }}
                        />
                        {/* <TextField
                            fullWidth
                            placeholder="Enter up to 20 Domain (comma-separated)"
                            value={domain}
                            onChange={(e) => {
                                setDomainValue(e.target.value);
                                setError('');
                            }}
                            required
                            multiline
                            rows={3}
                            sx={{ marginBottom: 2 }}
                        /> */}
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
                                    <TableCell key={column.id} align='center' style={{ color: "white", fontWeight: "bold" }}>
                                        {column.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <LinearProgress />
                                    </TableCell>
                                </TableRow>
                            )}
                            {!loading && domainValueDetail.length > 0 && domainValueDetail.map((detail, i) => (
                                <TableRow key={i}>


                                    <TableCell align="center">{i + 1}</TableCell>
                                    <TableCell align="center">{detail?.data?.id || 'NA'}</TableCell>
                                    <TableCell align="center">
                                        {detail?.data?.attributes?.last_analysis_stats.malicious || 0} /
                                        {(detail?.data?.attributes?.last_analysis_stats.harmless || 0) +
                                            (detail?.data?.attributes?.last_analysis_stats.undetected || 0)}
                                    </TableCell>

                                    <TableCell align="center">VirusTotal</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            disabled={!detail?.data?.attributes}
                                            onClick={() => {
                                                localStorage.setItem('domainDetails', JSON.stringify(detail.data?.attributes, null, 2));
                                                window.open('/domaindetails', '_blank');
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

DomainDetail.propTypes = { window: PropTypes.func };
export default DomainDetail;
