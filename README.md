# Getting Started with Weather App

Clone the project and navigate to the project directory

## Install dependencies

Make sure node is installed on your system. Run the command:

### `npm install`

To start the project navigate to the project directory, and run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Details of application

This is a responsive weather forecast application built using React.js. The app fetches real-time weather data from the OpenWeatherMap API and provides current and 5-day forecasts for different cities. Key features of the application include:

###Features

###City Search:
Users can search for weather information by entering the name of a city.
The app uses the OpenWeatherMap Geocoding API to retrieve the geographical coordinates (latitude and longitude) of the city.

###Current Weather Information:
Displays the current weather conditions based on the selected city.

###5-Day Weather Forecast:
Provides a 5-day forecast showing essential weather details like temperature and weather conditions for each day.

###Unit Switching (Celsius/Fahrenheit):
Users can toggle between Celsius and Fahrenheit for temperature units using a switch component.

###Pull-to-Refresh:
Supports a pull-to-refresh mechanism on mobile devices, allowing users to refresh the weather data by pulling down on the screen.

###Offline Storage:
If the user’s city was previously searched, the app retrieves the data from localStorage to minimize unnecessary API calls and improve performance when offline.

###Loading Indicators:
Displays a loading spinner when fetching data to improve the user experience during API calls.



