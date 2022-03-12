import axios from "axios";
import {
  GET_OBRAID,
  GET_OBRAIDRANDON,
  GET_PAITINGS,
  GET_PAINTINGS_BY_ARTIST,
  GET_REVIEWS,
  GET_ARTIST_ID,
  GET_ARTIST,
  GET_TECHNIQUE,
  GET_SEARCH,
  POST_FAVS,
  DELETE_FAVS,
  GET_USER_ADMIN,
  ORDER_BY_A_Z,
  UN_BANNED,
  ORDER_BY_TYPE,
} from "../action-types/index.js";

export function getPaintings(filters) {
  return async function (dispatch) {
    /*    console.log(filters); */
    try {
      let json;

      !filters
        ? (json = await axios.get("http://localhost:3001/painting/getall"))
        : (json = await axios.get("http://localhost:3001/painting/search", {
          params: {
            ...filters,
            artist: filters?.artist?.join(","),
            technique: filters?.technique?.join(","),
          },
        }));
      return dispatch({
        type: GET_PAITINGS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//Trae los reviews
export function getReviews(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/review/getByArtist/" + id
      );
      //console.log('llego en reviews', json)
      dispatch({
        type: GET_REVIEWS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//Artista
export function getArtistById(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/artist/get/${id}`);
      dispatch({
        type: GET_ARTIST_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//pinturas por artista
export function getPaitingsByArtist(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/painting/search?artist=${id}`
      );
      //console.log(json)
      dispatch({
        type: GET_PAINTINGS_BY_ARTIST,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getObraDetail = (id) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.get(
        `http://localhost:3001/painting/get/${id}`
      );
      dispatch({
        type: GET_OBRAID,
        payload: data,
      });
    } catch (error) {
      console.log("Id not found");
    }
  };
};
export const getObrasRandon = (id) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.get(
        `http://localhost:3001/painting/getrecommended/${id}`
      );
      dispatch({
        type: GET_OBRAIDRANDON,
        payload: data,
      });
    } catch (error) {
      console.log("Id not found");
    }
  };
};

export function getArtist(name) {
  return async (dispatch) => {
    try {
      let json;
      !name
        ? (json = await axios.get("http://localhost:3001/artist/getAll"))
        : (json = await axios.get(
          `http://localhost:3001/artist/getbyname/?name=${name}`
        ));
      dispatch({ type: GET_ARTIST, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTechnique() {
  return async (dispatch) => {
    try {
      let json = await axios.get("http://localhost:3001/technique/getAll");
      dispatch({ type: GET_TECHNIQUE, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export const addNewArtist = (payload) => {
  return async function (dispatch) {
    try {
      const post = await axios.post(
        "http://localhost:3001/artist/create",
        payload
      );
      console.log(post);
      return post;
    } catch (err) {
      console.log(err);
    }
  };
};

export const addNewPainting = (payload) => {
  return async function (dispatch) {
    try {
      const post = await axios.post(
        "http://localhost:3001/painting/create",
        payload
      );
      console.log(post);
      return post;
    } catch (err) {
      console.log(err);
    }
  };
};
export function getSearchAuto(text) {
  return async (dispatch) => {
    try {
      console.log(text);
      if (!text) return dispatch({ type: GET_SEARCH, payload: "" });
      let json = await axios.get(
        `http://localhost:3001/painting/search/suggestions/${text}`
      );
      dispatch({ type: GET_SEARCH, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

//Post favs
export function postFav(id) {
  console.log("soy pintura n|", id);
  return async function (dispatch) {
    try {
      const json = await axios.post(
        `http://localhost:3001/favorites/add/${id}`
      );
      console.log("soy favs", json);
      return dispatch({
        type: POST_FAVS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}


// }
//Post favs
export function deleteFav(id) {
  console.log("soy delete de pintura n|", id);
  return async function (dispatch) {
    try {
      const json = await axios.delete(
        `http://localhost:3001/favorites/remove/${id}`
      );
      console.log("soy favs", json);
      return dispatch({
        type: DELETE_FAVS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export const getUserAdmin =  () => {
  return async (dispatch) => {

  try {
    const json = await axios.get(
      `http://localhost:3001/user/getall`
    );
    dispatch({
      type: GET_USER_ADMIN,
      payload: json.data
    })
    // console.log(json)
  } catch (error) {
    console.log(error)
  }

}
}
export const removeUser =  (id) => {
  return async (dispatch) => {
  try {
    const json = await axios.put(
      `http://localhost:3001/user/removeadmin/${id}`
    );
    dispatch(getUserAdmin())
  } catch (error) {
    console.log(error)
  }
}
}
export const giveUserAdmin =  (id) => {
  return async (dispatch) => {
  try {
    const json = await axios.put(
      `http://localhost:3001/user/giveadmin/${id}`
    );
    dispatch(getUserAdmin())
  } catch (error) {
    console.log(error)
  }
}
}
export const banUser =  (id) => {
  return async (dispatch) => {
  try {
    const json = await axios.put(
      `http://localhost:3001/user/ban/${id}`
    );
    dispatch(getUserAdmin())
  } catch (error) {
    console.log(error)
  }
}
}
export function unBanUser(id) {
  return async function (dispatch)  {
  try {
    const json = await axios.put(
      `http://localhost:3001/user/unban/${id}`
    );
    console.log(json.data)
  return  dispatch(getUserAdmin())
  } catch (error) {
    console.log(error)
  }
}
}

export const resetPasswordUser =  (id) => {
  return async (dispatch) => {
  try {
    const json = await axios.put(
      `http://localhost:3001/user/passreset/${id}`
    );
    dispatch(getUserAdmin())
  } catch (error) {
    console.log(error)
  }
}
}
export const orderBySort =  (name) => {
  return async (dispatch) => {
  try {
    const json = await axios.get(
      `http://localhost:3001/user/getall?order=${name}`
    );
    dispatch({
      type: ORDER_BY_A_Z,
      payload: json.data
    })
  } catch (error) {
    console.log(error)
  }
}
}
export const orderBySortType =  (name) => {
  return async (dispatch) => {
  try {
    const json = await axios.get(
      `http://localhost:3001/user/getall?orderBy=${name}`
    );
    dispatch({
      type: ORDER_BY_TYPE,
      payload: json.data
    })
  } catch (error) {
    console.log(error)
  }
}
}