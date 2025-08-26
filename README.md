# Sitecore Marketplace SDK Demo App

A starter template for building standalone Sitecore Marketplace apps using Vite, React, Chakra UI, and the Sitecore Marketplace SDK. This demo showcases best practices for context management, multi-tenant selection, and integration with Sitecore APIs.

> **Disclaimer:** This project is community-created and provided as a reference only. It is not officially supported by Sitecore, and is not intended for production use. The code and examples are for educational purposes and to give hints for possible usage patterns. Use at your own risk.

## Features
- **Sitecore Marketplace SDK integration:** Client and XM Cloud APIs for data access.
- **Modern UI:** Built with Chakra UI and Sitecore Blok design system.
- **Multi-tenant selection:** Choose and switch tenants using React context.
- **Application context display:** View current app context and environment details.
- **Tenant info display:** See dynamic details for the selected tenant.
- **Site list by tenant:** Select a tenant and view all associated sites, with detailed info for the selected site.
- **GraphQL query example:** Run custom queries against the Sitecore Marketplace API, with loading, error, and result display.
- **React Router navigation:** Multi-page structure with sidebar navigation.
- **Custom context provider patterns:** useMemo and strong typing for robust state management.

## Dependencies
- @sitecore-marketplace-sdk/client (Marketplace SDK client)
- @sitecore-marketplace-sdk/xmc (XM Cloud API integration)
- @sitecore/blok-theme (Sitecore Blok design system)
- @chakra-ui/react, @emotion/react, @emotion/styled, framer-motion (UI framework)
- @chakra-ui/cli (Chakra UI CLI)
- @mdi/js (Material Design Icons)

For setup instructions, see the [Setup Guide](docs/1_setup.md).

## Further References

- [Sitecore Blok Design System](https://blok.sitecore.com/): Sitecore Blok is the official product design system and UI framework for building apps in the Sitecore product design language. Includes foundations, components, recipes, guidelines, and resources for developers and designers.
- [Marketplace SDK Documentation](https://doc.sitecore.com/mp/en/developers/marketplace/marketplace-sdk.html): Official documentation for the Sitecore Marketplace SDK. Learn how to build JavaScript/TypeScript apps that extend and customize Sitecore products, with guides, API references, and developer info.
- [Marketplace SDK GitHub Repository](https://github.com/Sitecore/marketplace-sdk): Open-source monorepo for the Sitecore Marketplace SDK. Includes packages for client integration, XM Cloud APIs, and core communication. Find code, issues, releases, and contribution guides.
- [Marketplace SDK for JavaScript](https://doc.sitecore.com/mp/en/developers/sdk/latest/sitecore-marketplace-sdk/sitecore-marketplace-sdk-for-javascript.html): Reference documentation for using the Sitecore Marketplace SDK in JavaScript applications.
- [Marketplace Developer Introduction](https://doc.sitecore.com/mp/en/developers/marketplace/introduction-to-sitecore-marketplace.html): Introduction to Sitecore Marketplace for developers, including app registration, configuration, and extension points.
- [Marketplace SDK Quick Start](https://doc.sitecore.com/mp/en/developers/sdk/0/sitecore-marketplace-sdk/quick-start.html): Quick start guide for the Sitecore Marketplace SDK.