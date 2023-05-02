import React, { useEffect, useState } from "react";
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
import useApiCallOnMount from "../../service/useApiCallOnMount";

function ModalDelete(args) {
  const [modal, setModal] = useState(false);
  const dispatch = useProductsDispatch();
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [alert, setAlert] = useState(true);
  const [alertDismiss, setAlertDismiss] = useState("");

  const toggle = () => setModal(!modal);

  const alertToggle = (status) => {
    setAlert(!alert);
    setAlertDismiss(status);
  };

  useEffect(() => {
    if (alertDismiss === "deleted") {
      dispatch({
        type: "deleted",
        id: args.product.id,
      });
    }
  }, [alertDismiss]);

  const handleDelete = () => {
    deleteProduct(args.product.id)
      .then((response) => response.ok)
      .then((status) => {
        setDeleteStatus(status);
      });
  };

  return (
    <div>
      <Button size="sm" color="danger" onClick={toggle}>
        Delete
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete item</ModalHeader>
        <ModalBody>
          Are you sure you want to delete "{args.product.name}"?
          {deleteStatus ? (
            <Alert isOpen={alert} toggle={() => alertToggle("deleted")}>
              {args.product.name} successfully deleted!
            </Alert>
          ) : deleteStatus === false ? (
            <Alert
              color="warning"
              isOpen={alert}
              toggle={() => alertToggle("errored")}
            >
              Error. Cant delete this item
            </Alert>
          ) : undefined}
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              handleDelete();
            }}
          >
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

export default ModalDelete;
