import { createContext, useContext, useState, useMemo } from "react";
import type { ApplicationResourceContext } from "@sitecore-marketplace-sdk/core";

export type TenantContextType = {
  selectedTenant: ApplicationResourceContext | null;
  setSelectedTenant: (tenant: ApplicationResourceContext | null) => void;
};

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [selectedTenant, setSelectedTenant] =
    useState<ApplicationResourceContext | null>(null);

  const value = useMemo(
    () => ({ selectedTenant, setSelectedTenant }),
    [selectedTenant]
  );

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
}

export function useTenantContext() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenantContext must be used within a TenantProvider");
  }
  return context;
}
