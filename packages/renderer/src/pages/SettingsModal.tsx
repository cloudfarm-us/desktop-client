import { Modal, PreferencesForm } from 'components';
import { useState }               from 'react';

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const { ipcRenderer } = window.electron;

export const SettingsModal = (props: SettingsModalProps) => {
  const preferences = ipcRenderer.sendSync('sync-message', {
    action  : 'get-preferences',
    request : null,
  }) as Preferences;

  const [pref, setPre] = useState<Preferences>(preferences);

  return (
    <Modal isOpen={props.isOpen} title='Settings' onClose={props.onClose}>
      <PreferencesForm values={pref} setValues={setPre} />
    </Modal>
  );
};

export default SettingsModal;
