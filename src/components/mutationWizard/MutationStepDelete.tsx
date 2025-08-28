import { useState } from "react";
import { Box, Text, Button, useToast } from "@chakra-ui/react";
import { useMarketplaceClientContext } from "../../MarketplaceClientProvider";
import { useTenantContext } from "../TenantContext";
import { deleteItem } from "../../utils/wizardUtils";

function MutationStepDelete() {
  const toast = useToast();
  const { client } = useMarketplaceClientContext();
  const { selectedTenant } = useTenantContext();
  const [loading, setLoading] = useState(false);

  type DeleteItemResponse = {
    data?: {
      deleteItem?: {
        successful: boolean;
      };
    };
    errors?: Array<{ message: string }>;
  };

  const handleDelete = async () => {
    if (!selectedTenant) {
      toast({ title: "No tenant selected", status: "error", isClosable: true });
      return;
    }
    setLoading(true);
    const errors: string[] = [];
    try {
      // Delete content item
      const responseContent = await deleteItem(
        client,
        selectedTenant.context.preview,
        "/sitecore/content/Home/StarterDemo"
      );
      const resultContent = responseContent?.data as DeleteItemResponse;
      if (resultContent?.data?.deleteItem?.successful) {
        toast({
          title: "Content item deleted!",
          description: "/sitecore/content/Home/StarterDemo",
          status: "success",
          isClosable: true,
        });
      } else if (resultContent?.errors?.length) {
        errors.push(`Content: ${resultContent.errors[0].message}`);
      }
      // Delete template item
      const responseTemplate = await deleteItem(
        client,
        selectedTenant.context.preview,
        "/sitecore/templates/User Defined/StarterDemo"
      );
      const resultTemplate = responseTemplate?.data as DeleteItemResponse;
      if (resultTemplate?.data?.deleteItem?.successful) {
        toast({
          title: "Template deleted!",
          description: "/sitecore/templates/User Defined/StarterDemo",
          status: "success",
          isClosable: true,
        });
      } else if (resultTemplate?.errors?.length) {
        errors.push(`Template: ${resultTemplate.errors[0].message}`);
      }
      if (errors.length > 0) {
        toast({
          title: "Error deleting item(s)",
          description: errors.join("\n"),
          status: "error",
          isClosable: true,
        });
      }
    } catch (err: any) {
      toast({
        title: "Error deleting item(s)",
        description: err?.message || "Unknown error",
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold">
        Delete Item
      </Text>
      <Text mt={2} mb={4}>
        This step will delete the following items created by the app:
      </Text>
      <Box mb={2} pl={4}>
        <Text color="gray.700">- /sitecore/content/Home/StarterDemo</Text>
        <Text color="gray.700">
          - /sitecore/templates/User Defined/StarterDemo
        </Text>
      </Box>
      <Button
        colorScheme="red"
        onClick={handleDelete}
        isLoading={loading}
        isDisabled={!selectedTenant}
      >
        Delete Item
      </Button>
    </Box>
  );
}

export default MutationStepDelete;
