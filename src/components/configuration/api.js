export const apiConf = {
    'sonarr': {
        'URL': process.env.REACT_APP_SONARR_API_URL,
        'key': 'apikey=' + process.env.REACT_APP_SONARR_API_KEY
    },
    'radarr': {
        'URL': process.env.REACT_APP_RADARR_API_URL,
        'key': 'apikey=' + process.env.REACT_APP_RADARR_API_KEY
    }
};
