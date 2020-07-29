import React,{ useEffect, useRef }  from 'react';
import GridItem from "../../custom_design/Grid/GridItem.js";
import GridContainer from "../../custom_design/Grid/GridContainer.js";
import Card from "../../custom_design/Card/Card.js";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as parkData from "Aform/skateboard-parks.json";
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';

function Map() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    debounce: 300
  });
  const registerRef = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = e => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    console.log(description);
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('📍 Coordinates: ', { lat, lng });
      }).catch(error => {
        console.log('😱 Error: ', error)
      });
  };

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      return (
        <li
          key={id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });


    return (
              
<div>
  <div ref={registerRef}>
      <input
       type="text"
       className="form-control"
       id="address"
       required
       aria-describedby="addressHelp"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 10.8507786, lng: 106.7718784	 }}>
          <Marker	
          //key={park.properties.PARK_ID}	
          position={{	
            lat: 10.8507786,	
            lng: 106.7718784
          }}	

        />
       
      </GoogleMap>
      </div>
    );
  }
const MapWrapped = withScriptjs(withGoogleMap(Map));
export default function Map_Google(){
  
    return(
        <GridContainer>
          
             <GridItem xs={12} sm={12} md={12}>
                 <Card>
                 <MapWrapped
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyARqkWrCsPkd5aKnJSvg6--NnlsH5IhNLg&libraries=places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    />
                </Card>
            </GridItem>
        </GridContainer>

    )
}