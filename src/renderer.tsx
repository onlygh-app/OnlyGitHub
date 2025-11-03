/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 */

import './index.scss';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('app');

if (!container) {
  throw new Error('Failed to find the root element');
}

try {
  const root = createRoot(container);
  root.render(<App />);
  console.log('OnlyGitHub React app initialized successfully');
} catch (error) {
  console.error('Failed to render OnlyGitHub app:', error);
}
