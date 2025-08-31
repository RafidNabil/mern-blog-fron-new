import React, { useState } from 'react';
import {
    Sheet,
    Typography,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Grid,
    Stack,
    Alert,
} from '@mui/joy';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset submitted state after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
    };

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
                }}
            >
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography level="h1" sx={{ color: 'text.primary', mb: 2 }}>
                        Get in Touch
                    </Typography>
                    <Typography level="body-lg" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
                        Have a question or want to collaborate? We'd love to hear from you. 
                        Send us a message and we'll respond as soon as possible.
                    </Typography>
                </Box>

                <Grid container spacing={6}>
                    {/* Contact Information */}
                    <Grid xs={12} md={4}>
                        <Stack spacing={4}>
                            <Box>
                                <Typography level="h3" sx={{ color: 'text.primary', mb: 2 }}>
                                    Contact Information
                                </Typography>
                                <Stack spacing={3}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Email sx={{ color: 'primary.500' }} />
                                        <Box>
                                            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                                                Email
                                            </Typography>
                                            <Typography level="body-md" sx={{ color: 'text.primary' }}>
                                                contact@revision.com
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Phone sx={{ color: 'primary.500' }} />
                                        <Box>
                                            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                                                Phone
                                            </Typography>
                                            <Typography level="body-md" sx={{ color: 'text.primary' }}>
                                                +1 (555) 123-4567
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <LocationOn sx={{ color: 'primary.500' }} />
                                        <Box>
                                            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                                                Address
                                            </Typography>
                                            <Typography level="body-md" sx={{ color: 'text.primary' }}>
                                                123 Innovation Street<br />
                                                Tech City, TC 12345
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>

                    {/* Contact Form */}
                    <Grid xs={12} md={8}>
                        <Box>
                            <Typography level="h3" sx={{ color: 'text.primary', mb: 3 }}>
                                Send us a Message
                            </Typography>
                            
                            {submitted && (
                                <Alert color="success" sx={{ mb: 3 }}>
                                    Thank you for your message! We'll get back to you soon.
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <Grid container spacing={2}>
                                        <Grid xs={12} sm={6}>
                                            <FormControl required>
                                                <FormLabel>Name</FormLabel>
                                                <Input
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Your full name"
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid xs={12} sm={6}>
                                            <FormControl required>
                                                <FormLabel>Email</FormLabel>
                                                <Input
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="your.email@example.com"
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    
                                    <FormControl required>
                                        <FormLabel>Subject</FormLabel>
                                        <Input
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="What is this about?"
                                        />
                                    </FormControl>
                                    
                                    <FormControl required>
                                        <FormLabel>Message</FormLabel>
                                        <Textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us more about your inquiry..."
                                            minRows={4}
                                        />
                                    </FormControl>
                                    
                                    <Button
                                        type="submit"
                                        size="lg"
                                        startDecorator={<Send />}
                                        sx={{ alignSelf: 'flex-start' }}
                                    >
                                        Send Message
                                    </Button>
                                </Stack>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Sheet>
        </Box>
    );
};

export default ContactPage;