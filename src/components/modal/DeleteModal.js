import React, { useState } from "react";
import "./BookModal.css";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

export function DeleteModal(props) {
  const [showModal, setShow] = useState(false);

  function DeleteHandler() {
    fetch(`http://localhost:5000/admin/${props.label}/${props.val._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        props.change(true);

        setShow(false);
      });
  }

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
  };

  return (
    <div className="ipField">
      <Button variant="primary" onClick={handleShow} className="openBtn">
        Delete
      </Button>
      <Modal show={showModal} onHide={handleClose} className="myModal">
        <Modal.Body>
          <h1>Are you sure you want to delete?</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <br></br>
          <Button variant="primary" onClick={DeleteHandler}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
