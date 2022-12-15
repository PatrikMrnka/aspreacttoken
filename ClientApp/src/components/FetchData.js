import axios from 'axios';
import React, { Component } from 'react';
import { ApplicationContext } from '../providers/Provider';

export class FetchData extends Component {
  static displayName = FetchData.name;
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const [state, dispatch] = this.context;
    // const response = await fetch('weatherforecast');
    // const data = await response.json();
    console.log(state);
    axios.get("https://localhost:44414/WeatherForecast",
    {
        header: {
            Authorization: "Bearer 2" + state.accessToken,
            "Content-Type": "application/json"
        }
    }).then(response => {
      this.setState({ forecasts: response.data, loading: false });
    });

  }
}
