import React from 'react';
import GridItem from "../../custom_design/Grid/GridItem.js";
import GridContainer from "../../custom_design/Grid/GridContainer.js";
import Card from "../../custom_design/Card/Card.js";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as parkData from "Aform/skateboard-parks.json";
//   const MapWithAMarker = withScriptjs(withGoogleMap(props =>
//     <GoogleMap
//       defaultZoom={8}
//       defaultCenter={{ lat: 10.823099, lng: 106.629662 }}
//     >
//        {parkData.features.map(park => (
//         <Marker
//           key={park.properties.PARK_ID}
//           position={{
//             lat: park.geometry.coordinates[0],
//             lng: park.geometry.coordinates[1]
//           }}
         
//         />
//       ))}
//     </GoogleMap>
//   ));
function Map() {
    const [selectedPark, setSelectedPark] = React.useState(null);
  
    React.useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") {
          setSelectedPark(null);
        }
      };
      window.addEventListener("keydown", listener);
  
      return () => {
        window.removeEventListener("keydown", listener);
      };
    }, []);
  
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 10.823099, lng: 106.629662 }}
      >
        {parkData.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            position={{
              lat: park.geometry.coordinates[0],
              lng: park.geometry.coordinates[1]
            }}
            onClick={() => {
              setSelectedPark(park);
            }}
        
          />
        ))}
  
        {selectedPark && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedPark(null);
            }}
            position={{
              lat: selectedPark.geometry.coordinates[0],
              lng: selectedPark.geometry.coordinates[1]
            }}
          >
            <div>
              <p>{selectedPark.properties.NAME}</p>
              {/* <p>{selectedPark.properties.DESCRIPTIO}</p> */}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
  const MapWrapped = withScriptjs(withGoogleMap(Map));
export default function Map_Google(){
    return(
        <GridContainer>
             <GridItem xs={12} sm={12} md={12}>
                 <Card>
                 <MapWrapped
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIoF2jDM2sw_OZpk5EdpreSUknqhofgN8&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    />
                </Card>
            </GridItem>
        </GridContainer>

    )
}