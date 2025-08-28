import { Stack, Text, Box } from "@chakra-ui/react";
import TenantSelector from "../components/TenantSelector";
import { TenantProvider } from "../components/TenantContext";
import { useMarketplaceClientContext } from "../MarketplaceClientProvider";
import MutationWizardModal from "../components/mutationWizard/MutationWizardModal";

function MutationExamplesPage() {
  const { appContext } = useMarketplaceClientContext();
  return (
    <TenantProvider>
      <Stack spacing={6} p={8} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Mutation Examples
        </Text>
        <Text fontSize="md" maxW="2xl" textAlign="center" color="gray.600">
          This page will showcase mutation examples using the Sitecore
          Marketplace SDK. Select a tenant to begin.
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
        </Box>
        <Box mt={8}>
          <MutationWizardModal />
        </Box>
      </Stack>
    </TenantProvider>
  );
}

export default MutationExamplesPage;
