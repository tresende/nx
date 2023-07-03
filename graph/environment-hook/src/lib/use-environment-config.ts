/* eslint-disable @nx/enforce-module-boundaries */
// nx-ignore-next-line
import type { ProjectGraphClientResponse } from 'nx/src/command-line/graph/graph';
/* eslint-enable @nx/enforce-module-boundaries */
import { useRef } from 'react';

export interface AppConfig {
  showDebugger: boolean;
  showExperimentalFeatures: boolean;
  workspaces: WorkspaceData[];
  defaultWorkspaceId: string;
}

export interface WorkspaceData {
  id: string;
  label: string;
  projectGraphUrl: string;
  taskGraphUrl: string;
  workspaceRoot?: string;
}

export function useEnvironmentConfig(): {
  exclude: string[];
  watch: boolean;
  localMode: 'serve' | 'build';
  projectGraphResponse?: ProjectGraphClientResponse;
  environment: 'dev' | 'watch' | 'release' | 'nx-console';
  appConfig: AppConfig;
  useXstateInspect: boolean;
} {
  const environmentConfig = useRef(getEnvironmentConfig());

  return environmentConfig.current;
}

export function getEnvironmentConfig() {
  return {
    exclude: window.exclude,
    watch: window.watch,
    localMode: window.localMode,
    projectGraphResponse: window.projectGraphResponse,
    environment: window.environment,
    appConfig: {
      ...window.appConfig,
      showExperimentalFeatures:
        localStorage.getItem('showExperimentalFeatures') === 'true'
          ? true
          : window.appConfig.showExperimentalFeatures,
    },
    useXstateInspect: window.useXstateInspect,
  };
}
