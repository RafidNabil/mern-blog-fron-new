import React from 'react';
import {
    Sheet,
    Typography,
    Box,
    Link,
    Divider,
} from '@mui/joy';

const AboutPage = () => {
    return (
        <Box
            sx={{
                bgcolor: 'background.body',
                minHeight: '100vh',
                p: { xs: 2, md: 8 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    borderRadius: 'lg',
                    boxShadow: 'md',
                    p: { xs: 3, md: 6 },
                    bgcolor: 'background.surface',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                }}
            >
                {/* Header Section */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography level="h1" sx={{ color: 'text.primary', mb: 1 }}>
                        About Us
                    </Typography>
                    <Typography level="body-lg" sx={{ color: 'text.secondary' }}>
                        Our mission is to deliver insightful content that inspires, informs, and connects a global audience.
                    </Typography>
                </Box>

                <Divider />

                {/* Our Story Section */}
                <Box>
                    <Typography level="h2" sx={{ color: 'text.primary', mb: 2 }}>
                        Our Story
                    </Typography>
                    <Typography level="body-md" sx={{ color: 'text.secondary', mb: 2 }}>
                        Founded with a vision to bridge knowledge gaps and foster meaningful conversations, our platform has grown into a trusted source for diverse perspectives and thought-provoking content.
                    </Typography>
                    <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                        We believe in the power of storytelling and the importance of sharing knowledge across borders, cultures, and disciplines.
                    </Typography>
                </Box>

                <Divider />

                {/* Values Section */}
                <Box>
                    <Typography level="h2" sx={{ color: 'text.primary', mb: 2 }}>
                        Our Values
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                        <Box>
                            <Typography level="h3" sx={{ color: 'text.primary', mb: 1 }}>
                                Authenticity
                            </Typography>
                            <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                                We prioritize genuine, well-researched content that adds real value to our readers' lives.
                            </Typography>
                        </Box>
                        <Box>
                            <Typography level="h3" sx={{ color: 'text.primary', mb: 1 }}>
                                Diversity
                            </Typography>
                            <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                                We celebrate diverse voices and perspectives, ensuring our content reflects the richness of human experience.
                            </Typography>
                        </Box>
                        <Box>
                            <Typography level="h3" sx={{ color: 'text.primary', mb: 1 }}>
                                Innovation
                            </Typography>
                            <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                                We continuously evolve our platform to meet the changing needs of our community and embrace new technologies.
                            </Typography>
                        </Box>
                        <Box>
                            <Typography level="h3" sx={{ color: 'text.primary', mb: 1 }}>
                                Community
                            </Typography>
                            <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                                We foster a supportive environment where writers and readers can connect, learn, and grow together.
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider />

                {/* Contact Section */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography level="h2" sx={{ color: 'text.primary', mb: 2 }}>
                        Get in Touch
                    </Typography>
                    <Typography level="body-md" sx={{ color: 'text.secondary', mb: 3 }}>
                        Have questions or want to contribute? We'd love to hear from you.
                    </Typography>
                    <Link href="/contact" sx={{ textDecoration: 'none' }}>
                        Contact Us
                    </Link>
                </Box>
            </Sheet>
        </Box>
    );
};

export default AboutPage;