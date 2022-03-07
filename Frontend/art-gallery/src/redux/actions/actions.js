import axios from "axios";
import {
  GET_PAITINGS,
  GET_REVIEWS,
  GET_ARTIST,
  GET_TECHNIQUE,
  GET_OBRAID,
  GET_OBRAIDRANDON,
  SET_LOGIN,
  SET_LOGOUT
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

export const setLogin = (payload) => {
  return {
    type: SET_LOGIN,
    payload
  }
}

export const setLogout = (payload) => {
  return{
    type: SET_LOGOUT,
    payload
  }
}

export const getObraDetail = (id) => {
  return async (dispatch) => {
    try {
      let resp = await fetch(`http://localhost:3001/painting/get/${id}`);
      let data = await resp.json();
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
      let resp = await fetch(
        `http://localhost:3001/painting/getrecommended/${id}`
      );
      let data = await resp.json();
      dispatch({
        type: GET_OBRAIDRANDON,
        payload: data,
      });
    } catch (error) {
      console.log("Id not found");
    }
  };
};
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
