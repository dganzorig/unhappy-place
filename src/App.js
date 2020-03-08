import React, { Component } from 'react';
import NavigationTab from './components/NavigationTab';
import { Auth0Context } from './contexts/auth0-context';
import AnxietyMap from './components/AnxietyMap';
import { mapDefaults } from './Constants';
import 'typeface-roboto';
import './App.css';
import processEvents from './utils';

class App extends Component {
  static contextType = Auth0Context;

  constructor(props) {
    super(props);

    this.state = {
      events: []
    }
  }

  componentDidMount() {
    fetch('/event')
      .then(response => response.json())
      .then(events => this.setState({ events }));
  }

  render() {
    return (
      <>
        <NavigationTab />
        { !this.context.isLoading && !this.context.user && (
          <AnxietyMap
            defaultZoom={ mapDefaults.zoom }
            defaultCenter={ mapDefaults.center }
            events={ processEvents(this.state.events) }
          />
        )}
      </>
    );
  }
}

export default App;
