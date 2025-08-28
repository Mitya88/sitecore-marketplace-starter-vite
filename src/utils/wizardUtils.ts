import type { ClientSDK } from "@sitecore-marketplace-sdk/client";

export async function createTemplate(
  client: ClientSDK | null,
  sitecoreContextId: string
) {
  return await client?.mutate("xmc.authoring.graphql", {
    params: {
      query: {
        sitecoreContextId,
      },
      body: {
        query: `mutation {\n  createItemTemplate(\n    input: {\n      name: \"StarterDemo\"\n      parent: \"{B29EE504-861C-492F-95A3-0D890B6FCA09}\"\n      sections: {\n        name: \"Data\"\n        fields: [\n          { name: \"Title\", type: \"Single-Line Text\" }\n          { name: \"Content\", type: \"Rich Text\" }\n        ]\n      }\n    }\n  ) {\n    itemTemplate {\n      name\n      templateId\n      ownFields {\n        nodes {\n          name\n          type\n        }\n      }\n    }\n  }\n}`,
      },
    },
  });
}

export async function getDemoTemplate(
  client: any,
  sitecoreContextId: string
): Promise<string | null> {
  const response = await client?.mutate("xmc.authoring.graphql", {
    params: {
      query: {
        sitecoreContextId,
      },
      body: {
        query: `query {\n  item(\n    where: { database: \"master\", path: \"/sitecore/templates/User Defined/StarterDemo\" }\n  ) {\n    itemId\n  }\n}`,
      },
    },
  });
  const itemId = response?.data?.data?.item?.itemId;
  return itemId ? itemId : null;
}

export async function createItem(
  client: any,
  sitecoreContextId: string,
  templateId: string
) {
  return await client?.mutate("xmc.authoring.graphql", {
    params: {
      query: {
        sitecoreContextId,
      },
      body: {
        query: `mutation {\n  createItem(\n    input: {\n      name: \"StarterDemo\"\n      templateId: \"${templateId}\"\n      parent: \"{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}\"\n      language: \"en\"\n      fields: [\n        { name: \"Title\", value: \"Welcome to Sitecore\" }\n        { name: \"Content\", value: \"Welcome to Sitecore\" }\n      ]\n    }\n  ) {\n    item {\n      itemId\n      name\n      path\n      fields(ownFields: true, excludeStandardFields: true) {\n        nodes {\n          name\n          value\n        }\n      }\n    }\n  }\n}`,
      },
    },
  });
}

export async function deleteItem(
  client: any,
  sitecoreContextId: string,
  path: string
) {
  return await client?.mutate("xmc.authoring.graphql", {
    params: {
      query: {
        sitecoreContextId,
      },
      body: {
        query: `mutation {\n  deleteItem(\n    input: {\n      path: \"${path}\"\n      permanently: false\n    }\n  ) {\n    successful\n  }\n}`,
      },
    },
  });
}

export async function uploadMedia(
  client: any,
  sitecoreContextId: string,
  itemPath: string
) {
  return await client?.mutate("xmc.authoring.graphql", {
    params: {
      query: {
        sitecoreContextId,
      },
      body: {
        query: `mutation {\n  uploadMedia(input: { itemPath: \"${itemPath}\" }) {\n    presignedUploadUrl\n  }\n}`,
      },
    },
  });
}
