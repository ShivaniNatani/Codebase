import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "@/pages/LandingPage";
import ChapterHub from "@/pages/ChapterHub";
import RoseDay from "@/pages/chapters/RoseDay";
import ProposeDay from "@/pages/chapters/ProposeDay";
import ChocolateDay from "@/pages/chapters/ChocolateDay";
import TeddyDay from "@/pages/chapters/TeddyDay";
import PromiseDay from "@/pages/chapters/PromiseDay";
import HugDay from "@/pages/chapters/HugDay";
import KissDay from "@/pages/chapters/KissDay";
import ValentineDay from "@/pages/chapters/ValentineDay";
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
            <Route path="/rose-day" element={<RoseDay />} />
            <Route path="/propose-day" element={<ProposeDay />} />
            <Route path="/chocolate-day" element={<ChocolateDay />} />
            <Route path="/teddy-day" element={<TeddyDay />} />
            <Route path="/promise-day" element={<PromiseDay />} />
            <Route path="/hug-day" element={<HugDay />} />
            <Route path="/kiss-day" element={<KissDay />} />
            <Route path="/valentine-day" element={<ValentineDay />} />
            <Route path="/final" element={<FinalChoice />} />
          </Routes>
        </BrowserRouter>
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: 'hsl(0 0% 8%)',
              border: '1px solid hsl(0 72% 45% / 0.3)',
              color: 'hsl(0 0% 95%)',
            },
          }}
        />
      </div>
    </GameProvider>
  );
}

export default App;
