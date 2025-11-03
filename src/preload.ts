// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  github: {
    fetchExploreRepos: (token: string, page: number = 1) => ipcRenderer.invoke('fetch-explore-repos', token, page),
    fetchTrendingRepos: (token: string, page: number = 1) => ipcRenderer.invoke('fetch-trending-repos', token, page),
    fetchUserInfo: (token: string) => ipcRenderer.invoke('fetch-user-info', token),
    fetchUserRepos: (token: string, page: number = 1) => ipcRenderer.invoke('fetch-user-repos', token, page),
  },
});