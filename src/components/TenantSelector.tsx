import { Select, Box, Heading } from "@chakra-ui/react";
import { useTenantContext } from "./TenantContext";
import type { ApplicationResourceContext } from "@sitecore-marketplace-sdk/core";

interface TenantSelectorProps {
  resourceAccess: ApplicationResourceContext[] | undefined;
}

export default function TenantSelector({
  resourceAccess,
}: TenantSelectorProps) {
  const { selectedTenant, setSelectedTenant } = useTenantContext();

  return (
    <Box>
      <Heading size="sm" mb={2}>
        Tenant
      </Heading>
      <Select
        placeholder="Select tenant"
        value={selectedTenant?.tenantDisplayName || ""}
        onChange={(e) => {
          const selected = resourceAccess?.find(
            (t) => t.tenantDisplayName === e.target.value
          );
          setSelectedTenant(selected || null);
        }}
        minW={250}
      >
        {resourceAccess?.map((tenant, idx) => (
          <option key={idx} value={tenant.tenantDisplayName}>
            {tenant.tenantDisplayName}
          </option>
        ))}
      </Select>
    </Box>
  );
}
