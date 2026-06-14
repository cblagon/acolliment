import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Auth from "./pages/Auth.tsx";
import Admin from "./pages/Admin.tsx";
import HelpModeracio from "./pages/HelpModeracio.tsx";
import LegalPage from "./pages/Legal.tsx";
import Eines from "./pages/Eines.tsx";
import Eso from "./pages/Eso.tsx";
import EsoCurs from "./pages/EsoCurs.tsx";
import EsoAmbit from "./pages/EsoAmbit.tsx";
import NormesCentre from "./pages/NormesCentre.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useTheme } from "./hooks/useTheme";

const queryClient = new QueryClient();

const App = () => {
  useTheme(); // initialise theme class on <html>
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/ajuda" element={<About />} />
        <Route path="/ajuda/moderacio" element={<HelpModeracio />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/eines" element={<Eines />} />
        <Route path="/eso" element={<Eso />} />
        <Route path="/eso/:curs" element={<EsoCurs />} />
        <Route path="/eso/:curs/:ambit" element={<EsoAmbit />} />
        <Route path="/privacitat" element={<LegalPage kind="privacy" />} />
        <Route path="/galetes" element={<LegalPage kind="cookies" />} />
        <Route path="/avis-legal" element={<LegalPage kind="legal" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
