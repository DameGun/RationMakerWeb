import React from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useModal } from "../../context/ModalContext";
import { useProductsDispatch } from "../../context/DataContext";
import { useMealPlansDispatch } from "../../context/MealPlansContext";
import { submitForm } from "../../service/SubmitForm";

export function ModalWrapper({
  modalHeader,
  service,
  dispatchType,
  dispatchName,
  button,
  children,
}) {
  const [modal, setModal] = useState(false);
  const modalContext = useModal();
  const productsDispatch = useProductsDispatch();
  const mealPlansDispatch = useMealPlansDispatch();

  function toggle() {
    onClose();
    modalContext.dispatch({ type: "RESET_STATUS" });
    setModal(!modal);
  }

  async function handleSubmit() {
    try {
      const response = await submitForm(service, modalContext.state.payload);
      console.log("response: ", response);
      modalContext.dispatch({
        type: "SET_STATUS",
        payload: "success",
      });
      modalContext.dispatch({
        type: "SET_PAYLOAD",
        payload: response,
      });
    } catch (err) {
      modalContext.dispatch({
        type: "SET_STATUS",
        payload: "error",
      });
    }
  }

  function onClose() {
    if (modalContext.state.fetchStatus === "success") {
      switch (dispatchType) {
        case "product": {
          productsDispatch({
            type: dispatchName,
            payload: modalContext.state.payload,
          });
          break;
        }
        case "mealplan": {
          mealPlansDispatch({
            type: dispatchName,
            payload: modalContext.state.payload,
          });
          break;
        }
        case "empty":
          break;
        default: {
          throw Error("Unknown dispatch type: " + dispatchType);
        }
      }
    }
  }

  return (
    <div>
      <div onClick={toggle}>{button}</div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalHeader}</ModalHeader>
        <ModalBody>
          {children}
          {modalContext.state.fetchStatus === "success" && (
            <Alert color="success" isOpen={true}>
              Success!
            </Alert>
          )}
          {modalContext.state.fetchStatus === "error" && (
            <Alert color="warning" isOpen={true}>
              Error!
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={handleSubmit}
            disabled={modalContext.state.payload === null ? true : undefined}
          >
            Submit
          </Button>
          <Button onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
