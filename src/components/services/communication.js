import { apiConf } from '../configuration/api'

/**
 * pageDispatch Takes a keyed object and dispatches it to the correlation func
 * @type {{showHistory}, {showQueue}, {showCalendar}, {showCatalog}, {movieCatalog}}
 * @return @returns {object} result of api request
 */
const pageDispatch = {
    showCalendar: ({ sonarr }, range) =>
        createBaseString(sonarr, '/calendar?') + '&start=' + getDate(range)[0] + '&end=' + getDate(range)[1],
    showHistory: ({ sonarr }, range) =>
        createBaseString(sonarr, '/history?') + '&pageSize=' + (range || 30),
    showQueue: ({ sonarr }) => createBaseString(sonarr,'/queue?'),
    showCatalog: ({ sonarr }) => createBaseString(sonarr, '/series?'),
    movieCatalog: ({ radarr }) => createBaseString(radarr, '/movie?')
}
/**
 * Creates a request string for the api get request
 * @param obj The base request string
 * @param path The API path
 * @return {string} A request string
 */
const createBaseString = (obj, path) => obj.URL + path + obj.key

/**
 * Returns two dates separated by the range indicated by the range param
 * @param range
 * @return {[string, string]}
 */
const getDate = range => {
    let now = new Date(),
        startString = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + (now.getDate()),
        end = new Date((new Date()).setDate(now.getDate() + (range || 7))),
        endString = end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + (end.getDate());
    return [startString,endString]
}

/**
 * getDataByType Takes and returns the results of fetching a specific API route
 * @param type An API route
 * @param range A parameter for the API call
 * @return {Promise<any>}
 */
export const getDataByType = async (type, range) => {
    const response = await fetch(pageDispatch[type](apiConf, range));
    return await response.json()
}

/**
 * getDataByAPI Takes and returns the results of fetching a specific API by type i.e movie to tv show
 * @param type An array of API routes
 * @return {Promise<any[]>}
 */
export const getDataByAPI = async (type) => {
    const response = await Promise.all(Object.keys(pageDispatch)
        .filter(page => page.includes(type))
        .map(async page => ({[page] : await fetch(pageDispatch[page](apiConf))}))
    )
    return await Promise.all(response.map(async res => ({[Object.keys(res)[0]] : await res[Object.keys(res)].json()})))
}

/**
 * getData Takes and returns the results of fetching all API that are defined
 * @return {Promise<{}[]>}
 */
export const getData = async () => {
    const response = await Promise.all(Object.keys(pageDispatch)
        .map(async page => ({[page] : await fetch(pageDispatch[page](apiConf))}))
    )

    return await Promise.all(response.map(async res => ({[Object.keys(res)[0]] : await res[Object.keys(res)].json()})))
}