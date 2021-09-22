import { Button }                      from '@chakra-ui/button';
import { Box, ButtonGroup, SlideFade } from '@chakra-ui/react';

const { ipcRenderer, MACHINEID } = window.electron;

const testConfig: MinerConfiguration = {
  algo  : 'ergo',
  url   : 'stratum+ssl://eth-us-west.flexpool.io:5555',
  url1  : 'stratum+ssl://eth-us-east.flexpool.io:5555',
  user  : `0xCD9549630365731e6A40C25240467e782a9A80A9.${MACHINEID}`,
  user1 : `0xCD9549630365731e6A40C25240467e782a9A80A9.${MACHINEID}`,
};

// prettier-ignore
const requests: IpcActionReq[] = [
  {
    action : 'start',               request : null,
  },
  {
    action : 'stop',                request : null,
  },
  {
    action : 'update-miner-config', request : testConfig,
  },
  {
    action : 'get-miner-config',    request : null,
  },
  {
    action : 'reset-miner-config',  request : null,
  },
  {
    action : 'quit-app',            request : null,
  },
];

const DevButtons = () => {
  return (
    <ButtonGroup
      justify='center'
      borderRadius='md'
      colorScheme='teal'
      variant='outline'
      size='xs'
      flexDirection='column'
    >
      {requests.map((req) => {
        return (
          <Button
            key={req.action}
            onClick={() => {
              void ipcRenderer.invoke('async-message', req).then((reply) => {
                console.log(reply);
              });
            }}
          >
            {req.action}
          </Button>
        );
      })}
      <Button
        onClick={() => {
          const preferences = ipcRenderer.sendSync('sync-message', {
            action  : 'get-preferences',
            request : null,
          }) as Preferences;

          console.log(preferences);
        }}
      >
        Sync
      </Button>
    </ButtonGroup>
  );
};

const DebugPanel = ({ isOpen }: { isOpen: boolean }) => {
  // const user = useUserState();
  return (
    <SlideFade in={isOpen} offsetY='20px'>
      <Box p='40px' color='white' mt='4' bg='teal.500' rounded='md' shadow='md'>
        <DevButtons />
      </Box>
    </SlideFade>
  );
};

export default DebugPanel;
