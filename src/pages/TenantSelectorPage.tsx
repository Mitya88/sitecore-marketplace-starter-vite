import { Stack, Text, Box, Code } from "@chakra-ui/react";
import TenantSelector from "../components/TenantSelector";
import TenantInfo from "../components/TenantInfo";
import { useMarketplaceClientContext } from "../MarketplaceClientProvider";
import { TenantProvider } from "../components/TenantContext";

export default function TenantSelectorPage() {
  const { appContext } = useMarketplaceClientContext();

  return (
    <TenantProvider>
      <Stack spacing={6} p={8} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Tenant Selector Demo
        </Text>
        <Text fontSize="md" maxW="2xl" textAlign="center" color="gray.600">
          In a standalone Sitecore Marketplace app, you may have access to
          multiple tenants. It's important for users to select which tenant is
          the current working one, and for this selection to be shared across
          components. This page demonstrates a custom React context (
          <Code>TenantContext</Code>) for managing tenant selection.
        </Text>
        <Text fontSize="md" maxW="2xl" textAlign="center" color="gray.600">
          Use the <Code>TenantSelector</Code> component below to choose a
          tenant. <Code>TenantInfo</Code> will display all details about the
          selected tenant, but only when one is selected.
        </Text>
        <Box
          w="100%"
          maxW="400px"
          p={6}
          bg="gray.50"
          borderRadius={8}
          boxShadow="md"
        >
          <TenantSelector resourceAccess={appContext?.resourceAccess} />
          <TenantInfo />
        </Box>
        <Box w="100%" maxW="700px" mt={8}>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Usage Example
          </Text>
          <Code
            p={2}
            borderRadius={6}
            bg="gray.100"
            fontSize="sm"
            display="block"
            whiteSpace="pre"
          >
            {`// Wrap your app with TenantProvider
<TenantProvider>
  <App />
</TenantProvider>

// In a component
import { useTenantContext } from './components/TenantContext';

const { selectedTenant, setSelectedTenant } = useTenantContext();
`}
          </Code>
          <Text fontSize="sm" color="gray.700" mt={2}>
            <strong>Component details & use cases:</strong>
          </Text>
          <Stack fontSize="sm" color="gray.700" pl={4}>
            <Text>
              - <Code>TenantSelector</Code> uses a dropdown to select a tenant
              and stores the full tenant object in context.
            </Text>
            <Text>
              - <Code>TenantInfo</Code> reads <Code>selectedTenant</Code> from
              context and renders all its details. It only renders if a tenant
              is selected.
            </Text>
            <Text>
              - <Code>TenantContext</Code> uses <Code>useMemo</Code> to optimize
              context value updates, ensuring components only re-render when the
              tenant changes.
            </Text>
            <Text>
              - This pattern is useful for passing complex objects, sharing
              state, and avoiding unnecessary renders in large apps.
            </Text>
            <Text>
              - Use this approach to pass selected tenant to API calls,
              context-aware components, or display tenant-specific dashboards.
            </Text>
          </Stack>
        </Box>
      </Stack>
    </TenantProvider>
  );
}
