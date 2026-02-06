import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MidwayCheckpoint } from '@/components/DayCompletion';
import { useGame } from '@/context/GameContext';

const MidwayCheckpointPage = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, midwayCheckpointSeen, markMidwayCheckpointSeen } = useGame();

  useEffect(() => {
    // If chapters 0-3 not complete, redirect back
    const firstFourComplete = chaptersCompleted.slice(0, 4).every(Boolean);
    if (!firstFourComplete) {
      navigate('/chapters');
    }
    
    // If already seen and came back, redirect to protocol-005
    if (midwayCheckpointSeen) {
      navigate('/protocol-005');
    }
  }, [chaptersCompleted, midwayCheckpointSeen, navigate]);

  const handleContinue = () => {
    markMidwayCheckpointSeen();
    navigate('/protocol-005');
  };

  return <MidwayCheckpoint onContinue={handleContinue} />;
};

export default MidwayCheckpointPage;
