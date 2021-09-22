import { Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Spacer,
  VStack } from '@chakra-ui/react';
import { DEFAULT_PREFERENCES }                     from 'DEFAULTS';
import { FieldGroup, IntegerInput, LabeledSwitch } from 'components';
import { SubmitHandler, useForm }                  from 'react-hook-form';
import { BiReset }                                 from 'react-icons/bi';
import { FaSave }                                  from 'react-icons/fa';

const { ipcRenderer } = window.electron;

const PREFERENCES: Array<[keyof Preferences, string]> = [
  ['preventSystemSuspending', 'Prevent the system from sleeping'],
  ['startMinerWhenIdle', 'Start miner when computer is idle'],
  ['stopMinerWhenActive', 'Stop miner while computer is in use'],
  ['mineOnBattery', 'Mine on battery'],
  ['startOnBoot', 'Start client on login'],
  ['startMinimized', 'Start client minimized'],
];

type FormProps = {
  values: Preferences;
  setValues: (newPrefs: Preferences) => void;
};

export const PreferencesForm = (props: FormProps) => {
  type PreferencesFormTypes = {
    reset: boolean;
  } & Preferences;

  const Form = (submission: FormProps) => {
    const {
      register,
      handleSubmit,
      formState: { isSubmitting },
      setValue,
    } = useForm<PreferencesFormTypes>({
      defaultValues : {
        ...submission.values, reset : false,
      },
    });

    const updatePreferences = async (newPref: Preferences) => {
      const request: IpcActionReq = {
        action  : 'update-preferences',
        request : newPref,
      };
      // prettier-ignore
      return ipcRenderer.invoke('async-message', request);
    };

    const resetPreferences = async () => {
      const request: IpcActionReq = {
        action  : 'reset-preferences',
        request : null,
      };
      // prettier-ignore
      return ipcRenderer.invoke('async-message', request);
    };

    const onSubmit: SubmitHandler<PreferencesFormTypes> = async (data) => {
      const { reset, ...preferences } = data;
      if (reset) {
        const reply = (await resetPreferences()) as IpcActionRes;
        if (reply.response.status === 'ok') {
          props.setValues(DEFAULT_PREFERENCES);
        }
      } else {
        const reply = (await updatePreferences(preferences)) as IpcActionRes;
        if (reply.response.status === 'ok') {
          props.setValues(preferences);
        }
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing='3'>
          {PREFERENCES.map((pref) => {
            return (
              <LabeledSwitch
                key={pref[0]}
                registerReturn={register(pref[0])}
                switchProps={{
                  size           : 'sm',
                  id             : pref[0],
                  defaultChecked : props.values[pref[0]!] as unknown as boolean,
                }}
                label={pref[1]}
                controlProps={{
                  display    : 'flex',
                  alignItems : 'center',
                }}
              />
            );
          })}

          <IntegerInput
            label='Idle time threshold (min)'
            controlProps={{
              flex    : 1,
              flexDir : 'row',
              as      : HStack,
            }}
            registerReturn={register('idleThreshold', {
              valueAsNumber : true,
            })}
            numberInputProps={{
              defaultValue : props.values.idleThreshold,
              min          : 1,
              size         : 'sm',
            }}
          />

          <Flex w='100%' my='3' justifyContent='space-between'>
            <Button
              size='sm'
              leftIcon={<BiReset />}
              colorScheme='red'
              m='auto'
              type='submit'
              {...register('reset', {
                value : false,
              })}
              isLoading={isSubmitting}
              onClick={() => {
                setValue('reset', true);
              }}
            >
              Preferences
            </Button>
            <Spacer />
            <Button
              colorScheme='teal'
              type='submit'
              size='sm'
              my='3'
              leftIcon={<Icon as={FaSave} />}
              isLoading={isSubmitting}
            >
              Save
            </Button>
          </Flex>
        </VStack>
      </form>
    );
  };

  return (
    <FieldGroup py='0' description='Manage your local client settings'>
      <Box flex='1'>
        <Divider borderColor='currentcolor' my='3' />
        <Form {...props} />
      </Box>
    </FieldGroup>
  );
};
