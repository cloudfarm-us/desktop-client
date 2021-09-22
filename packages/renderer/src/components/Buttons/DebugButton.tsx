import { IconButton } from '@chakra-ui/react';
import { GiRayGun }   from 'react-icons/gi';

export const DebugButton = ({ toggleDebugPanel }: {
  toggleDebugPanel: () => void;
}) => {
  return (
    <IconButton
      aria-label="toggle dev info"
      size="xs"
      icon={<GiRayGun />}
      variant="outline"
      colorScheme="teal"
      onClick={toggleDebugPanel}
    />
  );
};
