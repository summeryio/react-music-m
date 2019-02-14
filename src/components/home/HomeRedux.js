import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    banners: [],
    playLists: [],
    albums: [],
    songs: [],
    ranks: []
}

const GET_BANNER = 'm-music/HomeRedux/GET_BANNER'
const GET_PLAY_LIST = 'm-music/HomeRedux/GET_PLAY_LIST'
const GET_ALBUM = 'm-music/HomeRedux/GET_ALBUM'
const GET_SONG = 'm-music/HomeRedux/GET_SONG'
const GET_RANK = 'm-music/HomeRedux/GET_RANK'

export const getBanner = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/banner`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            res.data.banners = res.data.banners.filter(banner => {
                let type = parseInt(banner.targetType)
                
                if (type === 1 || type === 10 || type === 1000) {
                    return true
                }
            })

            dispatch({
                type: GET_BANNER,
                banners: res.data.banners
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getPlayList = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/personalized?limit=9`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_PLAY_LIST,
                playLists: res.data.result
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getAlbum = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/top/album?limit=9`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_ALBUM,
                albums: res.data.albums
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getSong = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/playlist/detail?id=3779629`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            res.data.playlist.tracks = res.data.playlist.tracks.filter((item, i) => {
                return i < 50
            })
            
            dispatch({
                type: GET_SONG,
                songs: res.data.playlist.tracks
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getRank = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/toplist`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_RANK,
                ranks: res.data.list
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export default function home(state = initialState, action) {
    let {
        type,
        banners,
        playLists,
        albums,
        songs,
        ranks
    } = action

    switch (type) {
        case GET_BANNER:
            return {...state, banners}
            break
        case GET_PLAY_LIST:
            return {...state, playLists}
            break
        case GET_ALBUM:
            return {...state, albums}
            break
        case GET_SONG:
            return {...state, songs}
            break
        case GET_RANK:
            return {...state, ranks}
            break

        default:
            return state
    }
}