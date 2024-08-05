// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

import * as os from 'os';


declare global {
  interface Window {
    electronAPI: {
      homeDir: () => Promise<string>,
      osVersion: () => Promise<string>,
      arch: () => Promise<string>,
    }
  }
}



contextBridge.exposeInMainWorld('electronAPI', {

  homeDir: () => os.homedir(),

  osVersion: () => os.version(),

  arch: () => os.arch(),

  loadPreferences: () => ipcRenderer.invoke('load-prefs'),

  printComponent: async (url, callback) => {
    const response = await ipcRenderer.invoke('printComponent', url);
    callback(response);
  },

  previewComponent: async (url, callback) => {
    const response = await ipcRenderer.invoke("previewComponent", url);
    callback(response);
  },
});

