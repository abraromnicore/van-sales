import { useCallback, useRef, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { CardHeader } from '@components/app-cards/card/CardHeader.tsx';

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '340px',
  padding: '0px',
  'border-bottom-left-radius': '16px',
  'border-bottom-right-radius': '16px',
};

const center = { lat: 31.5204, lng: 74.3587 }; // Lahore, Pakistan

export default function MapView({ title }: { title?: string }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'], // for Autocomplete
  });

  const [marker, setMarker] = useState(center);
  const [selected, setSelected] = useState<google.maps.LatLngLiteral | null>(
    null,
  );
  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Handle map click → place marker
  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newPos = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarker(newPos);
      setSelected(newPos);
    }
  }, []);

  // Handle marker drag
  const handleMarkerDragEnd = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newPos = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setMarker(newPos);
        setSelected(newPos);
      }
    },
    [],
  );

  // Handle place selection in search box
  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      const newPos = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setMarker(newPos);
      setSelected(newPos);
      mapRef.current?.panTo(newPos);
      mapRef.current?.setZoom(14);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-full h-full p-0 rounded-2xl border border-neutral-200 bg-white">
      <CardHeader title={title} />
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
        >
          <Marker
            position={marker}
            draggable
            onDragEnd={handleMarkerDragEnd}
            onClick={() => setSelected(marker)}
          />

          {selected && (
            <InfoWindow
              position={selected}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <h3>Marker Position</h3>
                <p>Lat: {selected.lat.toFixed(4)}</p>
                <p>Lng: {selected.lng.toFixed(4)}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}