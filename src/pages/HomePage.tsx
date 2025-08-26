import { Stack, Text, Link, Box } from "@chakra-ui/react";

const references = [
  {
    label: "Sitecore Blok Design System",
    url: "https://blok.sitecore.com/",
    description:
      "Sitecore Blok is the official product design system and UI framework for building apps in the Sitecore product design language. Includes foundations, components, recipes, guidelines, and resources for developers and designers.",
  },
  {
    label: "Marketplace SDK Documentation",
    url: "https://doc.sitecore.com/mp/en/developers/marketplace/marketplace-sdk.html",
    description:
      "Official documentation for the Sitecore Marketplace SDK. Learn how to build JavaScript/TypeScript apps that extend and customize Sitecore products, with guides, API references, and developer info.",
  },
  {
    label: "Marketplace SDK GitHub Repository",
    url: "https://github.com/Sitecore/marketplace-sdk",
    description:
      "Open-source monorepo for the Sitecore Marketplace SDK. Includes packages for client integration, XM Cloud APIs, and core communication. Find code, issues, releases, and contribution guides.",
  },
  {
    label: "Marketplace SDK for JavaScript",
    url: "https://doc.sitecore.com/mp/en/developers/sdk/latest/sitecore-marketplace-sdk/sitecore-marketplace-sdk-for-javascript.html",
    description:
      "Reference documentation for using the Sitecore Marketplace SDK in JavaScript applications.",
  },
  {
    label: "Marketplace Developer Introduction",
    url: "https://doc.sitecore.com/mp/en/developers/marketplace/introduction-to-sitecore-marketplace.html",
    description:
      "Introduction to Sitecore Marketplace for developers, including app registration, configuration, and extension points.",
  },
];

export default function HomePage() {
  return (
    <Stack spacing={8} p={8} align="center">
      <Text fontSize="3xl" fontWeight="bold">
        Sitecore Marketplace SDK Demo
      </Text>
      <Text fontSize="lg" maxW="2xl" textAlign="center">
        This demo app showcases integration with the Sitecore Marketplace SDK,
        including client initialization, context retrieval, and a modern UI
        using Chakra UI. Use the navigation to explore features and view the
        application context.
      </Text>
      <Box w="100%" maxW="700px">
        <Text fontSize="xl" fontWeight="semibold" mb={4} textAlign="left">
          References & Resources
        </Text>
        <Stack spacing={4}>
          {references.map((ref) => (
            <Box
              key={ref.url}
              p={4}
              borderRadius={8}
              bg="gray.50"
              boxShadow="sm"
            >
              <Link
                href={ref.url}
                color="blue.600"
                fontWeight="bold"
                isExternal
                fontSize="md"
              >
                {ref.label}
              </Link>
              <Text fontSize="sm" color="gray.700" mt={2}>
                {ref.description}
              </Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
