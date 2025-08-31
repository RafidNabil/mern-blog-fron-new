import * as React from 'react';
import { Box, Typography, Card, AspectRatio, Chip, Stack, Skeleton } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Vercel env variable

export default function ReadNextSection({ topics, authors }) {
    const [posts, setPosts] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/posts`);
                if (!res.ok) throw new Error('Failed to fetch posts');
                const data = await res.json();
                const shuffled = data.sort(() => 0.5 - Math.random());
                setPosts(shuffled.slice(0, 3));
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/blogpage/${id}`);
    };

    return (
        <Box 
            sx={{ 
                bgcolor: 'background.surface', 
                p: 3, 
                borderRadius: 'lg',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'sm',
                mb: 4 // This adds margin-bottom for a little space
            }}
        >
            <Typography 
                level="h3" 
                sx={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: 'text.primary', 
                    mb: 3,
                    textAlign: 'center'
                }}
            >
                Read Next
            </Typography>

            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' }, 
                    gap: 3, 
                }}
            >
                {(posts ? posts : Array.from({ length: 3 })).map((post, index) => (
                    <Card
                        key={index}
                        onClick={() => post && handleCardClick(post._id)}
                        variant="outlined"
                        sx={{
                            flex: 1, 
                            cursor: 'pointer',
                            bgcolor: 'background.body',
                            borderColor: 'divider',
                            color: 'text.primary',
                            p: 2,
                            borderRadius: 'md',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': { 
                                transform: 'translateY(-2px)', 
                                boxShadow: 'md', 
                                borderColor: 'primary.main' 
                            },
                        }}
                    >
                        <AspectRatio 
                            ratio="16/9" 
                            sx={{ 
                                borderRadius: 'md', 
                                mb: 2,
                                '& img': {
                                    objectFit: 'cover'
                                }
                            }}
                        >
                            {post ? (
                                <img 
                                    src={post.imageUrl} 
                                    alt={post.title}
                                    style={{ objectFit: 'cover' }}
                                />
                            ) : (
                                <Skeleton variant="rectangular" />
                            )}
                        </AspectRatio>

                        <Stack spacing={1.5}>
                            {/* Topics */}
                            {post && post.topics && post.topics.length > 0 && (
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {post.topics.slice(0, 2).map((id) => (
                                        <Chip 
                                            key={id} 
                                            size="sm" 
                                            variant="soft" 
                                            sx={{ 
                                                fontWeight: 'bold',
                                                fontSize: '0.75rem'
                                            }}
                                        >
                                            {topics[id] || 'Unknown'}
                                        </Chip>
                                    ))}
                                </Box>
                            )}

                            {/* Author and Date */}
                            <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                                {post ? (
                                    `${authors[post.author] || 'Unknown'} • ${new Date(post.createdAt).toLocaleDateString()}`
                                ) : (
                                    <Skeleton width="80%" />
                                )}
                            </Typography>

                            {/* Title */}
                            <Typography 
                                level="title-md" 
                                sx={{ 
                                    fontSize: '1rem', 
                                    fontWeight: 'bold', 
                                    lineHeight: 1.3,
                                    minHeight: '2.6em',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                            >
                                {post ? post.title : <Skeleton width="90%" />}
                            </Typography>

                            {/* Summary */}
                            <Typography 
                                level="body-sm" 
                                sx={{ 
                                    color: 'text.secondary', 
                                    lineHeight: 1.4,
                                    minHeight: '2.8em',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                            >
                                {post ? (
                                    post.summary.length > 60 ? post.summary.slice(0, 57) + '...' : post.summary
                                ) : (
                                    <Skeleton width="100%" />
                                )}
                            </Typography>
                        </Stack>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}