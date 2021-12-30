import { apiConf } from '../../components/configuration/api';

/**
 * pageDispatch Takes a keyed object and dispatches it to the correlation func
 * @type {{showHistory}, {showQueue}, {showCalendar}, {showCatalog}, {movieCatalog}}
 * @return @returns {object} result of api request
 */
const pageDispatch = {
    showCalendar: ({ sonarr }, range) =>
        createBaseString(sonarr, '/calendar') + '&start=' + getDate(range)[0] + '&end=' + getDate(range)[1],
    showHistory: ({ sonarr }, range) =>
        createBaseString(sonarr, '/history') + '&pageSize=' + (range || 30),
    downloadQueue: ({ sonarr }) => createBaseString(sonarr,'/queue'),
    showCatalog: ({ sonarr }) => createBaseString(sonarr, '/series'),
    showWanted: ({ sonarr }) => createBaseString(sonarr, '/wanted/missing'),
    movieCatalog: ({ radarr }) => createBaseString(radarr, '/movie')
};
/**
 * Creates a request string for the api get request
 * @param obj The base request string
 * @param path The API path
 * @return {string} A request string
 */
const createBaseString =
    (obj, path) => obj.URL + path +  '?apikey=' + obj.key;

/**
 * Returns two dates separated by the range indicated by the range param
 * @param range
 * @return {[string, string]}
 */
const getDate = range => {
    let now = new Date(),
        startString = (now.getMonth() + 1) + now.getFullYear() + "-" + "-" + (now.getDate()),
        end = new Date((new Date()).setDate(now.getDate() + (range || 7))),
        endString = end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + (end.getDate());
    return [startString,endString]
};

/**
 * getDataByType Takes and returns the results of fetching a specific API route
 * @param type An API route
 * @param range A parameter for the API call
 * @return {Promise<any>}
 */
export const getDataByType = async (type, range) => {
    const response = await fetch(pageDispatch[type](apiConf, range));
    return [{[type] : await response.json()}]
};

export const postCommand = async (command) => {
    const myHeaders = new Headers();
    myHeaders.append("X-Api-Key", apiConf.sonarr.key);
    myHeaders.append("Content-Type", "application/javascript");

    const raw = JSON.stringify({"name": command});

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const res = await fetch(apiConf.sonarr.base + "/sonarr/api/command", requestOptions);
    return await res.json();

};
