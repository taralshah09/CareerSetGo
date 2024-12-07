import React from 'react';
import { Box, Typography, Modal, Button, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const MoreDetailsModal = ({ open, onClose, userSkills, jobSkills, skills }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="more-details-modal-title"
            aria-describedby="more-details-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography id="more-details-modal-title" variant="h6" component="h2" mb={2}>
                    More Details
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                    Job Required Skills:
                </Typography>
                <List>
                    {jobSkills.map((skill, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={skill} />
                        </ListItem>
                    ))}
                </List>

                <Typography variant="subtitle1" mt={2} gutterBottom>
                    Your Skills:
                </Typography>
                <List>
                    {skills.map((skillObj, index) => (
                        <ListItem key={index}>
                            {skillObj.verified ? (
                                <ListItemText
                                    primary={skillObj.name}
                                    primaryTypographyProps={{
                                        sx: { color: 'green', fontWeight: 'bold' },
                                    }}
                                />
                            ) : (
                                <ListItemText
                                    primary={
                                        <Link
                                            to={`/verify/${skillObj.name}`}
                                            style={{ color: 'red', fontWeight: 'bold', textDecoration: 'none' }}
                                        >
                                            {skillObj.name}
                                        </Link>
                                    }
                                />
                            )}
                        </ListItem>
                    ))}
                </List>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                    sx={{ mt: 3, width: '100%' }}
                >
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default MoreDetailsModal;
