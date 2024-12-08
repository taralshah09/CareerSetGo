import React, { useState } from 'react';
import "./MyJobCard.css";
import { FaUserGroup } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Container, Typography, Grid, FormControl, InputLabel, Select, TablePagination } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import VisibilityIcon from '@mui/icons-material/Visibility'; 
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'; 
import JobApplications from './JobApplicationPage'; 
import Pagination from './components/BrowseCandidateComponents/Pagination';

const MyJobCard = () => {
    const jobs = [
        { id: 1, title: 'Networking Engineer' },
        { id: 2, title: 'Software Developer' },
        { id: 3, title: 'Product Manager' },
        { id: 4, title: 'UI/UX Designer' },
        { id: 5, title: 'Data Scientist' },
    ];

    const [anchorEl, setAnchorEl] = useState(null);
    const [showJobApplications, setShowJobApplications] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleViewApplicationsClick = () => {
        setShowJobApplications(true);
    };

    const handleBackToJobsClick = () => {
        setShowJobApplications(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedJobs = jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (showJobApplications) {
        return <JobApplications onBack={handleBackToJobsClick} />;
    }

    return (
        <Container maxWidth="xl" sx={{ flex: 1, padding: '1rem', bgcolor: '#ffffff' }}>
            <Typography variant="h5" sx={{ mb: 0, mt: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "Helvetica" }}>
                    My Jobs ({jobs.length})
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <Typography variant="h6" color='#767F8C' sx={{ display: 'flex', alignItems: "center" }}>
                        Job Status
                    </Typography>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="job-select-label">Select Job</InputLabel>
                        <Select
                            labelId="job-select-label"
                            id="job-select"
                            label="Select Job"
                        >
                            {jobs.map((job) => (
                                <MenuItem key={job.id} value={job.id}>
                                    {job.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className="recently-applied">
                        <table>
                            <thead>
                                <tr>
                                    <th>Jobs</th>
                                    <th>Status</th>
                                    <th>Applications</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedJobs.map((job) => (
                                    <tr key={job.id} className="recently">
                                        <td>
                                            <div className="job-details">
                                                <div>
                                                    <span className="job-title">{job.title}<br /></span>
                                                    <span>Full Time &nbsp;&nbsp; 3 Days Remaining</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="status-active">Active</span></td>
                                        <td><FaUserGroup />798 Applications</td>
                                        <td>
                                            <div className="action-container">
                                                <button className="action-btn" onClick={handleViewApplicationsClick}>View Application</button>
                                                <IconButton
                                                    onClick={handleMenuOpen}
                                                    className="btn-icon"
                                                    sx={{ backgroundColor: 'white !important', border: 'none !important' }}
                                                >
                                                    <FaEllipsisV />
                                                </IconButton>
                                            </div>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleMenuClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >
                                                <MenuItem onClick={handleMenuClose}>
                                                    <ListItemIcon>
                                                        <AddCircleOutlineIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText>Promote Job</ListItemText>
                                                </MenuItem>
                                                <MenuItem onClick={handleMenuClose}>
                                                    <ListItemIcon>
                                                        <VisibilityIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText>View Detail</ListItemText>
                                                </MenuItem>
                                                <MenuItem onClick={handleMenuClose}>
                                                    <ListItemIcon>
                                                        <CancelOutlinedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText>Mark as Expired</ListItemText>
                                                </MenuItem>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                </Grid>
            </Grid>
        </Container>
    );
};

export default MyJobCard;