export type IntegrationSettings = {
  github: {
    enabled: boolean;
  };
};

const DEFAULT_SETTINGS: IntegrationSettings = {
  github: {
    enabled: false,
  },
};

const LOCAL_STORAGE_KEY = 'basestation.integrations.settings.v1';

function canUseLocalStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function readIntegrationSettings(): IntegrationSettings {
  if (!canUseLocalStorage()) return DEFAULT_SETTINGS;

  const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) return DEFAULT_SETTINGS;

  try {
    const parsed = JSON.parse(raw) as Partial<IntegrationSettings>;
    return {
      github: {
        enabled: Boolean(parsed.github?.enabled),
      },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function writeIntegrationSettings(next: IntegrationSettings): void {
  if (!canUseLocalStorage()) return;
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
}

export function setGithubIntegrationEnabled(enabled: boolean): IntegrationSettings {
  const current = readIntegrationSettings();
  const next: IntegrationSettings = {
    ...current,
    github: {
      ...current.github,
      enabled,
    },
  };
  writeIntegrationSettings(next);
  return next;
}
