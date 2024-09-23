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

### `Features`

### `City Search`:
Users can search for weather information by entering the name of a city. User can either select from dropdown or enter a city manually.
The app uses the OpenWeatherMap Geocoding API to retrieve the geographical coordinates (latitude and longitude) of the city.

### `Current Weather Information`:
Displays the current weather conditions based on the selected city.

### `5-Day Weather Forecast`:
Provides a 5-day forecast showing essential weather details like temperature and weather conditions for each day.

### `Unit Switching (Celsius/Fahrenheit)`:
Users can toggle between Celsius and Fahrenheit for temperature units using a switch component.

### `Pull-to-Refresh`:
Supports a pull-to-refresh mechanism on mobile devices, allowing users to refresh the weather data by pulling down on the screen.

### `Offline Storage`:
If the user’s city was previously searched, the app retrieves the data from localStorage to minimize unnecessary API calls and improve performance when offline.

### `Loading Indicators`:
Displays a loading spinner when fetching data to improve the user experience during API calls.

### `Assumptions`:
Stored an array of cities and filtered those cities based on the users input. If city is not found in the stored list the user has a choice to enter the city manually and check weather.

## Workflow:
First the application loads the weather information for a default city (New York). The application displays the weather for the current day and next five days. Now to change the city I click on the input 'Enter a city' which opens a modal with a dropdown. Now once the user starts entering a value in the input cities will get filtered accordingly from the dropdown. Now if the user is able to find the city from the dropdown the user may click on the city in the dropdown. If not the user can continue typing the complete city name and press search. If the city name entered by the user is valid the weather for that city will show up. If not approprate error handling has been done.

If the internet suddenly disconnects the application will display the weather for the latest city stored in localStorage on reload. Caching has been implemented to store the weather data for the last city in localStorage. Considering another case where I initally don't have an internet connection and I start the application, I won't be able to search any city and appropriate error handling has been done. 

A spinning loader has been implented. Whenever an api call is being made and the result hasn't been retrieved from the server a spinner is rotating. Pull to refresh has also been implemented for mobile devices. On pulling the application downwards a refresh is initiated.



