import { Button, Text, VStack }  from '@chakra-ui/react';
import { yupResolver }           from '@hookform/resolvers/yup';
import { ControlledInput, Logo } from 'components';
import { useUserState }          from 'models/User';
import { useForm }               from 'react-hook-form';
import { useHistory }            from 'react-router';
import { MACHINEID }             from 'services/Electron';
import { updateUserDataDoc }     from 'services/Firebase';
import * as yup                  from 'yup';

type RegisterFormInputs = {
  rigName: string;
};

const Unlinked = () => {
  const user = useUserState();
  const { rigs } = user!;
  const history = useHistory();

  const schema = yup.object().shape({
    rigName : yup
      .string()
      .ensure()
      .min(2)
      .matches(/^[\dA-Za-z-]{2,32}$/)
      .required()
      .notOneOf(Object.values(rigs).map(({ rigName }) => rigName)),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    mode     : 'onBlur',
    resolver : yupResolver(schema),
  });

  const onSubmit = async ({ rigName }: RegisterFormInputs) => {
    // const updatedRigs = {
    //   ...rigs,
    //   [MACHINEID] : {
    //     rigName, rigID : MACHINEID,
    //   },
    // };

    // const updatedRigs = {
    //   rigs : ,
    // };

    const newRig = {
      [MACHINEID] : {
        rigName, rigID : MACHINEID,
      },
    };

    const updatedRigs = { ...newRig, ...rigs };
    await updateUserDataDoc(user!.uid, { rigs: updatedRigs });

    history.push('/');
  };

  return (
    <VStack as='form' onSubmit={handleSubmit(onSubmit)}>
      <Logo mx='auto' h='75' mb={{
        base : '10', md : '20',
      }} />
      <Text>Let&apos;s link your rig. Give it an awesome name below.</Text>

      <ControlledInput
        controlProps={{
          p : '4', isRequired : true,
        }}
        inputProps={{
          type        : 'text',
          name        : 'rigName',
          placeholder : 'My-Awesome-Rig-Name',
        }}
        label='Rig Name'
        message={errors?.rigName?.message}
        helperText="Any name will do as long as it's unique to your rigs"
        registerReturn={register('rigName')}
      />

      <Button
        type='submit'
        colorScheme='blue'
        disabled={Boolean(errors.rigName)}
      >
        Link this rig
      </Button>
    </VStack>
  );
};

export default Unlinked;
