import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
const MyModal = ({ show, closeModal, title, body, leftBtnText, rightBtnText, submit }) => {

    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{title ?? "title"}</Modal.Title>
            </Modal.Header>
            <Modal.Body >{body ?? "body"}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    {leftBtnText ?? "left btn text"}
                </Button>
                <Button variant="primary" onClick={() => { closeModal(), submit() }}>
                    {rightBtnText || "right btn text"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MyModal