import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "@/pages/LandingPage";
import ChapterHub from "@/pages/ChapterHub";
import Protocol001 from "@/pages/chapters/Protocol001";
import Protocol002 from "@/pages/chapters/Protocol002";
import Protocol003 from "@/pages/chapters/Protocol003";
import Protocol004 from "@/pages/chapters/Protocol004";
import Protocol005 from "@/pages/chapters/Protocol005";
import Protocol006 from "@/pages/chapters/Protocol006";
import Protocol007 from "@/pages/chapters/Protocol007";
import ProtocolFinal from "@/pages/chapters/ProtocolFinal";
import MidwayCheckpoint from "@/pages/MidwayCheckpoint";
import JourneyStats from "@/pages/JourneyStats";
import FinalChoice from "@/pages/FinalChoice";
import { GameProvider } from "@/context/GameContext";
import "@/App.css";

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-background">
        <div className="noise-overlay" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chapters" element={<ChapterHub />} />
            <Route path="/protocol-001" element={<Protocol001 />} />
            <Route path="/protocol-002" element={<Protocol002 />} />
            <Route path="/protocol-003" element={<Protocol003 />} />
            <Route path="/protocol-004" element={<Protocol004 />} />
            <Route path="/midway-checkpoint" element={<MidwayCheckpoint />} />
            <Route path="/protocol-005" element={<Protocol005 />} />
            <Route path="/protocol-006" element={<Protocol006 />} />
            <Route path="/protocol-007" element={<Protocol007 />} />
            <Route path="/protocol-final" element={<ProtocolFinal />} />
            <Route path="/journey-stats" element={<JourneyStats />} />
            <Route path="/final" element={<FinalChoice />} />
            {/* Legacy routes for backwards compatibility */}
            <Route path="/rose-day" element={<Protocol001 />} />
            <Route path="/propose-day" element={<Protocol002 />} />
            <Route path="/chocolate-day" element={<Protocol003 />} />
            <Route path="/teddy-day" element={<Protocol004 />} />
            <Route path="/promise-day" element={<Protocol005 />} />
            <Route path="/hug-day" element={<Protocol006 />} />
            <Route path="/kiss-day" element={<Protocol007 />} />
            <Route path="/valentine-day" element={<ProtocolFinal />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" />
      </div>
    </GameProvider>
  );
}

export default App;
