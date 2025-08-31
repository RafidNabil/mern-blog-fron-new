import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Box, Typography } from '@mui/joy';
import Divider from '@mui/joy/Divider';
import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';

import theme from '../components/theme';
import BlogHeader from '../components/Post/postHeader';
import ReadNextSection from '../components/Post/readNext';
import SocialShare from '../components/Post/socialShare';
import ProfileSection from '../components/Home/ProfileSection';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mern-blog-o9qh.onrender.com';

function BlogPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [topics, setTopics] = useState([]);
    const [authors, setAuthors] = useState([]);

    React.useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/posts/${id}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        const fetchTopics = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/topics`);
                if (!res.ok) throw new Error('Failed to fetch categories');
                const data = await res.json();
                setTopics(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchAuthors = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/author`);
                if (!res.ok) throw new Error('Failed to fetch authors');
                const data = await res.json();
                setAuthors(data);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        fetchTopics();
        fetchAuthors();
        fetchPost();
    }, [id]);

    const topicMap = useMemo(() => {
        const map = {};
        topics.forEach((t) => {
            map[t._id] = t.label;
        });
        return map;
    }, [topics]);

    const authorMap = useMemo(() => {
        const map = {};
        authors.forEach((a) => {
            map[a._id] = a.fullName;
        });
        return map;
    }, [authors]);

    if (!post) return <Typography>Loading...</Typography>;

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    bgcolor: 'background.body',
                    minHeight: '100vh',
                    px: { xs: 2, md: 4 },
                }}
            >
                <BlogHeader
                    title={post.title}
                    image={post.imageUrl}
                    summary={post.summary}
                    topics={Array.isArray(post.topics) ? post.topics.map((id) => topicMap[id]) : []}
                    author={authorMap[post.author] || 'Unknown'}
                    createdat={post.createdAt}
                />
                <Divider sx={{ my: 3 }} />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '70% 30%' },
                        gap: 4,
                        alignItems: 'start',
                        maxWidth: 'lg',
                        mx: 'auto',
                    }}
                >
                    {/* Main Content */}
                    <Box
                        sx={{
                            fontFamily: 'jaro',
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                            wordBreak: 'break-word',
                            'img': {
                                maxWidth: '100%',
                                height: 'auto',
                                display: 'block',
                                margin: '20px auto',
                                borderRadius: '8px',
                            },
                            'p': {
                                marginBottom: '16px',
                            },
                            'pre, code': {
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                overflowX: 'auto',
                                display: 'block',
                            }
                        }}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Social Share and Profile Section */}
                    <Box sx={{
                        position: 'sticky',
                        top: 24,
                        alignSelf: 'start',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                    }}>
                        <SocialShare />
                        <ProfileSection topics={topicMap} authors={authorMap} />
                    </Box>
                </Box>

                <Divider sx={{ my: 4 }} />
                <ReadNextSection topics={topicMap} authors={authorMap}/>
            </Box>
        </CssVarsProvider>
    );
}

export default BlogPage;