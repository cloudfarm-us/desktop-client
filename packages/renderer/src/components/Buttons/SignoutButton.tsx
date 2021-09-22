import { Button }       from '@chakra-ui/react';
import { getAuth }      from 'firebase/auth';
import { useUserState } from 'models/User';
import { FaSignOutAlt } from 'react-icons/fa';

export const SignoutButton = () => {
  const auth = getAuth();
  const userState = useUserState();
  return (
    <Button
      size='sm'
      leftIcon={<FaSignOutAlt />}
      colorScheme='red'
      m='auto'
      disabled={!userState}
      onClick={() => {
        void auth.signOut();
      }}
    >
      Signout
    </Button>
  );
};
