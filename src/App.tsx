import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Auth from "./pages/Auth.tsx";
import Admin from "./pages/Admin.tsx";
import AdminStats from "./pages/AdminStats.tsx";
import AdminMap from "./pages/AdminMap.tsx";
import HelpModeracio from "./pages/HelpModeracio.tsx";
import LegalPage from "./pages/Legal.tsx";
import Eines from "./pages/Eines.tsx";
import Eso from "./pages/Eso.tsx";
import EsoCurs from "./pages/EsoCurs.tsx";
import EsoAmbit from "./pages/EsoAmbit.tsx";
import NormesCentre from "./pages/NormesCentre.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ChangePassword from "./pages/ChangePassword.tsx";
import NotFound from "./pages/NotFound.tsx";
import CentresMapa from "./pages/CentresMapa.tsx";
import Contacte from "./pages/Contacte.tsx";
import Recomanacions from "./pages/Recomanacions.tsx";
import Penjat from "./pages/Penjat.tsx";
import MapesVerbs from "./pages/MapesVerbs.tsx";
import { useTheme } from "./hooks/useTheme";
import { usePageTracking } from "./hooks/usePageTracking";

const queryClient = new QueryClient();

const TrackingRoutes = () => {
  usePageTracking();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/ajuda" element={<About />} />
      <Route path="/ajuda/moderacio" element={<HelpModeracio />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/stats" element={<AdminStats />} />
      <Route path="/admin/map" element={<AdminMap />} />
      <Route path="/eines" element={<Eines />} />
      <Route path="/eso" element={<Eso />} />
      <Route path="/eso/:curs" element={<EsoCurs />} />
      <Route path="/eso/:curs/:ambit" element={<EsoAmbit />} />
      <Route path="/normes-centre" element={<NormesCentre />} />
      <Route path="/centres-mapa" element={<CentresMapa />} />
      <Route path="/contacte" element={<Contacte />} />
      <Route path="/recomanacions" element={<Recomanacions />} />
      <Route path="/penjat" element={<Penjat />} />
      <Route path="/mapes-verbs" element={<MapesVerbs />} />
      <Route path="/privacitat" element={<LegalPage kind="privacy" />} />
      <Route path="/galetes" element={<LegalPage kind="cookies" />} />
      <Route path="/avis-legal" element={<LegalPage kind="legal" />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  useTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <TrackingRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
