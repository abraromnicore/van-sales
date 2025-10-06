import { useState, useEffect, useRef } from 'react';
import { Truck, Navigation, Clock, Package, User, MapPin, Activity } from 'lucide-react';

interface Van {
  id: string;
  driverName: string;
  status: 'moving' | 'idle' | 'stopped';
  speed: number;
  itemsLoaded: number;
  location: { lat: number; lng: number };
  pastRoute: { lat: number; lng: number }[];
  plannedRoute: { lat: number; lng: number }[];
  lastUpdate: string;
}

const VanTracker: React.FC = () => {
  const [vans, setVans] = useState<Van[]>([
    {
      id: 'VAN-001',
      driverName: 'Ahmed Khan',
      status: 'moving',
      speed: 45,
      itemsLoaded: 24,
      location: { lat: 31.5204, lng: 74.3587 },
      pastRoute: [
        { lat: 31.5104, lng: 74.3487 },
        { lat: 31.5154, lng: 74.3537 },
        { lat: 31.5204, lng: 74.3587 }
      ],
      plannedRoute: [
        { lat: 31.5204, lng: 74.3587 },
        { lat: 31.5254, lng: 74.3637 },
        { lat: 31.5304, lng: 74.3687 }
      ],
      lastUpdate: '2 min ago'
    },
    {
      id: 'VAN-002',
      driverName: 'Muhammad Ali',
      status: 'idle',
      speed: 0,
      itemsLoaded: 18,
      location: { lat: 31.5404, lng: 74.3487 },
      pastRoute: [
        { lat: 31.5304, lng: 74.3387 },
        { lat: 31.5354, lng: 74.3437 },
        { lat: 31.5404, lng: 74.3487 }
      ],
      plannedRoute: [
        { lat: 31.5404, lng: 74.3487 },
        { lat: 31.5454, lng: 74.3537 }
      ],
      lastUpdate: '1 min ago'
    },
    {
      id: 'VAN-003',
      driverName: 'Hassan Raza',
      status: 'stopped',
      speed: 0,
      itemsLoaded: 32,
      location: { lat: 31.5104, lng: 74.3787 },
      pastRoute: [
        { lat: 31.5004, lng: 74.3687 },
        { lat: 31.5054, lng: 74.3737 },
        { lat: 31.5104, lng: 74.3787 }
      ],
      plannedRoute: [
        { lat: 31.5104, lng: 74.3787 },
        { lat: 31.5154, lng: 74.3837 },
        { lat: 31.5204, lng: 74.3887 }
      ],
      lastUpdate: '3 min ago'
    },
    {
      id: 'VAN-004',
      driverName: 'Bilal Ahmed',
      status: 'moving',
      speed: 52,
      itemsLoaded: 15,
      location: { lat: 31.5304, lng: 74.3887 },
      pastRoute: [
        { lat: 31.5204, lng: 74.3787 },
        { lat: 31.5254, lng: 74.3837 },
        { lat: 31.5304, lng: 74.3887 }
      ],
      plannedRoute: [
        { lat: 31.5304, lng: 74.3887 },
        { lat: 31.5354, lng: 74.3937 }
      ],
      lastUpdate: '1 min ago'
    }
  ]);

  const [selectedVan, setSelectedVan] = useState<Van | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const pastRouteLineRef = useRef<any>(null);
  const plannedRouteLineRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      const map = new (window as any).google.maps.Map(mapRef.current, {
        center: { lat: 31.5204, lng: 74.3587 },
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      });

      googleMapRef.current = map;

      vans.forEach(van => {
        createMarker(van, map);
      });
    };

    if (!(window as any).google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCxeqZmHTf3I_Wf4vCVlUvvD_-d3CN51B8`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  const createMarker = (van: Van, map: any) => {
    const statusColors: { [key: string]: string } = {
      moving: '#22c55e',
      idle: '#eab308',
      stopped: '#ef4444'
    };

    const marker = new (window as any).google.maps.Marker({
      position: van.location,
      map: map,
      title: van.id,
      icon: {
        path: (window as any).google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: statusColors[van.status],
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3,
      },
      label: {
        text: van.id,
        color: '#ffffff',
        fontSize: '10px',
        fontWeight: 'bold'
      }
    });

    marker.addListener('click', () => {
      handleVanSelect(van);
    });

    markersRef.current.push({ vanId: van.id, marker });
  };

  useEffect(() => {
    if (!googleMapRef.current) return;

    markersRef.current.forEach(({ vanId, marker }) => {
      const van = vans.find(v => v.id === vanId);
      if (van) {
        marker.setPosition(van.location);
        
        const statusColors: { [key: string]: string } = {
          moving: '#22c55e',
          idle: '#eab308',
          stopped: '#ef4444'
        };

        marker.setIcon({
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: selectedVan?.id === vanId ? 15 : 12,
          fillColor: statusColors[van.status],
          fillOpacity: 1,
          strokeColor: selectedVan?.id === vanId ? '#3b82f6' : '#ffffff',
          strokeWeight: selectedVan?.id === vanId ? 4 : 3,
        });
      }
    });
  }, [vans, selectedVan]);

  useEffect(() => {
    if (!googleMapRef.current || !selectedVan) {
      if (pastRouteLineRef.current) {
        pastRouteLineRef.current.setMap(null);
        pastRouteLineRef.current = null;
      }
      if (plannedRouteLineRef.current) {
        plannedRouteLineRef.current.setMap(null);
        plannedRouteLineRef.current = null;
      }
      return;
    }

    if (pastRouteLineRef.current) pastRouteLineRef.current.setMap(null);
    if (plannedRouteLineRef.current) plannedRouteLineRef.current.setMap(null);

    const pastRouteLine = new (window as any).google.maps.Polyline({
      path: selectedVan.pastRoute,
      geodesic: true,
      strokeColor: '#94a3b8',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      icons: [{
        icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 2 },
        offset: '0',
        repeat: '10px'
      }],
      map: googleMapRef.current
    });
    pastRouteLineRef.current = pastRouteLine;

    const plannedRouteLine = new (window as any).google.maps.Polyline({
      path: selectedVan.plannedRoute,
      geodesic: true,
      strokeColor: '#3b82f6',
      strokeOpacity: 1,
      strokeWeight: 4,
      icons: [{
        icon: {
          path: (window as any).google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          strokeColor: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 1,
        },
        offset: '100%',
      }],
      map: googleMapRef.current
    });
    plannedRouteLineRef.current = plannedRouteLine;

    googleMapRef.current.panTo(selectedVan.location);
    googleMapRef.current.setZoom(14);
  }, [selectedVan]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVans(prevVans =>
        prevVans.map(van => {
          if (van.status === 'moving') {
            const newLat = van.location.lat + (Math.random() - 0.5) * 0.002;
            const newLng = van.location.lng + (Math.random() - 0.5) * 0.002;
            const newSpeed = Math.max(0, van.speed + (Math.random() - 0.5) * 10);
            
            return {
              ...van,
              location: { lat: newLat, lng: newLng },
              speed: Math.round(newSpeed),
              pastRoute: [...van.pastRoute.slice(-5), van.location],
              lastUpdate: 'Just now'
            };
          }
          return van;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleVanSelect = (van: Van) => {
    setSelectedVan(van);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'moving': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'stopped': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case 'moving': return 'border-green-500';
      case 'idle': return 'border-yellow-500';
      case 'stopped': return 'border-red-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header - Fixed height */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Van GPS Tracking</h1>
              <p className="text-sm text-gray-500">Real-time fleet monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
            <Activity className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">{vans.length} Vans Active</span>
          </div>
        </div>
      </div>

      {/* Van Cards - Fixed height with horizontal scroll */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
          {vans.map(van => (
            <div
              key={van.id}
              onClick={() => handleVanSelect(van)}
              className={`flex-shrink-0 w-72 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedVan?.id === van.id
                  ? `${getStatusBorderColor(van.status)} bg-blue-50 shadow-md`
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-gray-900">{van.id}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(van.status)} animate-pulse`}></div>
                  <span className="text-xs font-medium text-gray-600 capitalize">{van.status}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{van.driverName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span>{van.itemsLoaded} items loaded</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span>{van.speed} km/h</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{van.lastUpdate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Takes remaining space */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Google Map View */}
        <div className="flex-1 relative bg-gray-100 p-6">
          <div ref={mapRef} className="h-full w-full rounded-xl shadow-lg"></div>
        </div>

        {/* Detail Panel */}
        {selectedVan && (
          <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Van Details</h2>
              <button
                onClick={() => setSelectedVan(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Van ID and Status */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gray-900">{selectedVan.id}</span>
                <div className={`px-3 py-1 rounded-full ${getStatusColor(selectedVan.status)} flex items-center gap-2`}>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-white uppercase">{selectedVan.status}</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">Last updated: {selectedVan.lastUpdate}</div>
            </div>

            {/* Driver Information */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Driver Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{selectedVan.driverName}</div>
                    <div className="text-sm text-gray-500">Licensed Driver</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Van Statistics */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Current Statistics</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">Speed</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{selectedVan.speed}</div>
                  <div className="text-xs text-gray-500">km/h</div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-purple-600" />
                    <span className="text-xs text-purple-600 font-medium">Items</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{selectedVan.itemsLoaded}</div>
                  <div className="text-xs text-gray-500">loaded</div>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Location</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Current Position</div>
                    <div className="text-sm text-gray-600">
                      Lat: {selectedVan.location.lat.toFixed(4)}°
                    </div>
                    <div className="text-sm text-gray-600">
                      Lng: {selectedVan.location.lng.toFixed(4)}°
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Route Information</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-sm font-semibold text-gray-700">Past Route</div>
                  </div>
                  <div className="text-xs text-gray-600">
                    {selectedVan.pastRoute.length} waypoints traveled
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-sm font-semibold text-blue-900">Planned Route</div>
                  </div>
                  <div className="text-xs text-blue-700">
                    {selectedVan.plannedRoute.length} waypoints remaining
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VanTracker;