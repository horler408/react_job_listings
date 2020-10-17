import { useReducer, useEffect } from 'react';
import axios from 'axios';

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: 'update_has_next_page'
} 

var reducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {jobs: [], loading: true}
        case ACTIONS.GET_DATA:
            return {...state, loading: false, jobs: action.payload.jobs}
        case ACTIONS.ERROR:
            return {...state, loading: false, error: action.payload.error, jobs: []}
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return {...state, hasNextPage: action.payload.hasNextPage}
        default:
            return state
    }
}

export default function FetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, {jobs: [], loading: true})

    const cors = 'https://cors-anywhere.herokuapp.com/'
    const BASE_URL = `${cors}https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json`

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        
        dispatch({type: ACTIONS.MAKE_REQUEST})
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: { markdown: true, page: page, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } }) 
        }).catch(e => {
            if(axios.isCancel(e)) return
            dispatch({ type: ACTIONS.ERROR, payload: { jobs: e } }) 
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get(BASE_URL, {
            cancelToken: cancelToken2.token,
            params: { markdown: true, page: page + 1, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 } }) 
        }).catch(e => {
            if(axios.isCancel(e)) return
            dispatch({ type: ACTIONS.ERROR, payload: { jobs: e } }) 
        })

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
        }

    }, [params, page, BASE_URL])
    return state
}
