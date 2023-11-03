import React from 'react';
import '../index.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';


const Post = () => {
    return (
        <div>
            <Card className='bcryptPost' sx={{ maxWidth: 345 }}>
                <CardMedia className='bcryptImage' />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        BCrypt
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Apparently Bcrypt is just an algorithm.
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
        </div>
    )
}

export default Post;