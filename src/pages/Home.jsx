import React, { useEffect, useState, useMemo } from 'react';
import { Box, Divider, Button, Stack } from '@mui/joy';

import Featured from '../components/Home/featured';
import TrendingTopics from '../components/Home/trendingTopics';
import PostCards from '../components/Home/postCard';
import ProfileSection from '../components/Home/ProfileSection';

// Use environment variable or fallback to Render backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mern-blog-o9qh.onrender.com';

function Home() {
    const [posts, setPosts] = useState([]);
    const [topics, setTopics] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/posts`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        const fetchTopics = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/topics`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setTopics(data);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        const fetchAuthors = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/author`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        fetchPosts();
        fetchTopics();
        fetchAuthors();
    }, []);

    const topicMap = useMemo(() => {
        const map = {};
        topics.forEach((t) => {
            map[t._id] = t.label.replace(/\s+/g, '');
        });
        return map;
    }, [topics]);

    const authorsMap = useMemo(() => {
        const map = {};
        authors.forEach((t) => {
            map[t._id] = t.fullName;
        });
        return map;
    }, [authors]);

    const filteredPosts =
        selectedTopic && selectedTopic !== "AllEngineeringTopics"
            ? posts.filter(post => topicMap[post.topics?.[0]] === selectedTopic)
            : posts;

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', gap: 5, pb: 15 }}>
            <Featured authorsMap={authorsMap} topicMap={topicMap}/>
            <Divider orientation="horizontal" sx={{ margin: '2rem 0' }} />

            <TrendingTopics onTopicSelect={(topic) => {
                setSelectedTopic(topic);
                setCurrentPage(1);
            }} />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '70% 30%' }, gap: 3 }}>
                <Box sx={{ margin: '0 auto' }}>
                    {currentPosts.map((post, index) => (
                        <React.Fragment key={post._id || index}>
                            <PostCards post={post} />
                            {index !== currentPosts.length - 1 && (
                                <Divider orientation="horizontal" sx={{ margin: '2rem 0' }} />
                            )}
                        </React.Fragment>
                    ))}

                    {totalPages > 1 && (
                        <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mt: 4 }}>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <Button
                                    key={page}
                                    variant={page === currentPage ? 'solid' : 'outlined'}
                                    size="sm"
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Stack>
                    )}
                </Box>
                <Box><ProfileSection topics={topicMap} authors={authorsMap} /></Box>
            </Box>
        </Box>
    );
}

export default Home;
