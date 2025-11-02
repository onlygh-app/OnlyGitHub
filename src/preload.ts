// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  github: {
    fetchExploreRepos: (token: string) => ipcRenderer.invoke('fetch-explore-repos', token),
    fetchTrendingRepos: (token: string) => ipcRenderer.invoke('fetch-trending-repos', token),
  },
});