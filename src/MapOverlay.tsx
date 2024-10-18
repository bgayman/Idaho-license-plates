import React, { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import useMediaQuery from './useMediaQuery'; // Custom hook to detect screen size
import CountyDetails from './CountyDetails';
import { County } from './types/County';

interface MapOverlayProps {
    county: County;
  }

const MapOverlay: React.FC<MapOverlayProps> = ({ county }) => {
  const isMobile = useMediaQuery('(max-width: 768px)'); // Detects if the screen is mobile-sized
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  // Toggle the bottom sheet for mobile
  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <>
      {/* For mobile devices, render the bottom sheet */}
      {isMobile ? (
        <>
          <button
            onClick={toggleSheet}
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 200,
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              visibility: isSheetOpen ? 'hidden' : 'visible',
            }}
          >
            Show County Info
          </button>

          <BottomSheet
            open={isSheetOpen}
            onDismiss={toggleSheet}
            snapPoints={({ maxHeight }) => [maxHeight * 0.5, maxHeight * 0.9]}
          >
            <div style={{ padding: '20px' }}>
                <CountyDetails county={county} />
            </div>
          </BottomSheet>
        </>
      ) : (
        // For larger devices, render a floating div on the top trailing side
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '300px',
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '20px',
            zIndex: 200,
            backdropFilter: 'blur(10px)', // The blur effect
            WebkitBackdropFilter: 'blur(10px)', // For Safari
          }}
        >
            <CountyDetails county={county} />          
        </div>
      )}
    </>
  );
};

export default MapOverlay;
