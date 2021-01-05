# Media portal
A portal for viewing the download state of media tracked by Sonarr or Radarr

#### Prerequisites
 * For development or build
 
    [nodejs](https://nodejs.org/en/)
    
    [React](https://reactjs.org/)
    
    [Docker](https://www.docker.com/)  -optional-
    
    
 * For deployment
 
    Any webserver

    
#### Building
With react - `npm run build`

With docker; 
- for production - Run the `docker-compose.prod.yml` file
- for development with live update - Run the `docker-compose.yml` file

#### Configuration file
There are two required files that need to be created:
 - `.env`  with the following information
 ```
    REACT_APP_SONARR_API_KEY = your_api_key

    REACT_APP_SONARR_API_URL = IP:PORT/API

    REACT_APP_SONARR_BASE_URL = IP:PORT
 ```
 - `config.json` with an array of links
 ```{
   "links": [
     {
       "id": 0,
       "name": "plex",
       "url": "http://URL/"
     }
   ]
 }
```