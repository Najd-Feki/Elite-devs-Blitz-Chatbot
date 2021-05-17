import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
};

const BASE_URL = 'http://localhost:3000/positions.json?search=';
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage };
    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get('http://localhost:5000/user/' + id, (err, res) => {
        console.log('res', res);
      })
      .then((Response) => {
        setUser(Response.data);
        console.log('user', Response.data);

        axios
          .get('http://localhost:5000/profile/' + Response.data.profile)

          .then((res) => {
            setProfile(res.data);

            console.log('profile', res.data);
          });
      });
    const cancelToken1 = axios.CancelToken.source();

    dispatch({ type: ACTIONS.MAKE_REQUEST });

    /*  setInterval(() => { */
    if (profile) {
      axios
        .get(BASE_URL + profile.education, {
          cancelToken: cancelToken1.token,
          params: { markdown: true, page: page, ...params },
        })
        .then((res) => {
          dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
        });

      const cancelToken2 = axios.CancelToken.source();
      axios
        .get(BASE_URL, {
          cancelToken: cancelToken2.token,
          params: { markdown: true, page: page + 1, ...params },
        })
        .then((res) => {
          dispatch({
            type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
            payload: { hasNextPage: res.data.length !== 0 },
          });
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
        });

      console.log('hello');
      return () => {
        cancelToken1.cancel();
        cancelToken2.cancel();
      };
    }
    /*   }, 5000); */
  }, [params, page]);

  return state;
}
