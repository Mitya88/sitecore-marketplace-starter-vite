import {
  Box,
  Text,
  Alert,
  AlertIcon,
  Flex,
  Input,
  Button,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { useTenantContext } from "../components/TenantContext";
import { useRef, useState } from "react";
import { useMarketplaceClientContext } from "../MarketplaceClientProvider";

type QueryResultNode = {
  itemId: string;
  name: string;
  path: string;
  hasChildren: boolean;
  template: { name: string };
  updated?: { value: string };
  updatedBy?: { value: string };
  workflow?: { workflowState?: { displayName: string; final: boolean } };
  [key: string]: any;
};

function QueryComponent() {
  const { selectedTenant } = useTenantContext();
  const queryRef = useRef<HTMLInputElement>(null);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QueryResultNode[]>([]);
  const { client } = useMarketplaceClientContext();

  if (!selectedTenant) {
    return (
      <Alert status="info" mt={4} borderRadius={8}>
        <AlertIcon />
        Please select a tenant to run a query.
      </Alert>
    );
  }

  const handleQuery = async () => {
    const query = queryRef.current?.value || "/sitecore/content/";
    setLastQuery(query);
    setLoading(true);
    setError(null);
    setResult([]);
    try {
      const sitecoreContextId: string = selectedTenant.context.preview;
      const response = await client?.mutate("xmc.authoring.graphql", {
        params: {
          query: {
            sitecoreContextId,
          },
          body: {
            query: `query {\n  item(where: { database: \"master\", path: \"${query}\" }) {\n    children { \n      nodes { \n        itemId \n        name \n        path  \n        hasChildren \n        template{name} \n        updated:field(name:\"__Updated\"){value} \n        updatedBy:field(name:\"__Updated By\"){value}\n        workflow{workflowState{displayName final}}\n      }\n    }\n  }\n}`,
          },
        },
      });
      const item = (response?.data?.data?.item ?? {}) as {
        children?: { nodes?: QueryResultNode[] };
      };
      const nodes: QueryResultNode[] = item.children?.nodes || [];
      setResult(nodes);
    } catch (err: any) {
      setError(err?.message || "Error fetching items.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      w="100%"
      maxW="900px"
      gap={8}
      direction={{ base: "column", md: "row" }}
    >
      <Box flex={1}>
        <Text fontWeight="semibold" mb={2}>
          Query Input
        </Text>
        <Stack spacing={4}>
          <Input defaultValue="/sitecore/content/" ref={queryRef} />
          <Button colorScheme="blue" onClick={handleQuery} isLoading={loading}>
            Query
          </Button>
        </Stack>
      </Box>
      <Box flex={1}>
        <Text fontWeight="semibold" mb={2}>
          Query Result
        </Text>
        {loading && <Spinner size="md" mt={2} />}
        {error && (
          <Text color="red.500" mt={2}>
            {error}
          </Text>
        )}
        {result.length > 0 && (
          <Box
            as="pre"
            fontSize="sm"
            bg="gray.100"
            p={4}
            borderRadius={8}
            mt={2}
            overflowX="auto"
          >
            {JSON.stringify(result, null, 2)}
          </Box>
        )}
        {lastQuery && !loading && result.length === 0 && !error && (
          <Text fontSize="sm" color="gray.600">
            Last query: <strong>{lastQuery}</strong>
          </Text>
        )}
      </Box>
    </Flex>
  );
}

export default QueryComponent;
