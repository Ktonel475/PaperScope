import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom'
import './index.css'


const theme = createTheme({
  components: {
    Button: {
      styles: {
        root: {
          transition: 'background-color 0.3s ease-in-out',
        },
      },
    },
  },
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
