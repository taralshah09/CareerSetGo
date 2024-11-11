import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const checkerImageUrl = "https://s3-alpha-sig.figma.com/img/eae3/13a4/8883a46e7a2a60ee806e73a8052191be?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ctfdl3gJVbAH9VmJvj2Gmwm-jz5JVm-OKnRuKok~k5yQ5sgsGn1RWsDkVTI4TTkYEdOBsb4Qf2W-s0SGda~pH0JX~evws8Q3ruspR8vylSSgMyIa6chDmZYU3HSgK1Mlqgs51cQUq-N1SModOJWJIfZiwLMX5w9ADT8FLNIJKUXi-IRvoGc0xt55lAVFsWRMSlbCHJt57wntkFpzHLFCx0R0KM9luQDBq8MBi49qxwdvkNNxbgYTNzzhSCLEzKr8O1gsKH3H-WWLrN6U1LLl-X~QqXzJwg6CUN1gIxn4DBuSMCC282qetSUcWXIwTQ9DT3OuAUFYS87Do8vSWgl5Lw__";

export default function OverlayCard({ companyName, industry, logoUrl }) {
    return (
        <Box
            sx={{
                position: 'relative',
                height: '100px',
                width: '100%',
                maxWidth: '80%',
                mx: 'auto',
                backgroundImage: `url(${checkerImageUrl})`,
                backgroundSize: '100% 200%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                pb: 4,
            }}
        >
            <Card
                sx={{
                    width: '70%',
                    transform: 'translateY(70%)',
                    boxShadow: 3,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    zIndex: 1,
                }}
            >
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center">
                            <img
                                src={logoUrl}
                                alt={`${companyName} Logo`}
                                style={{ width: 40, height: 40, marginRight: 12 }}
                            />
                            <Box>
                                <Typography variant="h6" component="div">
                                    {companyName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {industry}
                                </Typography>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                backgroundColor: '#0A65CC',
                                color: 'white',
                                ':hover': {
                                    backgroundColor: '#1565C0',
                                },
                                '& .MuiButton-endIcon': {
                                    color: 'white', 
                                },
                            }}
                        >
                            View Open Position
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
