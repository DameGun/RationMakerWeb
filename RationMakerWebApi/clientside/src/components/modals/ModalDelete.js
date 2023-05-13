import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import { useProductsDispatch } from "../DataContext";
import { deleteProduct } from "../../service/ApiCalls";

export default function ModalDelete(args) {
  const [modal, setModal] = useState(false);
  const dispatch = useProductsDispatch();
  const [error, setError] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState("");
  const [alert, setAlert] = useState(true);

  function toggle() {
    setDeleteStatus("");
    setError(null);
    setModal(!modal);
  }

  function alertToggle() {
    setAlert(!alert);
    toggle();
    dispatch({
      type: "DELETE_PRODUCT",
      id: args.product.id,
    });
  }

  if (deleteStatus === "success") {
    return (
      <Modal isOpen={alert} toggle={alertToggle}>
        <ModalBody>
          <Alert isOpen={alert} toggle={alertToggle}>
            {args.product.name} successfully deleted!
          </Alert>
        </ModalBody>
      </Modal>
    );
  }

  async function handleDelete() {
    setDeleteStatus("submitting");
    try {
      await submitForm(deleteProduct, args.product.id);
      setDeleteStatus("success");
    } catch (err) {
      setDeleteStatus("error");
      setError(err);
    }
  }

  return (
    <div>
      <Button size="sm" color="danger" onClick={toggle}>
        Delete
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete item</ModalHeader>
        <ModalBody>
          Are you sure you want to delete "{args.product.name}"?
          {error != null && (
            <Alert color="warning" isOpen={true}>
              Error!
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export async function submitForm(service, data) {
  return new Promise(async (resolve, reject) => {
    let shouldError = await service(data);
    if (shouldError.ok) {
      resolve(shouldError.json());
    } else {
      reject({ response: shouldError });
    }
  });
}
