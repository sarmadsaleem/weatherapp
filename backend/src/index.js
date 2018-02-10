const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || "http://api.openweathermap.org/data/2.5";
const targetCity = process.env.TARGET_CITY || "Helsinki,fi";
const units = process.env.UNIT || "metric";

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async (lat, lon) => {

  let endpoint = '';
  (lat === undefined && lon == undefined) ?
    endpoint = `${mapURI}/weather?q=${targetCity}&units=${units}&appid=${appId}` :
    endpoint = `${mapURI}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${appId}`;
    
  const response = await fetch(endpoint);

  return response ? response.json() : {}
};

const fetchWeatherForecast = async (lat, lon) => {

  let endpoint = '';
  (lat === undefined && lon === undefined) ?
    endpoint = `${mapURI}/forecast?q=${targetCity}&units=${units}&appid=${appId}` :
    endpoint = `${mapURI}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${appId}`;

  const response = await fetch(endpoint);

  return response ? response.json() : {}
};

router.get('/api/weather/:lat?/:lon?', async ctx => {
  const lat = ctx.params.lat;
  const lon = ctx.params.lon;
  const weatherData = await fetchWeather(lat, lon);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData ? weatherData : {};
});

router.get('/api/forecast/:lat?/:lon?', async ctx => {
  const lat = ctx.params.lat;
  const lon = ctx.params.lon;
  const weatherData = await fetchWeatherForecast(lat, lon);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.list ? weatherData.list.slice(0, 5) : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
