import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Circle } from 'react-google-maps';
import { mapDefaults } from '../Constants';

const AnxietyMap = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `600px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
      defaultZoom={ props.defaultZoom }
      defaultCenter = { props.defaultCenter }
    >
        { 
            props.events.map(event => {
                return (
                    <Circle
                        defaultCenter={ event.coords }
                        radius={ 30 * Math.sqrt(event.count) }
                        options={ mapDefaults.circleOptions }
                    />
                );
            })
        }
    </GoogleMap>
)

export default AnxietyMap;