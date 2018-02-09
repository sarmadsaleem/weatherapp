# Weatherapp

![Alt Text](https://raw.githubusercontent.com/sarmadsaleem/weatherapp/master/frontend/src/public/img/app.gif)

## Exercises

There are a few things you must do to get the app up and running. After that there are a few things you can do to make it better.

### Mandatory

* Get yourself an API key to make queries in the [openweathermap](http://openweathermap.org/). :white_check_mark:

* Either run the app locally (using `npm i && npm start`) or move to the next step. :white_check_mark:

* Add **Dockerfile**'s in the *frontend* and the *backend* directories to run them virtually on any environment having [docker](https://www.docker.com/) installed. It should work by saying e.g. `docker build -t weatherapp_backend . && docker run --rm -i -p 9000:9000 --name weatherapp_backend -t weatherapp_backend`. If it doesn't, remember to check your api key first. :white_check_mark:

* Add a **docker-compose.yml** -file connecting the frontend and the backend, enabling running the app in a connected set of containers. :white_check_mark:

### Optional (do as many as you like)

* The application now only reports the current weather. It should probably report the forecast e.g. a few hours from now. (tip: [openweathermap api](https://openweathermap.org/forecast5)) :white_check_mark:

* The developers are still keen to run the app and its pipeline on their own computers. Share the development files for the container by using volumes, and make sure the containers are started with a command enabling hot reload. :white_check_mark:

* There are [eslint](http://eslint.org/) errors. Sloppy coding it seems. Please help.

* The app currently reports the weather only for location defined in the *backend*. Shouldn't it check the browser location and use that as the reference for making a forecast? (tip: [geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)) :white_check_mark:

* There are no tests. Where are the tests? (tip: [mocha](https://mochajs.org/) or [robot framework](http://robotframework.org/)) Disclaimer: this is not an easy task. If you really want to try writing robot tests, start by creating a third container that gives expected weather data, and direct the backend queries there by redefining the **MAP_ENDPOINT**.

* Set up the weather service in a free cloud hosting service, e.g. [AWS](https://aws.amazon.com/free/) or [Google Cloud](https://cloud.google.com/free/). :white_check_mark: Deployed on Google Cloud Kubernetes Engine: http://35.193.203.127:8000/. Note: Geolocation feature doesn't work without HTTPS on all modern browsers, so for testing either do locally or launch browser with ```sudo /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --unsafely-treat-insecure-origin-as-secure="http://35.193.203.127:8000/"  --user-data-dir=/path/to/folder/for/testprofile```

* Write [ansible](http://docs.ansible.com/ansible/intro.html) playbooks for installing [docker](https://www.docker.com/) and the app itself.
