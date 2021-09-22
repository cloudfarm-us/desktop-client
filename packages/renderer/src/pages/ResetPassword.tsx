import { Button,
  ButtonGroup,
  Divider,
  Icon,
  Stack,
  useToast } from '@chakra-ui/react';
import { ControlledInput }        from 'components';
import { useForm }                from 'react-hook-form';
import { IoArrowBackOutline }     from 'react-icons/io5';
import { useHistory }             from 'react-router-dom';
import { sendPasswordResetEmail } from 'services/Firebase';

type SignupFormInputs = {
  email: string;
};

const ResetPassword = (): JSX.Element => {
  const history = useHistory();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SignupFormInputs>({
    mode : 'onBlur',
  });

  const toast = useToast();

  const onSubmit = async ({ email }: SignupFormInputs) => {
    try {
      if (email) {
        await sendPasswordResetEmail(email);
        toast({
          title      : 'Password reset sent! You should receive an email shortly...',
          status     : 'success',
          duration   : 3000,
          isClosable : true,
        });
      }
    } catch (error: unknown) {
      const { code } = error as Error & { code: string };
      toast({
        title       : 'Error...!',
        status      : 'error',
        duration    : 3000,
        isClosable  : true,
        description : code ? JSON.stringify(code) : JSON.stringify(error),
      });
    }
  };

  return (
    <Stack spacing='6' as='form' onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        registerReturn={register('email')}
        message={errors?.email?.message}
        controlProps={{
          p : '2', isRequired : true,
        }}
        inputProps={{
          type        : 'email',
          placeholder : 'user@example.com',
          name        : 'email',
        }}
        label='Email Address'
      />
      <Divider />

      <ButtonGroup size='lg' colorScheme='blue' fontSize='md' w='100%'>
        <Button
          aria-label='go back'
          variant='outline'
          onClick={() => {
            history.push('/');
          }}
        >
          <Icon as={IoArrowBackOutline} />
        </Button>

        <Button type='submit' disabled={Boolean(errors.email)} w='100%'>
          Email me
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default ResetPassword;
