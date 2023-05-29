// @ts-nocheck
import { useContext } from "react";
import { useReducer } from "react";
import { Outlet } from "react-router-dom";

const { createContext } = require("react");

const ModalContext = createContext(null);

export function ModalProvider() {
  const [state, dispatch] = useReducer(modalReducer, {
    payload: null,
    fetchStatus: "empty",
  });

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      <Outlet />
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}

function modalReducer(state, action) {
  switch (action.type) {
    case "SET_PAYLOAD": {
      return {
        ...state,
        payload: action.payload,
      };
    }
    case "SET_STATUS": {
      return {
        ...state,
        fetchStatus: action.payload,
      };
    }
    case "RESET_STATUS": {
      return {
        ...state,
        fetchStatus: "empty",
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
