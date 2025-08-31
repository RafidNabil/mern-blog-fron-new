import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Typography,
    Grid,
    Stack,
    Alert,
    Sheet,
} from '@mui/joy';
import { Warning } from '@mui/icons-material';
import backgroundImage from '../assets/cover.jpg';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mern-blog-o9qh.onrender.com';

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setError('');
        setSuccess('');
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, {
                fullName: formData.fullName,
                userName: formData.userName,
                email: formData.email,
                password: formData.password,
            });

            console.log('Signup successful:', response.data);
            setSuccess('Account created successfully! Redirecting to login...');

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            console.error('Signup error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Something went wrong during signup');
        }
    };

    return (
        <Grid
            container
            sx={{
                minHeight: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Grid
                xs={12}
                md={6}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                }}
            >
                <Sheet
                    sx={{
                        width: '100%',
                        maxWidth: 500,
                        mx: 'auto',
                        py: 4,
                        px: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                        bgcolor: 'background.surface',
                    }}
                    variant="outlined"
                >
                    <div>
                        <Typography level="h3" component="h1" sx={{ mb: 1, textAlign: 'center' }}>
                            <strong>Create Account</strong>
                        </Typography>
                        <Typography level="body-sm" sx={{ textAlign: 'center' }}>
                            Join our community and start sharing your stories.
                        </Typography>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            {error && (
                                <Alert
                                    startDecorator={<Warning />}
                                    variant="soft"
                                    color="danger"
                                >
                                    {error}
                                </Alert>
                            )}

                            {success && (
                                <Alert
                                    variant="soft"
                                    color="success"
                                >
                                    {success}
                                </Alert>
                            )}

                            <FormControl required>
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    size="lg"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                />
                            </FormControl>

                            <FormControl required>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    size="lg"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    placeholder="Choose a username"
                                />
                            </FormControl>

                            <FormControl required>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    size="lg"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                />
                            </FormControl>

                            <FormControl required>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    size="lg"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="At least 6 characters"
                                />
                            </FormControl>

                            <FormControl required>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    size="lg"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                size="lg"
                                sx={{ mt: 2 }}
                            >
                                Create Account
                            </Button>
                        </Stack>
                    </form>

                    <Typography level="body-sm" sx={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            Sign in
                        </Link>
                    </Typography>
                </Sheet>
            </Grid>
        </Grid>
    );
}