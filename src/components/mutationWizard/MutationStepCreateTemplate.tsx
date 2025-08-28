import { useState } from "react";
import { Box, Text, Button, useToast } from "@chakra-ui/react";
import { useMarketplaceClientContext } from "../../MarketplaceClientProvider";
import { useTenantContext } from "../TenantContext";
import { createTemplate } from "../../utils/wizardUtils";

function MutationStepCreateTemplate() {
  const toast = useToast();
  const { client } = useMarketplaceClientContext();
  const { selectedTenant } = useTenantContext();
  const [loading, setLoading] = useState(false);

  type CreateItemTemplateResponse = {
    data?: {
      createItemTemplate?: {
        itemTemplate?: {
          name: string;
          templateId: string;
          ownFields: {
            nodes: Array<{
              name: string;
              type: string;
            }>;
          };
        };
      };
    };
    errors?: Array<{ message: string }>;
  };

  const handleCreateTemplate = async () => {
    if (!selectedTenant) {
      toast({ title: "No tenant selected", status: "error", isClosable: true });
      return;
    }
    setLoading(true);
    try {
      const response = await createTemplate(
        client,
        selectedTenant.context.preview
      );
      const mutationResult = response?.data as CreateItemTemplateResponse;
      if (
        mutationResult &&
        mutationResult.data?.createItemTemplate?.itemTemplate
      ) {
        toast({
          title: "Template created successfully!",
          description: `Name: ${mutationResult.data.createItemTemplate.itemTemplate.name}`,
          status: "success",
          isClosable: true,
        });
      } else if (mutationResult?.errors?.length) {
        throw new Error(mutationResult.errors[0].message);
      }
    } catch (err: any) {
      toast({
        title: "Error creating template",
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
        Create Template
      </Text>
      <Text mt={2} mb={4}>
        This step will create a new template using a mutation. Click the button
        to proceed.
      </Text>
      <Button
        colorScheme="teal"
        onClick={handleCreateTemplate}
        isLoading={loading}
        isDisabled={!selectedTenant}
      >
        Create Template
      </Button>
    </Box>
  );
}

export default MutationStepCreateTemplate;
