import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MarketplaceClientProvider } from './MarketplaceClientProvider';
import sitecoreTheme, { toastOptions } from '@sitecore/blok-theme'
import { ChakraProvider } from '@chakra-ui/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={sitecoreTheme} toastOptions={toastOptions}>
      <MarketplaceClientProvider>
        <App />
      </MarketplaceClientProvider>
    </ChakraProvider>
  </StrictMode>,
)
