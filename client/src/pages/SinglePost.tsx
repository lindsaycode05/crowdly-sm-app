import { gql, useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import images from '../images';
import React, { useContext, useRef, useState } from 'react';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';

const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const commentInputRef = useRef<any>(null);

  const [comment, setComment] = useState('');

  const user = useContext(AuthContext);

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef?.current.blur();
    },
    variables: {
      postId,
      body: comment,
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
          width: '60%',
          marginInline: 'auto',
          marginTop: '45px',
          gap: '60px',
          paddingInline: '18px',
        }}
      >
        <Box width='85px' height='85px'>
          <Avatar
            sx={{
              width: '85px',
              height: '85px',
            }}
            src={images[0]}
          />
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
                  marginLeft: '5px',
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
                  callback={deletePostCallback}
                  commentId={null}
                />
              )}
            </Box>
          </Box>
          <Box display='flex' flexDirection='column' width='100%'>
            {user && (
              <Box display='flex' flexDirection='column'>
                <Typography>Post a comment</Typography>
                <Box display='flex' flexDirection='column'>
                  <TextField
                    type='text'
                    placeholder='Comment..'
                    name='comment'
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    ref={commentInputRef}
                  />
                  <Button
                    type='submit'
                    disabled={comment.trim() === ''}
                    onClick={() => submitComment()}
                    sx={{ marginTop: '6px' }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
            {comments.length !== 0 && (
              <Typography variant='h6'>Comments:</Typography>
            )}
            {comments.map((comment: any) => (
              <Box marginTop='14px'>
                <Typography>{comment.username}</Typography>
                <Typography color='#888' marginTop='-4px'>
                  {moment(comment.createdAt).fromNow()}
                </Typography>
                <Box display='flex' alignItems='center' gap='50%'>
                  <Typography width='100%'>{comment.body}</Typography>
                  {/* // 
                @ts-ignore */}
                  {user && user.user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                </Box>
                <Divider sx={{ width: '100%', borderColor: 'grey' }} />
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    );
  }

  return postJSX;
};

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

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
