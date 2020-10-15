import { useReducer, useEffect } from 'react';
import axios from 'axios';

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
} 

var reducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {jobs: [], loading: true}
        case ACTIONS.GET_DATA:
            return {...state, loading: false, jobs: action.payload.jobs}
        case ACTIONS.ERROR:
            return {...state, loading: false, error: action.payload.error, jobs: []}
        default:
            return state
    }
}

export default function FetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, {jobs: [], loading: true})

    const cors = 'https://cors-anywhere.herokuapp.com/'
    const BASE_URL = `${cors}https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json`

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        dispatch({type: ACTIONS.MAKE_REQUEST})
        axios.get(BASE_URL, {
            cancelToken: cancelToken.token,
            params: { markdown: true, page: page, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } }) 
        }).catch(e => {
            if(axios.isCancel(e)) return
            dispatch({ type: ACTIONS.ERROR, payload: { jobs: e } }) 
        })

        return () => {
            cancelToken.cancel()
        }

    }, [params, page, BASE_URL])
    return state
}
