import { Box, Text, Alert, AlertIcon, Stack } from "@chakra-ui/react";
import { useTenantContext } from "./TenantContext";

export default function TenantInfo() {
  const { selectedTenant } = useTenantContext();

  if (!selectedTenant) {
    return (
      <Alert status="info" mt={4} borderRadius={8}>
        <AlertIcon />
        Please select a tenant to view its information.
      </Alert>
    );
  }

  return (
    <Box mt={4} p={4} bg="gray.50" borderRadius={8} boxShadow="md">
      <Text fontWeight="semibold" mb={2}>
        Tenant Information
      </Text>
      <Stack spacing={2}>
        {Object.entries(selectedTenant).map(([key, value]) => (
          <Text key={key} fontSize="sm" color="gray.700">
            <strong>{key}:</strong>{" "}
            {typeof value === "object"
              ? JSON.stringify(value, null, 2)
              : String(value)}
          </Text>
        ))}
      </Stack>
    </Box>
  );
}
