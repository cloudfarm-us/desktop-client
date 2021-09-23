import { Box, Button, FormControl, Heading, Icon, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { ControlledInput, Logo, PasswordField }                                          from 'components';
import { useForm }                                                                       from 'react-hook-form';
import { FaExternalLinkAlt }                                                             from 'react-icons/fa';
import { useHistory }                                                                    from 'react-router-dom';
import { signInWithEmailAndPassword }                                                    from 'services/Firebase';

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = (): JSX.Element => {
  const history = useHistory();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<LoginFormInputs>({
    mode : 'onBlur',
  });

  const onSubmit = async ({ email, password }: LoginFormInputs) => {
    await signInWithEmailAndPassword(email, password).catch(console.error);
  };

  return (
    <Stack spacing='6' as='form' onSubmit={handleSubmit(onSubmit)}>
      <Box
        bg={useColorModeValue('gray.50', 'inherit')}
        minH='10vh'
        py='0'
        px={{
          base : '4', lg : '8',
        }}
      >
        <Box maxW='md' mx='auto'>
          <Logo mx='auto' h='75' mb={{
            base : '10', md : '20',
          }} />
          <Heading textAlign='center' size='xl' fontWeight='extrabold'>
            Welcome to Cloudfarm Desktop
          </Heading>
          <Text mx='auto' align='center' as='i' color='gray.500'>
            <Text>This is where the magic happens...</Text>
          </Text>

          <Text mt='4' mb='8' align='center' maxW='md' fontWeight='medium'>
            <Text as='span'>Don&apos;t have an account?</Text>{' '}
            <Link isExternal href='https://cloudfarm.us'>
              Register here <Icon as={FaExternalLinkAlt} />
            </Link>
          </Text>

          <Stack spacing='6'>
            <FormControl id='email'>
              <ControlledInput
                registerReturn={register('email')}
                message={errors?.email?.message}
                controlProps={{
                  p : '2',
                }}
                inputProps={{
                  type         : 'email',
                  placeholder  : 'user@example.com',
                  autoComplete : 'email',
                  name         : 'email',
                  size         : 'md',
                }}
                label='Email Address'
              />
            </FormControl>
            <PasswordField
              registerReturn={register('password')}
              message={errors?.password?.message ?? ''}
              controlProps={{
                px : '2', pb : '2',
              }}
              inputProps={{
                placeholder  : 'Password',
                name         : 'password',
                autoComplete : 'current-password',
                size         : 'md',
              }}
              label='Password'
              saveSpace={false}
              forgotPasswordNav={() => {
                history.push('/reset-password');
              }}
            />
            <Button
              type='submit'
              colorScheme='blue'
              size='lg'
              fontSize='md'
              isLoading={isSubmitting}
            >
              Sign in
            </Button>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default Login;
