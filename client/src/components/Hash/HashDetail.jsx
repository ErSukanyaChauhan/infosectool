import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Typography } from '@mui/material';
import { FaSearch } from "react-icons/fa";
import Navbar from '../Navbar/Navbar';
import "../Hash/HashDetail.css";

const HashDetail = ({ theme }) => {
    const [apiKey, setApiKey] = useState('');
    const [hash, setHashValue] = useState('');
    const [hashValueDetail, setHashValueDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const MAX_HASH_LIMIT = 20; // Set hash limit

    async function getHashValueDetail(hash) {
        try {
            const response = await fetch(`https://api.infosectool.com/api/hash/${hash}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey, hash })
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

        const values = hash.split(',').map(value => value.trim()).filter(value => value);

        if (values.length === 0) return setError('Please enter at least one valid hash.');
        if (values.length > MAX_HASH_LIMIT) return setError(`You can check up to ${MAX_HASH_LIMIT} hashes at a time.`);

        setError('');
        setHashValue(values);
        setLoading(true);

        const details = await Promise.all(values.map(value => getHashValueDetail(value)));
        console.log(details);
        setHashValueDetail(details);
        setLoading(false);
    };

    const columns = [
        { id: "id", name: "ID" },
        { id: "md5", name: "MD5" },
        { id: "sha1", name: "SHA1" },
        { id: "sha256", name: "SHA256" },
        { id: "reputation", name: "VirusTotal Reputation" },
        { id: "actions", name: "Actions" },
    ];

    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Paper elevation={6} sx={{ padding: 4, width: "60%", textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                    Check Hashes Reputation
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
                            placeholder="Enter up to 20 Hashes (comma-separated)"
                            value={hash}
                            onChange={(e) => {
                                const input = e.target.value;

                                // Normalize pasted input:
                                let formatted = input
                                    .replace(/\s+/g, ',')       // Replace spaces/newlines with commas
                                    .replace(/,+/g, ',')        // Replace multiple commas with one
                                    .replace(/^,|,$/g, '');     // Remove leading/trailing commas

                                setHashValue(formatted);
                                setError('');
                            }}
                            required
                            multiline
                            rows={3}
                            sx={{ marginBottom: 2 }}
                        />
{/* 
                        <TextField
                            fullWidth
                            placeholder="Enter up to 20 Hashes (comma-separated)"
                            value={hash}
                            onChange={(e) => {
                                setHashValue(e.target.value);
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
                            {!loading && hashValueDetail.length > 0 && hashValueDetail.map((detail, i) => (
                                <TableRow key={i}>


                                    <TableCell align="center">{i + 1}</TableCell>
                                    <TableCell align="center">{detail?.data?.attributes?.md5 || 'NA'}</TableCell>
                                    <TableCell align="center">{detail?.data?.attributes?.sha1 || 'NA'}</TableCell>
                                    <TableCell align="center">{detail?.data?.attributes?.sha256 || 'NA'}</TableCell>
                                    <TableCell align="center">
                                        {detail?.data?.attributes?.last_analysis_stats.malicious || 0} /
                                        {(detail?.data?.attributes?.last_analysis_stats.malicious || 0) +
                                            (detail?.data?.attributes?.last_analysis_stats.undetected || 0)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            disabled={!detail?.data?.attributes}
                                            onClick={() => {
                                                localStorage.setItem('hashDetails', JSON.stringify(detail.data?.attributes, null, 2));
                                                window.open('/hashdetails', '_blank');
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
        </>
    );
};

HashDetail.propTypes = { window: PropTypes.func };
export default HashDetail;
