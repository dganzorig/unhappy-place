import React, { useContext } from 'react';
import NavigationTab from './components/NavigationTab';
import { Auth0Context } from './contexts/auth0-context';
import AnxietyMap from './components/AnxietyMap';
import { mapDefaults } from './Constants';
import 'typeface-roboto';
import './App.css';

const App = () => {
  const { isLoading, user } = useContext(Auth0Context);
  // console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  return (
    <>
      <NavigationTab />
      { !isLoading && !user && (
        <AnxietyMap
          defaultZoom={ mapDefaults.zoom }
          defaultCenter={ mapDefaults.center }
        />
      )}
    </>
  );
}

export default App;
