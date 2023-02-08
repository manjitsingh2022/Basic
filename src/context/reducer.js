export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isloading: true,
      };
    case "REMOVE_POST":
      return {
        ...state,
        hits: state.hits.filter((curElem) => curElem._id !== action.payload),
      };
    case "GET_ADVERTISEMENTS":
      return {
        ...state,
        isloading: false,
        page: action.payload.page,
        hits: action.payload.hits,
        // nbpages: action.payload.nbpages,
      };
    case "SEARCH_QUERY":
      return {
        ...state,
        name: action.payload,
      };
    case "SEARCH_ADDRESSQUERY":
      return {
        ...state,
        address: action.payload,
      };
    case "PREV_PAGE":
      let pageNumber = state.page;
      if (pageNumber <= 0) {
        pageNumber = 0;
      } else {
        pageNumber = pageNumber + 1;
      }

      return {
        ...state,
        page: state.page - 1,
      };
    case "NEXT_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };

    default:
      return state;
  }
};
