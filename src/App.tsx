import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import HomePage from "./pages/HomePage";
import ContextPage from "./pages/ContextPage";
import MarketplaceClientProviderInfoPage from "./pages/MarketplaceClientProviderInfoPage";
import TenantSelectorPage from "./pages/TenantSelectorPage";
import QueryExamplePage from "./pages/QueryExamplePage";
import SitesByTenantPage from "./pages/SitesByTenantPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="context" element={<ContextPage />} />
          <Route
            path="provider-info"
            element={<MarketplaceClientProviderInfoPage />}
          />
          <Route path="tenant-selector" element={<TenantSelectorPage />} />
          <Route path="query-example" element={<QueryExamplePage />} />
          <Route path="sites-by-tenant" element={<SitesByTenantPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
