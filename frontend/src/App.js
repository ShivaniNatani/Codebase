import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "@/pages/LandingPage";
import ChapterHub from "@/pages/ChapterHub";
import Chapter1 from "@/pages/chapters/Chapter1";
import Chapter2 from "@/pages/chapters/Chapter2";
import Chapter3 from "@/pages/chapters/Chapter3";
import Chapter4 from "@/pages/chapters/Chapter4";
import Chapter5 from "@/pages/chapters/Chapter5";
import Chapter6 from "@/pages/chapters/Chapter6";
import Chapter7 from "@/pages/chapters/Chapter7";
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
            <Route path="/chapter/1" element={<Chapter1 />} />
            <Route path="/chapter/2" element={<Chapter2 />} />
            <Route path="/chapter/3" element={<Chapter3 />} />
            <Route path="/chapter/4" element={<Chapter4 />} />
            <Route path="/chapter/5" element={<Chapter5 />} />
            <Route path="/chapter/6" element={<Chapter6 />} />
            <Route path="/chapter/7" element={<Chapter7 />} />
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
