import React from 'react';
import './index.scss';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Pagination from '@mui/material/Pagination';
import Post from './Posts/Post';
import Sidebar from '../Sidebar';
import Loader from 'react-loaders';

const Blog = () => {
    return (
        <div className="container blog-page">
            <Sidebar />
            <Box className='developerImg' >
                <Box className='blogTitle'>The Humble Developer</Box>
            </Box>
            <Container maxWidth="lg" className='blogsContainer'>
                <Typography className='postTitle' variant="h4" >
                    Blog Posts
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className='bcryptPost' sx={{ maxWidth: 345 }}>
                        <CardMedia className='bcryptImage' />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Bcrypt
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Bcrypt is simply a password-hashing 
                            function all wrapped up in a neat and tidy npm package!
                            Definitely an example of my making a concept needlessly  
                            over-complicated!
                            </Typography>
                        </CardContent>
                        <CardActions className="cardActions">
                            <Box className='author' >
                            <Avatar src="./images/Headshot.jpg" alt="Danielle Arnett"></Avatar>
                            </Box>
                            <Box ml={2}>
                            <Typography variant="subtitle2" component="p">
                                Danielle Arnett
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary" component="p">
                                10/10/2023
                            </Typography>
                            </Box>
                            <Box>
                            <BookmarkBorderIcon />
                            </Box>
                        </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className='corsPost' sx={{ maxWidth: 345 }}>
                        <CardMedia className='corsImage' />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            CORS 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Cross Origin Resource Sharing
                            </Typography>
                        </CardContent>
                        <CardActions className="cardActions">
                            <Box className='author' >
                            <Avatar src="./images/Headshot.jpg" alt="Danielle Arnett"></Avatar>
                            </Box>
                            <Box>
                            <Typography variant="subtitle2" component="p">
                                Danielle Arnett
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary" component="p">
                                10/10/2023
                            </Typography>
                            </Box>
                            <Box>
                            <BookmarkBorderIcon />
                            </Box>
                        </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                    <Card className='introPost' sx={{ maxWidth: 345 }}>
                        <CardMedia className='meetImage' />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Meet Danielle
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            A teacher turned software developer.
                        </Typography>
                        </CardContent>
                        <CardActions className="cardActions">
                        <Box className='author' >
                            <Avatar src="./images/Headshot.jpg" alt="Danielle Arnett"></Avatar>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" component="p">
                            Danielle Arnett
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary" component="p">
                            10/10/2023
                            </Typography>
                        </Box>
                        <Box>
                            <BookmarkBorderIcon />
                        </Box>
                        </CardActions>
                    </Card>
                    </Grid>
                </Grid>
                <Box my={4} className='paginationContainer'>
                <Pagination className='pagination' count={1} />

                </Box>
                <Loader type='pacman' />
            </Container>
            
        </div>
    )
}

export default Blog;
