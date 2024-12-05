import React, { useState } from 'react';
import "./OverviewEmployer.css";
import { FaUserGroup } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Plus in circle icon
import VisibilityIcon from '@mui/icons-material/Visibility'; // View Detail
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'; // Cross in circle icon

const OverviewEmployer = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className='overview'>
            <div className="overview-header">
                <h2>Hello, Instagram</h2>
                <p>Here is your daily activities and applications</p>
            </div>

            <div className="overview-stats">
                <div className="stats-item">
                    <div className="stats-left">
                        <h3>589</h3>
                        <p>Open jobs</p>
                    </div>
                    <div className="img-box">
                        <img src="../images/bag.png" alt="" />
                    </div>
                </div>
                <div className="stats-item">
                    <div className="stats-left">
                        <h3>574</h3>
                        <p>Saved Candidates</p>
                    </div>
                    <div className="img-box">
                        <img src="../images/alert.png" alt="" />
                    </div>
                </div>
            </div>

            <div className="recently-applied">
                <h3>Recently Posted Jobs</h3>
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
                        <tr className="recently">
                            <td>
                                <div className="job-details">
                                    <div>
                                        <span className="job-title">Networking Engineer<br /></span>
                                        <span>Full Time &nbsp;&nbsp; 3 Days Remaining</span>
                                    </div>
                                </div>
                            </td>
                            <td><span className="status-active">Active</span></td>
                            <td><FaUserGroup />798 Applications</td>
                            <td>
                                <div className="action-container">
                                    <button className="action-btn">View Application</button>
                                    <IconButton onClick={handleMenuOpen} className="btn-icon">
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
                        <tr className="recently">
                            <td>
                                <div className="job-details">
                                    <div>
                                        <span className="job-title">Networking Engineer<br /></span>
                                        <span>Full Time &nbsp;&nbsp; 3 Days Remaining</span>
                                    </div>
                                </div>
                            </td>
                            <td><span className="status-active">Active</span></td>
                            <td><FaUserGroup />798 Applications</td>
                            <td>
                                <div className="action-container">
                                    <button className="action-btn">View Application</button>
                                    <IconButton onClick={handleMenuOpen} className="btn-icon">
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
                        <tr className="recently">
                            <td>
                                <div className="job-details">
                                    <div>
                                        <span className="job-title">Networking Engineer<br /></span>
                                        <span>Full Time &nbsp;&nbsp; 3 Days Remaining</span>
                                    </div>
                                </div>
                            </td>
                            <td><span className="status-active">Active</span></td>
                            <td><FaUserGroup />798 Applications</td>
                            <td>
                                <div className="action-container">
                                    <button className="action-btn">View Application</button>
                                    <IconButton onClick={handleMenuOpen} className="btn-icon">
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
                        {/* Repeat other rows here */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OverviewEmployer;