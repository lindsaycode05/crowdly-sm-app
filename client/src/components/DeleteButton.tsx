import React from 'react';
import { gql, useMutation } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { IPost } from '../pages/Home';

const DeleteButton = ({
  postId,
  commentId,
  callback,
}: {
  postId: string;
  commentId: string | null;
  callback?: () => void;
}) => {
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      if (commentId !== null) {
        const data: any = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        data.getPosts = data.getPosts.filter((p: IPost) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <IconButton onClick={() => deletePostOrMutation()}>
      <DeleteIcon sx={{ color: '#d14040' }} />
    </IconButton>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
