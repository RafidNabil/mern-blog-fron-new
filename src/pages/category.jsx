import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import Chip from '@mui/joy/Chip';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useEffect, useState } from 'react';

const SportPage = () => {
    const articles = [
        {
            image: '/api/placeholder/400/300',
            tags: ['SPORT', 'TRAVEL'],
            author: 'Ethan Caldwell',
            date: 'on September 29, 2024',
            title: 'The Future of Work: Tech and Remote Trends',
            description: 'Find out why 2024 is predicted to be a pivotal year for sports technology and its impact on the industry.',
            backgroundColor: '#e6e6ff'
        },
        {
            image: '/api/placeholder/400/300',
            tags: ['SPORT'],
            author: 'Ethan Caldwell',
            date: 'on September 24, 2024',
            title: 'Key Sports Trends for 2024: From AI to Virtual Reality',
            description: 'Dive into the key sports trends like AI and virtual reality set to redefine the sports industry in 2024.',
            backgroundColor: '#ffcc99'
        },
        {
            image: '/api/placeholder/400/300',
            tags: ['SPORT'],
            author: 'Ethan Caldwell',
            date: 'on September 15, 2024',
            title: 'Startups Disrupting the Sports Industry with Innovative Tech',
            description: 'Discover how startups are leveraging technology to disrupt and innovate within the sports industry.',
            backgroundColor: '#99ff99'
        },
        // Additional articles...
    ];

    return (
        <Box sx={{ bgcolor: 'background.body', minHeight: '100vh', color: 'text.primary' }}>
            {/* Header Section */}
            <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1400px', margin: '0 auto' }}>
                {/* Breadcrumbs */}
                <Breadcrumbs
                    separator={<ChevronRightRoundedIcon fontSize="small" />}
                    sx={{ mb: 4, color: 'text.secondary' }}
                >
                    <Link color="neutral">Home</Link>
                    <Typography color="neutral">Sport</Typography>
                </Breadcrumbs>

                {/* Category Icon and Title */}
                <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
                    <AspectRatio
                        ratio="1"
                        sx={{
                            width: 80,
                            borderRadius: 'xl',
                            bgcolor: 'primary.500',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Placeholder for basketball icon */}
                        <Box sx={{ p: 2 }} />
                    </AspectRatio>

                    <Box>
                        <Typography level="h1" sx={{ fontSize: '2rem', mb: 1 }}>
                            Sport
                        </Typography>
                        <Typography level="body-md" sx={{ color: 'text.secondary', maxWidth: '600px' }}>
                            Catch up on the latest sporting events, match highlights, and in-depth analysis across various sports, including football, basketball, tennis, and more.
                        </Typography>
                    </Box>
                </Box>

                {/* Articles Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)'
                        },
                        gap: 3
                    }}
                >
                    {articles.map((article, index) => (
                        <Card
                            key={index}
                            variant="outlined"
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 'lg',
                                },
                            }}
                        >
                            <AspectRatio ratio="16/9" sx={{ mb: 2 }}>
                                <Box
                                    sx={{
                                        backgroundImage: `url(${article.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundColor: article.backgroundColor,
                                    }}
                                />
                            </AspectRatio>
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ mb: 2 }}>
                                    {article.tags.map((tag, tagIndex) => (
                                        <Chip
                                            key={tagIndex}
                                            variant="soft"
                                            color="primary"
                                            size="sm"
                                            sx={{
                                                mr: 1,
                                                mb: 1,
                                                fontWeight: 'bold',
                                                textTransform: 'uppercase',
                                                fontSize: '0.7rem',
                                                letterSpacing: '0.5px',
                                            }}
                                        >
                                            {tag}
                                        </Chip>
                                    ))}
                                </Box>
                                <Typography
                                    level="h3"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        mb: 1,
                                        lineHeight: 1.3,
                                        flex: 1,
                                    }}
                                >
                                    {article.title}
                                </Typography>
                                <Typography
                                    level="body-sm"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 2,
                                        lineHeight: 1.5,
                                        flex: 1,
                                    }}
                                >
                                    {article.description}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mt: 'auto',
                                    }}
                                >
                                    <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                                        {article.author}
                                    </Typography>
                                    <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                                        {article.date}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default SportPage;