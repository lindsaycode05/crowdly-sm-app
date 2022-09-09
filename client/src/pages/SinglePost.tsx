import { gql, useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import images from '../images';
import React, { useContext } from 'react';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';

const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const user = useContext(AuthContext);

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const deletePostCallback = () => {
    navigate('/');
  };

  let postJSX: JSX.Element;

  if (!data) {
    postJSX = <CircularProgress />;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data?.getPost;
    postJSX = (
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40%',
          marginInline: 'auto',
          marginTop: '45px',
          gap: '40px',
        }}
      >
        <Box>
          <Avatar src={images[Math.floor(Math.random() * 8)]} />
        </Box>
        <Box
          gap='15px'
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          alignItems='center'
          paddingY='8px'
        >
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='start'
            alignItems='start'
            width='100%'
          >
            <Typography>{username}</Typography>
            <Typography>{moment(createdAt).fromNow()}</Typography>
            <Typography marginTop='10px'>{body}</Typography>
          </Box>
          <Divider sx={{ width: '100%', borderColor: 'grey' }} />
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            gap='10px'
          >
            <Box display='flex' alignItems='center'>
              <LikeButton user={user} post={{ id, likes, likeCount }} />
              <Button
                variant='contained'
                endIcon={
                  <Box display='flex' marginLeft={0.4}>
                    <Typography>{commentCount}</Typography>
                    <ChatBubbleOutlineIcon />
                  </Box>
                }
                sx={{
                  backgroundColor: '#447eb98a',
                  transition: '.2s',
                  marginLeft:'5px',
                  '&:hover': {
                    backgroundColor: '#447eb969',
                  },
                }}
              >
                Comment it
              </Button>
            </Box>
            <Box>
              {/* // 
              @ts-ignore */}
              {user && user.user.username === username && (
                <DeleteButton
                  postId={id}
                  commentId=''
                  callback={() => deletePostCallback()}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Card>
    );
  }

  return postJSX;
};

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
