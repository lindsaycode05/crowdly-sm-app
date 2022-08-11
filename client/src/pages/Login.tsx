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

const Login = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      navigate('/');
    },
    onError(err: any) {
      setErrors([err?.graphQLErrors[0]?.extensions]);
    },
    variables: values,
  });

  // es5 function because it's hoisted so we can perform the registration
  function loginUserCallback() {
    loginUser();
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
        <>
          <Box component='form' onSubmit={onSubmit}>
            <Typography
              variant='h5'
              textAlign='center'
              paddingY={4}
              paddingRight={14}
            >
              Log In
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
                label='Password'
                placeholder='Password..'
                name='password'
                type='password'
                value={values.password}
                error={errors?.password ? true : false}
                onChange={onChange}
              />
              <Button
                type='submit'
                variant='contained'
                sx={{
                  width: 'max-content',
                  marginTop: 4,
                  marginInline: 'auto',
                  marginRight: '45%',
                }}
              >
                Log in
              </Button>
            </Box>
          </Box>
          <>
            {Object.keys(errors).length > 0 && (
              <Card
                sx={{
                  width: '40%',
                  marginInline: 'auto',
                  marginRight: '32%',
                  marginTop: 5,
                }}
                elevation={3}
              >
                <List>
                  {Object.values(errors)?.map(({ errors }: any) => (
                    <>
                      {errors.username && (
                        <ListItem key={errors.username}>
                          {errors.username}
                        </ListItem>
                      )}
                      {errors.password && (
                        <ListItem key={errors.password}>
                          {errors.password}
                        </ListItem>
                      )}
                    </>
                  ))}
                </List>
              </Card>
            )}
          </>
        </>
      )}
    </Box>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
