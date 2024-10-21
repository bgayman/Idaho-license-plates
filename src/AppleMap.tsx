import { title } from 'process';
import React, { useEffect, useRef, useState } from 'react';
import { County } from './types/County';
import MapOverlay from './MapOverlay'

interface AppleMapProps {
  counties: County[];
  selectedCounty: County | undefined;
}

const AppleMap: React.FC<AppleMapProps> = ({ counties, selectedCounty }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapkit.Map | null>(null);
  const [overlays, setOverlays] = useState<mapkit.PolygonOverlay[]>([]);
  const [annotation, setAnnotation] = useState<mapkit.MarkerAnnotation | null>(null);

  useEffect(() => {
    if (typeof mapkit === 'undefined') {
      console.error('Apple MapKit is not loaded');
      return;
    }

    // Initialize mapkit if it's not already initialized
    if (!mapInstance.current) {
      mapkit.init({
        authorizationCallback: function (done: any) {
          done(
            'eyJraWQiOiIzSFZHNUY0QjdTIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiI4RERVUUgyUlVEIiwiaWF0IjoxNzI5MTEwNTI5LCJleHAiOjE3Mjk3NTMxOTl9.cTyhPs6wsSAbaPWYEylRDcLf2GEahXfBJLGhfWilq4oa61qDC2Fv7bLCy-F5Js6kLp-PZs0uLhBBLNwdUVL8Jw'
          );
        },
      });
    }

    if (mapRef.current && !mapInstance.current) {
      // Create the map instance only once
      mapInstance.current = new mapkit.Map(mapRef.current, {
        center: new mapkit.Coordinate(0, 0),
        showsZoomControl: false,
        showsCompass: mapkit.FeatureVisibility.Hidden,
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    const style: mapkit.StyleConstructorOptions = {
      fillOpacity: 0.2,
      lineWidth: 0.0,
    };

    const styleSelected: mapkit.StyleConstructorOptions = {
      fillOpacity: 0.3,
      lineWidth: 3.0,
    };

    // Remove previous overlays
    if (overlays.length > 0) {
      mapInstance.current.removeOverlays(overlays);
    }
    if (annotation) {
      mapInstance.current.removeAnnotation(annotation)
    }

    // Create new overlays based on the updated counties and selectedCounty
    const newOverlays = counties.map(
      (county) =>
        new mapkit.PolygonOverlay(
          county.coordinates?.map(
            (coo) => new mapkit.Coordinate(coo.latitude, coo.longitude)
          ) ?? [],
          {
            style: new mapkit.Style(
              county.prefix === selectedCounty?.prefix ? styleSelected : style
            ),
          }
        )
    );

    if (selectedCounty) {
      const newMarker = new mapkit.MarkerAnnotation(new mapkit.Coordinate(selectedCounty.countySeat.coordinate.latitude, selectedCounty.countySeat.coordinate.longitude))
      newMarker.title = selectedCounty.countySeat.name
      mapInstance.current.addAnnotation(newMarker)
      setAnnotation(newMarker)
    }
    

    // Add new overlays to the map
    mapInstance.current.addOverlays(newOverlays);
    mapInstance.current.showItems(newOverlays);

    // Update the overlays state
    setOverlays(newOverlays);
  }, [counties, selectedCounty]);

  return selectedCounty ? 
    <div style={{ width: '100%', height: '100vh' }}>
       <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
      <MapOverlay county={selectedCounty} />
    </div>
  : <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default AppleMap;
