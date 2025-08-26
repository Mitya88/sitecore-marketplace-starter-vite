import { Flex, Stack, Text, Box, Code } from "@chakra-ui/react";
import { TenantProvider } from "../components/TenantContext";
import TenantSelector from "../components/TenantSelector";
import QueryComponent from "../components/QueryComponent";
import { useMarketplaceClientContext } from "../MarketplaceClientProvider";

export default function QueryExamplePage() {
  const { appContext } = useMarketplaceClientContext();

  return (
    <TenantProvider>
      <Stack spacing={6} p={8} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Query Example
        </Text>
        <Text fontSize="md" maxW="2xl" textAlign="center" color="gray.600">
          This page demonstrates how to run queries in the context of a selected
          tenant. Select a tenant below, enter a query, and view results. The
          right column provides details and code snippets for using{" "}
          <Code>QueryComponent</Code> and querying data via the Sitecore
          Marketplace SDK client.
        </Text>
        <Flex
          w="100%"
          maxW="1200px"
          gap={8}
          align="flex-start"
          direction={{ base: "column", md: "row" }}
        >
          <Box flex={1} minW={300}>
            <Stack spacing={6}>
              <TenantSelector resourceAccess={appContext?.resourceAccess} />
              <QueryComponent />
            </Stack>
          </Box>
          <Box
            flex={1}
            minW={300}
            bg="gray.50"
            p={6}
            borderRadius={8}
            boxShadow="md"
          >
            <Text fontWeight="semibold" mb={2}>
              How to Query Data
            </Text>
            <Text fontSize="sm" color="gray.700" mb={2}>
              <Code>QueryComponent</Code> uses the Sitecore Marketplace SDK
              client to run GraphQL queries in the context of the selected
              tenant. The query is sent via <Code>client.mutate</Code> and
              results are displayed as raw JSON.
            </Text>
            <Text fontSize="sm" color="gray.700" mb={2}>
              <strong>Example code:</strong>
            </Text>
            <Code
              p={2}
              borderRadius={6}
              bg="gray.100"
              fontSize="sm"
              display="block"
              whiteSpace="pre"
            >
              {`const handleQuery = async () => {
  const sitecoreContextId = selectedTenant.context.preview;
  const response = await client?.mutate("xmc.authoring.graphql", {
    params: {
      query: { sitecoreContextId },
      body: {
        query: \`query { item(where: { database: \\"master\\", path: \\"\${query}\\" }) 
        { children 
         { 
            nodes 
                { 
                    itemId 
                    name 
                    path 
                    hasChildren 
                    template{name} 
                    updated:field(name:\\"__Updated\\"){value} 
                    updatedBy:field(name:\\"__Updated By\\"){value} 
                    workflow{workflowState{displayName final}} 
                } 
            } 
        } 
    }\`
      },
    },
  });
  // Handle response and errors
};
`}
            </Code>
            <Text fontSize="sm" color="gray.700" mt={2}>
              <strong>Hints:</strong>
            </Text>
            <Stack fontSize="sm" color="gray.700" pl={4}>
              <Text>
                - Always check that a tenant is selected before running a query.
              </Text>
              <Text>
                - Use strong types for query results to improve reliability.
              </Text>
              <Text>- Show loading and error states for better UX.</Text>
              <Text>
                - Display results as raw JSON for debugging, or format as
                needed.
              </Text>
              <Text>
                - You can extend <Code>QueryComponent</Code> to support more
                query types and result views.
              </Text>
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </TenantProvider>
  );
}
