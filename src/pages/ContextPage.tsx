import { Stack, Text, Flex, Box } from "@chakra-ui/react";
import { useMarketplaceClientContext } from "../MarketplaceClientProvider";

export default function ContextPage() {
  const { appContext, appContextLoading, appContextError } =
    useMarketplaceClientContext();

  return (
    <Stack spacing={6} p={8} align="center">
      <Text fontSize="2xl" fontWeight="bold">
        Application Context
      </Text>
      <Text fontSize="md" maxW="2xl" textAlign="center" color="gray.600">
        The Application Context provides metadata and configuration about your
        app as registered in the Sitecore Marketplace. It typically includes
        details such as the app name, environment, permissions, deployment URL,
        and other settings. This information is useful for debugging,
        integration, and understanding how your app is configured within the
        Sitecore ecosystem.
      </Text>

      {appContextLoading && <Text>Loading application context...</Text>}
      {appContextError && (
        <Text color="red.500">Error: {appContextError.message}</Text>
      )}
      {appContext && (
        <Flex
          w="100%"
          maxW="1200px"
          gap={8}
          align="flex-start"
          direction={{ base: "column", md: "row" }}
        >
          <Box flex={1}>
            <Text fontWeight="semibold" mb={2}>
              Rendered Version
            </Text>
            <Stack
              spacing={2}
              align="flex-start"
              w="100%"
              bg="gray.50"
              p={6}
              borderRadius={8}
              boxShadow="md"
            >
              {Object.entries(appContext).map(([key, value]) => (
                <Text key={key} fontSize="sm">
                  <strong>{key}:</strong>{" "}
                  {typeof value === "object"
                    ? JSON.stringify(value, null, 2)
                    : String(value)}
                </Text>
              ))}
            </Stack>
          </Box>
          <Box flex={1}>
            <Text fontWeight="semibold" mb={2}>
              Raw JSON
            </Text>
            <Box
              as="pre"
              w="100%"
              bg="gray.900"
              color="gray.100"
              p={6}
              borderRadius={8}
              boxShadow="md"
              fontSize="sm"
              overflowX="auto"
            >
              {JSON.stringify(appContext, null, 2)}
            </Box>
          </Box>
        </Flex>
      )}
    </Stack>
  );
}
