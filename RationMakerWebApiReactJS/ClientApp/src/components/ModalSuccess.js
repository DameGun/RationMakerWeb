import React, { useState } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';

function ModalSuccess(args) {
    const [modal, setModal] = useState(false);
    setModal(args.state);
    const toggle = () => setModal(!modal);
    
    return (
        <div>
            done!
            {/*<Button size="sm" color="success" onClick={toggle}>
                {args.type}
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit item</ModalHeader>
                <ModalBody>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="success">
                        Ok
                    </Button>
                </ModalFooter>
            </Modal>*/}
        </div>
    );
}

export default ModalSuccess;