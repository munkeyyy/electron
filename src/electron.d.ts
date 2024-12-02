interface ElectronAPI {
  ping: () => Promise<string>;
  getScreenSources: () => Promise<any[]>;
  testIPC: () => Promise<any>;
}

declare interface Window {
  electronAPI: ElectronAPI;
} 