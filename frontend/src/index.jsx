import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async (lat, lon) => {
  try {
    let endpoint = '';
    (lat === undefined || lon === undefined ) ? endpoint = `${baseURL}/weather/` : endpoint = `${baseURL}/weather/${lat}/${lon}`;
    const response = await fetch(endpoint);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getForecastFromApi = async (lat, lon) => {
  try {
    let endpoint = '';
    (lat === undefined || lon === undefined ) ? endpoint = `${baseURL}/forecast/` : endpoint = `${baseURL}/forecast/${lat}/${lon}`;
    const response = await fetch(endpoint);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      lat: undefined,
      lon: undefined,
      city: "",
      icon: "",
      description: "",
      tempCur: "",
      tempMin: "",
      tempMax: "",
      forecasts: [],
    };

    this.getLocation = this.getLocation.bind(this)
  }

  getLocation() {
    const location = window.navigator && window.navigator.geolocation
    
    if (location) {
      console.log('Geolocation request initiated');
      this.setState({ loading: true });
      location.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })

        this.componentWillMount();
        this.componentDidMount();
        console.log('Geolocation request completed');

      }, (error) => {
        this.setState({ lat: undefined, lon: undefined })
      })
    }

  }

  async componentWillMount() {
    const weatherResponse = await getWeatherFromApi(this.state.lat, this.state.lon);
    const forecastResponse = await getForecastFromApi(this.state.lat, this.state.lon);

    this.setState({ 
      city: weatherResponse.name,
      icon: weatherResponse.weather[0].icon.slice(0, -1),
      description: weatherResponse.weather[0].description,
      tempCur: weatherResponse.main.temp,
      tempMin: weatherResponse.main.temp_min,
      tempMax: weatherResponse.main.temp_max,
      forecasts: forecastResponse
    });
  }

  componentDidMount(){

    this.setState({
      loading: false
    })

  }

  render() {
    const { city, icon, description, forecasts, tempCur, tempMin, tempMax, lat, lon } = this.state;

    return (
      <div>
        <div className={"spinner " + (this.state.loading ? 'show' : 'hide')}></div>
        <div className={"container " + (this.state.loading ? 'hide' : 'show')}>
          <div className="city">{city} <a onClick={this.getLocation} href="#" className="gps"><img src="/img/gps.svg" /></a></div>
          <div className="desc">{description}</div>
          <div className="icon">{icon && <img src={`/img/${icon}.svg`} />}</div>
          <div className="temp"><div>{tempCur}°</div></div>

          <div className="forecasts">
          
            {forecasts.map(function(forecast, index){

              const d = new Date(forecast.dt_txt);

              return <div key={index} className="forecast">
                      <div className="hour">{ d.getHours()}:00</div>
                      <div className="t">{forecast.main.temp.toFixed(0)}°</div>
                      <div className="i"><img src={`/img/${forecast.weather[0].icon.slice(0, -1)}.svg`} /></div>
                    </div>
            })}
          
          </div>
        </div>
      </div>
        
        
      
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
