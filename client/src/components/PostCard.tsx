import React from 'react';
import { IPost } from '../pages/Home';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { Avatar, Divider } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import images from '../images';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from 'react-router-dom';

const PostCard = ({ post, idx }: { post: IPost; idx: number }) => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Box display='flex' flexDirection='column'> 
            <Typography textTransform='capitalize'>{post.username}</Typography>
            <Link to={`/posts/${post.id}`} style={{color:'#3333339f',textDecoration:'none',marginTop:-3}}>
              {moment(post.createdAt).fromNow(true)}
            </Link>
            <Typography marginTop={2} marginBottom={1.4}>{post.body}</Typography>
          </Box>
          <Box>
            <Avatar src={images[idx]} />
          </Box>
        </Box>
        <Divider />
        <Box display='flex' alignItems='center' marginTop={1.5} gap={2}>
          <Button
            variant='contained'
            endIcon={
              <Box display='flex' marginLeft={0.4}>
                <Typography>{post.likeCount}</Typography>
                <FavoriteBorderIcon />
              </Box>
            }
            sx={{
              backgroundColor: '#a944b98b',
              transition: '.2s',
              '&:hover': {
                backgroundColor: '#a944b97a',
              },
            }}
          >
            Love this
          </Button>
          <Button
            variant='contained'
            endIcon={
              <Box display='flex' marginLeft={0.4}>
                <Typography>{post.commentCount}</Typography>
                <ChatBubbleOutlineIcon />
              </Box>
            }
            sx={{
              backgroundColor: '#447eb98a',
              transition: '.2s',
              '&:hover': {
                backgroundColor: '#447eb969',
              },
            }}
          >
            Comment it
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
