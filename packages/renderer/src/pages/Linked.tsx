import { Icon, Link, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { Logo }                                        from 'components';
import { useUserState }                                from 'models/User';
import { FiExternalLink }                              from 'react-icons/fi';
import { MACHINEID }                                   from 'services/Electron';

const Linked = () => {
  const linkHover = useColorModeValue('blue.600', 'blue.300');
  const linkColor = useColorModeValue('blue.500', 'blue.200');
  const userData = useUserState();

  const { rigs } = userData ?? {
    rigs : {
    },
  };

  return (
    <VStack textAlign='center'>
      <Logo mx='auto' h='75' mb={{
        base : '10', md : '20',
      }} />
      <Text>{rigs[MACHINEID].rigName} is ready to go!</Text>
      <br />
      <Text>
        Setup is complete. Your rig will begin mining once it is left idle for 1
        minute.
      </Text>
      <br />
      <Text>
        Close out of this desktop app anytime. App settings can be changed in
        the above settings tab. Your miner dashboard can be viewed on your
        browser.
      </Text>
      <br />
      <Link
        isExternal
        href='https://cloudfarm.us/dashboard'
        color={linkColor}
        _hover={{
          color : linkHover,
        }}
      >
        View your rig&apos;s progress <Icon as={FiExternalLink} mx='2px' />
      </Link>
    </VStack>
  );
};

export default Linked;
