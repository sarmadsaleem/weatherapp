import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT || 'http://35.202.173.81:9000/api';

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

const getLocationOnInsecure = async () => {

  let position = {
    coords: {
      latitude: '',
      longitude: ''
    }
  };

  const response = await fetch('http://ip-api.com/json');

  //return response.json();
  if(response.ok){

    return response.json();
    //return payload;
    //const response2 = await fetch('http://maps.googleapis.com/maps/api/geocode/json?address=' + response.json().zip)

  }
  else
  {
    alert('Error locating on insecure connection');
  }

}

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

  async getLocation() {
    const location = window.navigator && window.navigator.geolocation
    // HTML5 geolocation api only works on https only or localhost on chrome for dev purpose
    //const isChrome = window.chrome;
    //const isLocal = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const isSecure = (window.location.protocol === 'https')
    
    if (location) {

      if(!isSecure)
      {
        this.setState({ loading: true });
        const data = await getLocationOnInsecure();
        console.log('Geolocation insecure request initiated');
        this.setState({ 
          lat: data.lat,
          lon: data.lon, 
        });
        this.componentWillMount();
        this.componentDidMount();
        console.log('Geolocation insecure request completed');
      }
      else
      {
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
          alert(message);
        })

      }
    }
    else
    {
        alert('HTML5 Geolocation API can only work on a secure connection. For testing, try on localhost.');
      
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

              let d = new Date(forecast.dt * 1000);

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
