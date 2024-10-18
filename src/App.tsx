import React, { useEffect, useState } from 'react';
import AppleMap from './AppleMap';
import { County, GeoJSON, Coordinate } from './types/County';
import CountyRow from './CountyCell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const [counties, setCounties] = useState<County[] | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<County | undefined>(undefined);
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);

  const { prefix } = useParams<{ prefix: string }>(); // Get the county prefix from the URL
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectedCounty = (county: County) => {
    setSelectedCounty(county);
    navigate(`/${county.prefix}`);
    if (window.innerWidth <= 768) {
      setSidebarVisible(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const [countyResponse, geoJSONResponse] = await Promise.all([
          fetch('./county.json'),
          fetch('us-county-boundaries.geojson'),
        ]);
        if (!countyResponse.ok) {
          console.error('Could not get counties');
        }
        if (!geoJSONResponse.ok) {
          console.error('Could not get geo JSON');
        }
        const counties: County[] = await countyResponse.json();
        const geojson: GeoJSON = await geoJSONResponse.json();
        const coordinates: Coordinate[][] = counties.map(
          (county) =>
            geojson.features
              .find(
                (geo) =>
                  geo.properties.name.toLowerCase() ===
                  county.name.toLowerCase()
              )
              ?.geometry.coordinates.flat(1)
              .map((coo) => ({
                latitude: coo[1],
                longitude: coo[0],
              })) ?? [{ latitude: 0, longitude: 0 }]
        );
        setCounties(
          counties.map((county, index) => ({
            ...county,
            coordinates: coordinates[index],
          }))
        );

        if (prefix) {
          const foundCounty = counties.find((county) => county.prefix.toLowerCase() === prefix.toLowerCase());
          setSelectedCounty(foundCounty);
        }
      } catch (error: any) {
        console.error(error);
      }
      setSidebarVisible(window.innerWidth > 768)
    };
    fetchFiles();
  }, []);

  if (!counties) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <button
        onClick={toggleSidebar}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 200,
          padding: '10px',
          fontSize: '16px',
          color: '#fff',
          background: 'rgba(255, 255, 255, 0.2)', // Transparent background
          border: '1px solid rgba(255, 255, 255, 0.5)', // Light border
          borderRadius: '12px',
          backdropFilter: 'blur(10px)', // The blur effect
          WebkitBackdropFilter: 'blur(10px)', // For Safari
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for a floating effect
          transition: 'background 0.3s ease',
          cursor: 'pointer',
        }}
        className="menu-button"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: isSidebarVisible ? '400px' : '0px',
            height: '100vh',
            overflowY: isSidebarVisible ? 'auto' : 'hidden',
            border: isSidebarVisible ? '1px solid #ccc' : 'none',
            padding: isSidebarVisible ? '10px' : '0',
            backgroundColor: isSidebarVisible ? '#f8f8f8' : 'transparent',
            transition: 'width 0.3s ease',
          }}
          className='sidebar'
        >
          <ul style={{ padding: '0', margin: '0', listStyle: 'none' }}>
            {counties.map((county) => (
              <CountyRow
                key={county.prefix}
                county={county}
                isSelected={selectedCounty?.prefix === county.prefix}
                onClickHandler={() => handleSelectedCounty(county)}
              />
            ))}
          </ul>
        </div>

        <div style={{ 
          flex: 1, 
          width: '100%',
          height: '100vh',
          }}>
          <AppleMap counties={counties} selectedCounty={selectedCounty} />
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .menu-button {
            display: block;
          }
          .sidebar {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 999;
          }
        }

        @media (min-width: 769px) {
          .sidebar {
            width: 400px;
            border: 1px solid #ccc;
            background-color: #f8f8f8;
            padding: 10px;
          }
          .menu-button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
