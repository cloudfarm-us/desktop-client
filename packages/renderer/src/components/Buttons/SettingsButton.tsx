import { IconButton } from '@chakra-ui/react';
import { VscGear }    from 'react-icons/vsc';

export const SettingsButton = ({ openSettings }: {
  openSettings: () => void;
}) => {
  return (
    <IconButton
      size="xs"
      icon={<VscGear />}
      variant="outline"
      colorScheme="teal"
      aria-label="settings"
      onClick={openSettings}
    />
  );
};
