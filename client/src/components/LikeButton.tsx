import React, { useEffect, useState } from 'react';
import { IPost } from '../pages/Home';
import { Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Box, Button, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeButton = ({ post, user }: { post: IPost; user: any }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (user && post.likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, post.likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: post.id },
  });

  const likeButton = user ? (
    liked ? (
      <Button
        onClick={() => likePost()}
        variant='contained'
        endIcon={
          <Box display='flex' marginLeft={0.4}>
            <Typography>{post.likeCount}</Typography>
            <FavoriteBorderIcon />
          </Box>
        }
        sx={{
          backgroundColor: '#d0326cc1',
          transition: '.2s',
          '&:hover': {
            backgroundColor: '#d0326c8e',
          },
        }}
      >
        Love this
      </Button>
    ) : (
      <Button
        onClick={() => likePost()}
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
            backgroundColor: '#a944b969',
          },
        }}
      >
        Love this
      </Button>
    )
  ) : (
    <Button
      component={Link}
      to='login'
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
          backgroundColor: '#a944b969',
        },
      }}
    >
      Love this
    </Button>
  );

  return likeButton;
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
