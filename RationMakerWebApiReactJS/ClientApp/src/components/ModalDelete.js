import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalSuccess from "./ModalSuccess";

function ModalDelete(args) {
    const [modal, setModal] = useState(false);
    const [resultState, setResultState] = useState(false);
    const toggle = () => setModal(!modal);
    const toggleSuccess = () => {
        setModal(!modal);
        setResultState(!resultState);
    }
    const deleteProduct = () => {
        fetch(`product/delete/${args.product.id}`, {
            "method": "DELETE"
        })
            .then(response => response.ok)
            .then(response => {
                response ? toggleSuccess() : console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }
    

    return (
        <div>
            <Button size="sm" color="danger" onClick={toggle}>
                Delete
            </Button>
            {/*<ModalSuccess state={resultState}/>*/}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Delete item</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete "{args.product.name}"?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={deleteProduct}>
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