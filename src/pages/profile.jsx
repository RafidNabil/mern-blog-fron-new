import React, { useState, useEffect } from 'react';
import {
    Box, Card, CardContent, CardActions, Typography, Avatar, Grid, Button, IconButton, Input, Stack, Tooltip, Textarea
} from '@mui/joy';
import { Edit, Delete, Facebook, LinkedIn, Twitter, Save, Cancel, LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mern-blog-o9qh.onrender.com';

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const userId = "689df9bc7fc4d953b46c5d2d";

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/users/${userId}`);
                if (!res.ok) throw new Error('Failed to fetch user');
                const data = await res.json();
                setUser(data);
                setFormData({
                    fullName: data.fullName || '',
                    title: data.title || '',
                    location: data.location || '',
                    bio: data.bio || '',
                    social: data.social || {}
                });
            } catch (err) { console.error(err); }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/posts`);
                const data = await res.json();
                setPosts(data);
            } catch (err) { console.error(err); }
        };
        fetchPosts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("social.")) {
            const key = name.split(".")[1];
            setFormData(prev => ({ ...prev, social: { ...prev.social, [key]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (!res.ok) throw new Error('Update failed');
            const updatedUser = await res.json();
            setUser(updatedUser);
            setEditMode(false);
        } catch (err) { console.error(err); }
    };

    const handleEditPost = (id) => navigate(`/edit-post/${id}`);
    const handleDeletePost = async (id) => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok) setPosts(prev => prev.filter(p => p._id !== id));
        } catch (err) { console.error(err); }
    };

    if (!user) return <Typography sx={{ textAlign: 'center', mt: 5 }}>Loading...</Typography>;

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3, pb: 5 }}>
            {/* Warning Message */}
            <Box sx={{
                p: 2,
                my: 3,
                bgcolor: 'warning.softBg',
                borderLeft: '4px solid',
                borderColor: 'warning.solidBg',
                borderRadius: 'sm',
            }}>
                <Typography level="body-md" sx={{ color: 'warning.solidColor' }}>
                    Warning: Authentication is not fully implemented.
                </Typography>
            </Box>

            {/* Profile Header */}
            <Card variant="outlined" sx={{ mb: 4, p: 3, borderRadius: 'lg', boxShadow: 'md' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: { xs: 'center', sm: 'flex-start' } }}>
                    <Avatar
                        src={user.avatar || 'https://via.placeholder.com/120'}
                        sx={{
                            width: 120,
                            height: 120,
                            border: '4px solid',
                            borderColor: 'background.body',
                            boxShadow: 'md'
                        }}
                    />
                    <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                        {editMode ? (
                            <Stack spacing={2}>
                                <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
                                <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
                                <Input name="location" value={formData.location} onChange={handleChange} placeholder="Location" startDecorator={<LocationOn />} />
                                <Textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" minRows={5} />
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Input name="social.x" value={formData.social?.x || ''} onChange={handleChange} placeholder="Twitter/X" startDecorator={<Twitter />} />
                                    <Input name="social.facebook" value={formData.social?.facebook || ''} onChange={handleChange} placeholder="Facebook" startDecorator={<Facebook />} />
                                    <Input name="social.linkedin" value={formData.social?.linkedin || ''} onChange={handleChange} placeholder="LinkedIn" startDecorator={<LinkedIn />} />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                    <Button startDecorator={<Save />} variant="solid" color="primary" onClick={handleUpdate}>Save</Button>
                                    <Button startDecorator={<Cancel />} variant="outlined" color="neutral" onClick={() => setEditMode(false)}>Cancel</Button>
                                </Box>
                            </Stack>
                        ) : (
                            <Box>
                                <Typography level="h3" sx={{ fontWeight: 'bold' }}>{user.fullName}</Typography>
                                <Typography level="body-lg" sx={{ color: 'text.secondary', mb: 1 }}>{user.title}</Typography>
                                <Typography level="body-sm" sx={{ color: 'text.tertiary', mb: 1, display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' } }}><LocationOn sx={{ fontSize: 'md', mr: 0.5 }} />{user.location}</Typography>
                                <Typography level="body-md" sx={{ mb: 2 }}>{user.bio}</Typography>
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                    {user.social?.x && (
                                        <Tooltip title="Twitter/X"><a href={user.social.x} target="_blank" rel="noopener noreferrer"><IconButton size="sm" color="primary"><Twitter /></IconButton></a></Tooltip>
                                    )}
                                    {user.social?.facebook && (
                                        <Tooltip title="Facebook"><a href={user.social.facebook} target="_blank" rel="noopener noreferrer"><IconButton size="sm" color="primary"><Facebook /></IconButton></a></Tooltip>
                                    )}
                                    {user.social?.linkedin && (
                                        <Tooltip title="LinkedIn"><a href={user.social.linkedin} target="_blank" rel="noopener noreferrer"><IconButton size="sm" color="primary"><LinkedIn /></IconButton></a></Tooltip>
                                    )}
                                </Box>
                                <Button variant="outlined" color="primary" onClick={() => setEditMode(true)} sx={{ mt: 2 }}>Edit Profile</Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Card>

            {/* Posts Grid */}
            <Typography level="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>Your Blogs</Typography>
            {posts.length ? (
                <Grid container spacing={4} sx={{ mb: 5 }}>
                    {posts.map(post => (
                        <Grid xs={12} sm={6} md={4} key={post._id}>
                            <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', borderRadius: 'md', boxShadow: 'md', transition: '0.2s', '&:hover': { boxShadow: 'lg' } }}>
                                {post.imageUrl && (
                                    <Box sx={{ height: 160, overflow: 'hidden', borderBottom: '1px solid', borderColor: 'divider' }}>
                                        <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Box>
                                )}
                                <CardContent sx={{ minHeight: 180 }}>
                                    <Typography level="title-md" sx={{ fontWeight: 'bold', mb: 1, minHeight: 40 }}>{post.title}</Typography>
                                    <Typography level="body-sm" sx={{ color: 'text.tertiary', mb: 2, minHeight: 60 }}>{post.summary?.substring(0, 100)}...</Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'flex-end', borderTop: '1px solid', borderColor: 'divider', p: 1 }}>
                                    <Button
                                        startDecorator={<Edit />}
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEditPost(post._id)}
                                        sx={{ flex: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        startDecorator={<Delete />}
                                        variant="solid"
                                        color="danger"
{/*                                         onClick={() => handleDeletePost(post._id)} */}
                                        sx={{ flex: 1 }}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography sx={{ color: 'text.secondary', textAlign: 'center', mt: 3 }}>You have not created any blogs yet.</Typography>
            )}

            <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Button variant="solid" color="primary" onClick={() => navigate('/home')} sx={{ px: 5, py: 1.5 }}>Back to Home</Button>
            </Box>
        </Box>
    );
}

export default Profile;
