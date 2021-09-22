import { Button }            from '@chakra-ui/react';
import { useUserState }      from 'models/User';
import { FaUnlink }          from 'react-icons/fa';
import { useState }          from 'react';
import { updateUserDataDoc } from 'services/Firebase';

export const UnlinkButton = () => {
  const { MACHINEID } = window.electron;
  const [isLoading, setLoading] = useState(false);

  const user = useUserState();
  const rigs = user ? user.rigs : {
    rigs : {
    },
  };
  const isLinked = user && MACHINEID in user.rigs;

  if (user) {
    return (
      <Button
        size='sm'
        leftIcon={<FaUnlink />}
        colorScheme='red'
        m='auto'
        isLoading={isLoading}
        disabled={!isLinked}
        onClick={() => {
          setLoading(true);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { [MACHINEID]: currentRig, ...rest } = rigs as any;
          updateUserDataDoc(user.uid, {
            rigs : rest as Record<string, Rig>,
          })
            .then(() => {
              setLoading(false);
            })
            .catch(console.error);
        }}
      >
        Unlink
      </Button>
    );
  }

  return (
    <Button
      disabled
      size='sm'
      leftIcon={<FaUnlink />}
      colorScheme='red'
      m='auto'
    >
      Unlink
    </Button>
  );
};
