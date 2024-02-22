import React, { useEffect, useState } from 'react';

function Map() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const map = new window.google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 15,
          });

          const marker = new window.google.maps.Marker({
            position: pos,
            map: map,
            title: 'Your Location',
          });

          setMap(map);
        },
        () => {
          console.error('Error: The Geolocation service failed.');
        }
      );
    } else {
      console.error('Error: Your browser doesn\'t support geolocation.');
    }
  }, []);

  return <div id="map" style={{ height: '400px' }}></div>;
}

export default Map;