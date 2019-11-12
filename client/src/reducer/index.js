export const SEARCH_MOVIE_REQUEST = "SEARCH_MOVIE_REQUEST";
export const SEARCH_MOVIE_SUCCESS = "SEARCH_MOVIE_SUCCESS";
export const SEARCH_MOVIE_FAILURE = "SEARCH_MOVIE_FAILURE";

export const initialState = {
    loading: false,
    movies: null,
    error: null,
};

export const reducer =(state, action) => {
    switch (action.type) {
        case SEARCH_MOVIE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SEARCH_MOVIE_SUCCESS:
            return {
                ...state,
                loading: false,
                movies: action.payload,
            };
        case SEARCH_MOVIE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
