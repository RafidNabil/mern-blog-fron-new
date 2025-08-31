import * as React from 'react';
import { useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { Grid, Stack, Alert } from '@mui/joy';
import { Warning } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from '../assets/cover.jpg';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mern-blog-o9qh.onrender.com';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setError('');
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${BACKEND_URL}/api/auth/login`, formData);
            console.log('Login successful:', response.data);
            setError('Login successful! Redirecting to dashboard...');

            if (response.status === 200) {
                navigate('/home');
            }
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Something went wrong');
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
                        maxWidth: 400,
                        mx: 'auto',
                        py: 3,
                        px: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                        bgcolor: 'background.surface',
                    }}
                    variant="outlined"
                >
                    <div>
                        <Typography level="h4" component="h1" sx={{ mb: 1 }}>
                            <strong>Welcome back</strong>
                        </Typography>
                        <Typography level="body-sm">Sign in to continue.</Typography>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            {error && (
                                <Alert
                                    startDecorator={<Warning />}
                                    variant="soft"
                                    color={error.includes('successful') ? 'success' : 'danger'}
                                >
                                    {error}
                                </Alert>
                            )}
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    size="lg"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    size="lg"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                            <Button size="lg" type="submit" sx={{ mt: 1 }}>
                                Log in
                            </Button>
                        </Stack>
                    </form>
                    <Typography level="body-sm" sx={{ textAlign: 'center' }}>
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            Sign up
                        </Link>
                    </Typography>
                </Sheet>
            </Grid>
        </Grid>
    );
}
