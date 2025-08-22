import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/shared/styles/global.css';
import { App } from '@/app/App';

const container = document.getElementById('root');
if (!container) throw new Error('Root container #root not found');
createRoot(container).render(<App />);
