import posterPlaceholderImg from '../../images/poster-placeholder.jpg'
import bannerPlaceholderImg from "../../images/banner-placeholder.jpg";

/**
 * parserDispatch Takes a keyed object and dispatches it to the correlation func
 * @type {{showHistory}, {showQueue}, {showCalendar}, {showCatalog}, {movieCatalog}}
 * @returns {object} The parsed results of the received object
 */
const parserDispatch = {
    showCalendar: shows => ({
            showCalendar : shows.map(show => {
                return {
                    id: show.id,
                    date: show.airDateUtc,
                    name: show.series.title,
                    title: show.title,
                    episodeNumber: show.episodeNumber,
                    status: show.series.status,
                    hasFile: show.hasFile,
                    URL: process.env.REACT_APP_SONARR_BASE_URL + '/sonarr/series/' + show.series.titleSlug,
                    img: filterPosters(show.series.images)
                }
            })
    }),
    showHistory: ({ records }) => ({
        showHistory : records.filter(value => value.eventType === 'downloadFolderImported')
            .map(show => {
            return {
                id: show.id,
                showId: show.seriesId,
                episodeId: show.episodeId,
                date: show.episode.airDateUtc,
                downloaded: Math.round(new Date(show.date).getTime() / 1000),
                name: show.series.title,
                title: show.episode.title,
                episodeNumber: show.episode.episodeNumber,
                seasonNumber: show.episode.seasonNumber,
                showFormatNumber: buildEpisodeNum(show.episode.seasonNumber, show.episode.episodeNumber),
                img: filterPosters(show.series.images),
                URL: process.env.REACT_APP_SONARR_BASE_URL + '/sonarr/series/' + show.series.titleSlug,
                otherEpisodes: []
            }
        })
    }),
    showQueue: downloads => ({
        showQueue : downloads.map(show => {
            return {
                id: show.id,
                title: show.series.title,
                episode: buildEpisodeNum(show.episode.seasonNumber, show.episode.episodeNumber),
                percentComplete: calcPercent(show.size, show.sizeleft),
                banner: filterBanner(show.series.images)
            }
        })
    }),
    showCatalog: shows => ({
        showCatalog : shows.map(show => {
            show.images = filterPosters(show.images).indexOf('static') === -1
                ? process.env.REACT_APP_SONARR_BASE_URL + filterPosters(show.images)
                : filterPosters(show.images);

            show.URL = process.env.REACT_APP_SONARR_BASE_URL + '/sonarr/series/' + show.titleSlug;
            return show
        })
    }),
    movieCatalog: movies => ({
        movieCatalog : movies.map(movie => {
            movie.images = filterPosters(movie.images).indexOf('static') === -1
                ? process.env.REACT_APP_RADARR_BASE_URL + filterPosters(movie.images)
                : filterPosters(movie.images);
            movie.URL = process.env.REACT_APP_RADARR_BASE_URL + '/radarr/movie/' + movie.titleSlug
            return movie
        })
    })
}
/**
 * sortDuplicates Takes a showHistory object and sorts any duplicate into an array inside that object
 * @param data
 * @returns {*}
 */
const sortDuplicates = data => {
    data.showHistory = Object.values(
        data.showHistory.reduce((acc, next) => {
            (acc[next.showId] || (acc[next.showId] = [])).push(next);
            return acc
        }, {}))
        .reduce((acc, next) => {
            if (next.length === 1) {
                return acc.concat(next);
            } else {
                for (let i = 1; i < next.length; i++) {
                    next[0].otherEpisodes.push(next[i]);
                }
                return acc.concat(next[0]);
            }
        },[])
        .sort((a,b) => (a.downloaded > b.downloaded) ? -1 : ((b.downloaded > a.downloaded) ?  1 : 0));
    return data
}
/**
 * Filters out images that are not of the type poster and replaces
 * missing images with a placeholder image
 * @param imageObj is an array of object of different types
 * @returns {string} a URL of the wanted image location
 */
const filterPosters = imageObj => {
    if (typeof imageObj !== 'string') {
        const posters = imageObj.filter(img => img.coverType === 'poster')[0]?.url;
        return posters === undefined ? posterPlaceholderImg : posters
    } else {
        return imageObj
    }
}
/**
 * Filters out images that are not of the type banner and replaces
 * missing images with a placeholder image
 * @param imageObj is an array of object of different types
 * @returns {string} a URL of the wanted image location
 */
const filterBanner = imageObj => {
    const banners = imageObj.filter(img => img.coverType === 'banner')[0]?.url;
    return banners === undefined ? bannerPlaceholderImg : banners
};
/**
 * Formats episode and season numbers into S00E00
 * @param season season number
 * @param episode episode number
 * @return {string}
 */
const buildEpisodeNum = (season, episode) => {
    return 'S' + (season.toString().length > 1 ? season : '0' + season) +
        'E' + (episode.toString().length > 1 ? episode : '0' + episode)
}

/**
 * Calculates download percentage
 * @param total the total file size
 * @param amount the amount that has been downloaded
 * @return {string}
 */
const calcPercent = (total, amount) => Math.round(((total - amount) / total) * 100) + "%";

/**
 * parseResults takes an object, deconstructs its keys and send it to the parserDispatch
 * @param data
 * @return {object}
 */
const parseResults = data => {
    const results = data.map(res => {
        const key = Object.keys(res)[0];
        if (key === 'showHistory') {
            return sortDuplicates(parserDispatch[key](res[key]))
        } else {
            return parserDispatch[key](res[key])
        }
    })
    return results
}


export default parseResults;