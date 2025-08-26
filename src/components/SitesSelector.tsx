import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  Select,
  Text,
} from "@chakra-ui/react";
import { useMarketplaceClientContext } from "../MarketplaceClientProvider";
import { useTenantContext } from "./TenantContext";

const graphQLQuery = {
  query: `query { sites 
  { 
    name 
    contentStartPath
    domain
    rootPath
    startPath
    targetHostName
  } 
}`,
};

export default function SitesSelector() {
  const { client } = useMarketplaceClientContext();
  const [sites, setSites] = useState<any[]>([]); // store full site objects
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSite, setSelectedSite] = useState<any | null>(null); // store full site object

  const { selectedTenant } = useTenantContext();

  useEffect(() => {
    if (!selectedTenant) {
      setSites([]);
      setSelectedSite(null);
      return;
    }
    const fetchSites = async () => {
      setLoading(true);
      setError(null);
      const sitecoreContextId = selectedTenant?.context?.preview;
      if (!sitecoreContextId) {
        setError("Preview Context ID not found in selected tenant.");
        setLoading(false);
        return;
      }
      try {
        const response = await client?.mutate("xmc.authoring.graphql", {
          params: {
            query: {
              sitecoreContextId,
            },
            body: graphQLQuery,
          },
        });
        let sitesList: any[] = [];
        const sitesData = response?.data?.data?.sites;
        if (Array.isArray(sitesData)) {
          sitesList = sitesData;
        } else {
          console.warn("Unexpected response shape:", response);
        }
        setSites(sitesList);
        setSelectedSite(sitesList.length > 0 ? sitesList[0] : null);
      } catch (err: any) {
        setError(err?.message || "Error fetching sites.");
      } finally {
        setLoading(false);
      }
    };
    fetchSites();
  }, [client, selectedTenant]);

  return (
    <Box
      minW={220}
      minH={60}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      pt={1}
    >
      <Heading size="sm" mb={2} textAlign="left" w="100%">
        Sites
      </Heading>
      {!selectedTenant && (
        <Select
          placeholder="Select site"
          isDisabled
          minW={200}
          textAlign="left"
        >
          <option value="">Please select a tenant first</option>
        </Select>
      )}
      {loading && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="40px"
        >
          <Spinner size="md" thickness="4px" speed="0.65s" color="blue.500" />
        </Box>
      )}
      {error && (
        <Alert status="error" mb={2}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      {selectedTenant && !loading && !error && sites.length > 0 && (
        <>
          <Select
            placeholder="Select site"
            value={selectedSite?.name || ""}
            onChange={(e) => {
              const siteObj = sites.find((s) => s.name === e.target.value);
              setSelectedSite(siteObj || null);
            }}
            minW={200}
            textAlign="left"
            isDisabled={sites.length === 0}
          >
            {sites.map((site) => (
              <option
                key={site.name}
                value={site.name}
                style={{ textAlign: "left" }}
              >
                {site.name}
              </option>
            ))}
          </Select>
          {selectedSite && (
            <Box mt={3} p={2} bg="gray.100" borderRadius={6} w="100%">
              <Text fontSize="sm" color="gray.700">
                Selected Site: <b>{selectedSite.name}</b>
              </Text>
              <Text fontSize="sm" color="gray.700">
                Domain: <b>{selectedSite.domain}</b>
              </Text>
              <Text fontSize="sm" color="gray.700">
                Target Host: <b>{selectedSite.targetHostName}</b>
              </Text>
              <Text fontSize="sm" color="gray.700">
                Root Path: <b>{selectedSite.rootPath}</b>
              </Text>
              <Text fontSize="sm" color="gray.700">
                Start Path: <b>{selectedSite.startPath}</b>
              </Text>
              <Text fontSize="sm" color="gray.700">
                Content Start Path: <b>{selectedSite.contentStartPath}</b>
              </Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
