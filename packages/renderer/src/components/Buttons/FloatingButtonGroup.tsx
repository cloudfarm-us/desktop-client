import type { ButtonGroupProps } from '@chakra-ui/react';
import { ButtonGroup }           from '@chakra-ui/react';

import { ColorModeButton }       from './ColorModeButton';
import { DebugButton }           from './DebugButton';
import { SettingsButton }        from './SettingsButton';

type FloatingButtonGroupProps = {
  onOpenSettings: () => void;
  toggleDebugPanel?: () => void;
  properties?: Partial<ButtonGroupProps>;
};

export const FloatingButtonGroup = (
  props: FloatingButtonGroupProps,
): JSX.Element => {
  if (import.meta.env.MODE === 'development' && props.toggleDebugPanel) {
    return (
      <ButtonGroup pos='fixed' left='3' top='3' {...props.properties}>
        <SettingsButton openSettings={props.onOpenSettings} />
        <ColorModeButton />
        <DebugButton toggleDebugPanel={props.toggleDebugPanel} />
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup pos='fixed' left='3' top='3' {...props.properties}>
      <SettingsButton openSettings={props.onOpenSettings} />
      <ColorModeButton />
    </ButtonGroup>
  );
};
