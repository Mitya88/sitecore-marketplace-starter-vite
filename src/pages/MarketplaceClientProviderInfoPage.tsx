import { Stack, Text, Box, Code } from "@chakra-ui/react";

export default function MarketplaceClientProviderInfoPage() {
  return (
    <Stack spacing={6} p={8} align="center">
      <Text fontSize="2xl" fontWeight="bold">
        Using MarketplaceClientProvider
      </Text>
      <Box w="100%" maxW="900px" mb={4}>
        <Text fontSize="lg" fontWeight="semibold" mb={2}>
          What is <Code>MarketplaceClientProvider</Code>?
        </Text>
        <Text fontSize="sm" color="gray.700" mb={2}>
          <Code>MarketplaceClientProvider</Code> is a{" "}
          <strong>custom implementation</strong> in this starter app. It wraps
          the Sitecore Marketplace SDK client logic in a React context provider,
          making the client and application context available throughout your
          app. This approach is not part of the official SDK, but demonstrates a
          recommended pattern for integrating the SDK in React applications.
        </Text>
        <Text fontSize="sm" color="gray.700" mb={2}>
          It also fetches the application context and exposes loading and error
          states. Wrap your app with this provider at the root level (e.g., in{" "}
          <Code>main.tsx</Code>).
        </Text>
        <Text fontSize="sm" color="gray.700" mb={2}>
          <strong>Example usage:</strong>
        </Text>
        <Code
          p={2}
          borderRadius={6}
          bg="gray.100"
          fontSize="sm"
          display="block"
          whiteSpace="pre"
        >
          {`// main.tsx
<MarketplaceClientProvider>
  <App />
</MarketplaceClientProvider>

// In a component
import { useMarketplaceClientContext } from './MarketplaceClientProvider';

const { client, appContext, appContextLoading, appContextError } = useMarketplaceClientContext();

// Use client to make queries/mutations
// Use appContext for app metadata
`}
        </Code>
        <Text fontSize="sm" color="gray.700" mt={2}>
          <strong>Use cases:</strong>
        </Text>
        <Stack fontSize="sm" color="gray.700" pl={4}>
          <Text>
            - Access the initialized Marketplace SDK client anywhere in your
            app.
          </Text>
          <Text>- Fetch and display application context and metadata.</Text>
          <Text>- Handle loading and error states for client and context.</Text>
          <Text>
            - Make queries and mutations to Sitecore APIs using the client.
          </Text>
          <Text>
            - Build dashboards, settings pages, or integrations that depend on
            Sitecore context.
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
}
