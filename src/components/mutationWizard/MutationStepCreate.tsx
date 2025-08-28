import { useState } from "react";
import { Box, Text, Button, useToast } from "@chakra-ui/react";
import { useMarketplaceClientContext } from "../../MarketplaceClientProvider";
import { useTenantContext } from "../TenantContext";
import { getDemoTemplate, createItem } from "../../utils/wizardUtils";

function MutationStepCreate() {
  const toast = useToast();
  const { client } = useMarketplaceClientContext();
  const { selectedTenant } = useTenantContext();
  const [loading, setLoading] = useState(false);

  type CreateItemResponse = {
    data?: {
      createItem?: {
        item?: {
          itemId: string;
          name: string;
          path: string;
          fields: {
            nodes: Array<{
              name: string;
              value: string;
            }>;
          };
        };
      };
    };
    errors?: Array<{ message: string }>;
  };

  const handleCreateItem = async () => {
    if (!selectedTenant) {
      toast({ title: "No tenant selected", status: "error", isClosable: true });
      return;
    }
    setLoading(true);
    try {
      const templateId = await getDemoTemplate(
        client,
        selectedTenant.context.preview
      );
      if (!templateId) {
        toast({
          title: "Template not found",
          description: "Please create the demo template first.",
          status: "error",
          isClosable: true,
        });
        setLoading(false);
        return;
      }
      const response = await createItem(
        client,
        selectedTenant.context.preview,
        templateId
      );
      const mutationResult = response?.data as CreateItemResponse;
      if (mutationResult && mutationResult.data?.createItem?.item) {
        toast({
          title: "Item created successfully!",
          description: `Name: ${mutationResult.data.createItem.item.name}`,
          status: "success",
          isClosable: true,
        });
      } else if (mutationResult?.errors?.length) {
        throw new Error(mutationResult.errors[0].message);
      }
    } catch (err: any) {
      toast({
        title: "Error creating item",
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
        Create Item
      </Text>
      <Text mt={2} mb={4}>
        This step will create a new item using a mutation. Click the button to
        proceed.
      </Text>
      <Button
        colorScheme="green"
        onClick={handleCreateItem}
        isLoading={loading}
        isDisabled={!selectedTenant}
      >
        Create Item
      </Button>
    </Box>
  );
}

export default MutationStepCreate;
