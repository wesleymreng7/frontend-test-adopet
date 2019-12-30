import { useReducer, useEffect } from 'react';
import axios from 'axios';

axios.defaults.validateStatus = code => code < 500;


const INITIAL_STATE = {
    loading: false,
    data: {},
    error: '',
    code: null
};

const reducer = (state:any, action:any) => {
    if (action.type === 'REQUEST') {
        return {
            ...state,
            data:{},
            loading: true
        };
    }
    if (action.type === 'SUCCESS') {
        return {
            ...state,
            error:'',
            loading: false,
            data: action.data
        };
    }
    if (action.type === 'FAILURE') {
        return {
            ...state,
            loading: false,
            error: action.error,
            code: action.error
        };
    }
    return state;
}


const getAuth = () => {
    const token = localStorage.getItem('token');
    if(token) {
        return '?auth=' + token;
    }
    return '';
}
const init = (baseUrl:string) => {
    const useGet = (resource:string) => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
        const loading = async () => {
            dispatch({ type: 'REQUEST' });
            try {
                const res = await axios.get(baseUrl + resource + '.json' + getAuth());
                if(res.data.error && Object.keys(res.data.error).length > 0) {
                    dispatch({ type: 'FAILURE', error: res.data.error });
                } else {
                    dispatch({ type: 'SUCCESS', data: res.data });
                    return res.data;
                }
                
            } catch(e) {
                dispatch({ type: 'FAILURE', error: 'error loading data'});
            }
        }
        useEffect(() => {
            loading();
        }, [resource]);
        return {
            ...data,
            refetch: loading
        };
    }
    const usePost = (resource:string, token?: string) => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
        const post = async (data:any) => {
            dispatch({ type: 'REQUEST' })
            try {
                const res = await axios.post(baseUrl + resource, data, {
                    headers: {'Authorization': "Bearer " + token}
                });
                if(res.data.message) {
                    dispatch({ type: 'FAILURE', error: res.data.message });
                } else {
                    dispatch({ type: 'SUCCESS', data: res.data });
                    return res.data;
                }
                
            } catch(e) {
                dispatch({ type: 'FAILURE', error: 'error loading data'});
            }
        }
        return [data, post];
    }

    return {
        useGet,
        usePost
    };
}

export const usePost = (resource: string) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const post = async (data:any) => {
        dispatch({ type: 'REQUEST' });
        try {
            const res = await axios.post(resource, data);
            if(res.data.error && Object.keys(res.data.error).length > 0) {
                dispatch({ type: 'FAILURE', error: res.data.error.messsage });
            } else {
                dispatch({ type: 'SUCCESS', data: res.data });
                return res.data;
            }
        } catch (e) {
            dispatch({ type: 'FAILURE', error: 'unknown error' })
        }
    }
    return [data, post];
}


export default init;