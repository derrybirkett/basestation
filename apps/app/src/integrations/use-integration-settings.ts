import { useCallback, useEffect, useState } from 'react';
import {
  readIntegrationSettings,
  setGithubIntegrationEnabled,
  type IntegrationSettings,
} from './integration-settings';

export type UseIntegrationSettingsValue = {
  settings: IntegrationSettings;
  setGithubEnabled: (enabled: boolean) => void;
};

export function useIntegrationSettings(): UseIntegrationSettingsValue {
  const [settings, setSettings] = useState<IntegrationSettings>(() =>
    readIntegrationSettings(),
  );

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key && !event.key.startsWith('basestation.integrations.')) return;
      setSettings(readIntegrationSettings());
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setGithubEnabled = useCallback((enabled: boolean) => {
    const next = setGithubIntegrationEnabled(enabled);
    setSettings(next);
  }, []);

  return {
    settings,
    setGithubEnabled,
  };
}
