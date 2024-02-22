import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '650px',
  height: '600px',
};

// const center = {
//   lat: 8.1833,
//   lng: 77.4119
// };

function MyComponent(props) {
  const { isLoaded } = useJsApiLoader({
    // id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB5CU2sIOrSbh_7tbvsFLaFYR5MZJUOSFQ"
  })

  const [center,setCenter]=useState(props?.location)
  console.log("l",props.location);

  const [map, setMap] = useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
        <Marker position={center} />
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)