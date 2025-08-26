import { Stack, Text, Box } from "@chakra-ui/react";
import TenantSelector from "../components/TenantSelector";
import SitesSelector from "../components/SitesSelector";
import { useMarketplaceClientContext } from "../MarketplaceClientProvider";
import { TenantProvider } from "../components/TenantContext";

export default function SitesByTenantPage() {
  const { appContext } = useMarketplaceClientContext();

  return (
    <TenantProvider>
      <Stack spacing={6} p={8} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Sites by Tenant
        </Text>
        <Text fontSize="md" maxW="2xl" textAlign="center" color="gray.600">
          This page demonstrates how to list sites for the selected tenant. This
          is useful when your app has access to multiple tenants and sites,
          allowing users to select the working tenant and site for context-aware
          operations.
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
          <SitesSelector />
        </Box>
      </Stack>
    </TenantProvider>
  );
}
