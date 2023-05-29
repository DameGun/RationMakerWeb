import { useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import React from "react";

export default function DeleteFunc({ data }) {
  const context = useModal();

  useEffect(() => {
    context.dispatch({
      type: "SET_PAYLOAD",
      payload: data.id,
    });
  }, []);

  return <>Are you sure you want to delete "{data.name}"</>;
}
