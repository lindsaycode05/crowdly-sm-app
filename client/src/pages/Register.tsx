import React, { useContext, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/use-form';

const Register = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      navigate('/');
    },
    onError(err: any) {
      setErrors([err?.graphQLErrors[0]?.extensions]);
    },
    variables: values,
  });

  // es5 function because it's hoisted so we can perform the registration
  function registerUser() {
    addUser();
  }

  return (
    <Box>
      {loading ? (
        <CircularProgress
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100% !important',
            position: 'absolute !important',
            right: 44,
            top: '50%',
          }}
        />
      ) : (
        <Box component='form' onSubmit={onSubmit}>
          <Typography
            variant='h5'
            textAlign='center'
            paddingY={4}
            paddingRight={11}
          >
            Register
          </Typography>
          <Box
            display='flex'
            flexDirection='column'
            width='40%'
            marginX='auto'
            gap={2}
            paddingRight={7}
          >
            <TextField
              label='Username'
              placeholder='Username..'
              name='username'
              type='text'
              value={values.username}
              error={errors?.username ? true : false}
              onChange={onChange}
            />
            <TextField
              label='Email'
              placeholder='Email..'
              name='email'
              type='email'
              value={values.email}
              error={errors?.email ? true : false}
              onChange={onChange}
            />
            <TextField
              label='Password'
              placeholder='Password..'
              name='password'
              type='password'
              value={values.password}
              error={errors?.password ? true : false}
              onChange={onChange}
            />
            <TextField
              label='Confirm Password'
              placeholder='Confirm Password..'
              name='confirmPassword'
              type='password'
              value={values.confirmPassword}
              error={errors?.confirmPassword ? true : false}
              onChange={onChange}
            />
            <Button
              type='submit'
              variant='contained'
              sx={{
                width: 'max-content',
                marginTop: 4,
                marginInline: 'auto',
                marginRight: '40%',
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
      )}
      <>
        {Object.keys(errors).length > 0 && (
          <Card
            sx={{ width: '40%', marginInline: 'auto', marginTop: 5 }}
            elevation={3}
          >
            <List>
              {Object.values(errors)?.map(({ errors }: any) => (
                <>
                  {errors.username && (
                    <ListItem key={errors.username}>{errors.username}</ListItem>
                  )}
                  {errors.email && (
                    <ListItem key={errors.email}>{errors.email}</ListItem>
                  )}
                  {errors.password && (
                    <ListItem key={errors.password}>{errors.password}</ListItem>
                  )}
                </>
              ))}
            </List>
          </Card>
        )}
      </>
    </Box>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
