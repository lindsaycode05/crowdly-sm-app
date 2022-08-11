import { gql, useMutation } from '@apollo/client';
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { useForm } from '../util/use-form';

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data: any = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = '';
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Box component='form' onSubmit={onSubmit} marginRight={13} marginBottom={5}>
      <Typography textAlign='center' variant='h6' marginBottom={1} marginRight={.5}>Create a post:</Typography>
      <Box
        display='flex'
        flexDirection='column'
        width='25%'
        marginX='auto'
        gap={1}
      >
        <TextField
          placeholder='Create a new post'
          name='body'
          onChange={onChange}
          value={values.body}
          error={error ? true : false}
        />
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
