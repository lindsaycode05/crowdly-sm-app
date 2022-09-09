import React, { useContext } from 'react';
import { IPost } from '../pages/Home';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { Avatar, Divider } from '@mui/material';
import images from '../images';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';

const PostCard = ({ post, idx }: { post: IPost; idx: number }) => {
  const { user } = useContext(AuthContext);

  return (
    <Card sx={{ marginBottom: 9 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Box display='flex' flexDirection='column'>
            <Typography textTransform='capitalize'>{post.username}</Typography>
            <Link
              to={`/posts/${post.id}`}
              style={{
                color: '#3333339f',
                textDecoration: 'none',
                marginTop: -3,
              }}
            >
              {moment(post.createdAt).fromNow(true)}
            </Link>
            <Typography marginTop={2} marginBottom={1.4}>
              {post.body}
            </Typography>
          </Box>
          <Box>
            <Avatar src={images[idx]} />
          </Box>
        </Box>
        <Divider />
        <Box display='flex' marginTop={1.5} gap={2}>
          <LikeButton post={post} user={user} />
          <Button
            component={Link}
            to={`/posts/${post.id}`}
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
          {/* @ts-ignore */}
          {user && user.username === post.username && (
            <DeleteButton postId={post.id} commentId={null} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
