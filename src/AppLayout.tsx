import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Flex,
  Button,
  Icon,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  mdiHomeVariantOutline,
  mdiAccountMultipleOutline,
  mdiInformationOutline,
  mdiDomain,
  mdiDatabaseSearch,
  mdiWeb,
} from "@mdi/js";

const navItems = [
  { label: "Home", to: "/", icon: mdiHomeVariantOutline },
  {
    label: "Application Context",
    to: "/context",
    icon: mdiAccountMultipleOutline,
  },
  {
    label: "MarketplaceClientProvider Info",
    to: "/provider-info",
    icon: mdiInformationOutline,
  },
  { label: "Tenant Selector", to: "/tenant-selector", icon: mdiDomain },
  { label: "Query Example", to: "/query-example", icon: mdiDatabaseSearch },
  { label: "Sites by Tenant", to: "/sites-by-tenant", icon: mdiWeb },
];

export default function AppLayout() {
  const location = useLocation();

  return (
    <Flex minH="100vh" w="100vw">
      <Box
        bg="chakra-body-bg"
        p={4}
        shadow="base"
        minW="220px"
        maxW="240px"
        h="100vh"
        position="sticky"
        top={0}
      >
        <Stack spacing={2}>
          {navItems.map((item) => (
            <Button
              as={Link}
              to={item.to}
              key={item.to}
              isActive={location.pathname === item.to}
              leftIcon={
                <Icon>
                  <path d={item.icon} />
                </Icon>
              }
              variant="ghost"
              justifyContent="flex-start"
              w="full"
            >
              <Text isTruncated>{item.label}</Text>
            </Button>
          ))}
        </Stack>
      </Box>
      <Box flex={1} p={8}>
        <Outlet />
      </Box>
    </Flex>
  );
}
