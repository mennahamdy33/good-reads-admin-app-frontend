import React, { useState, useRef } from "react";
import "./AuthorModal.css";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FileBase64 from "react-file-base64";

import { Form, Button } from "react-bootstrap";

function AuthorModal(props) {
  const [showModal, setShow] = useState(false);

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const dobInputRef = useRef();
  const [image, setImage] = useState("");
  function submitHandler(event) {
    event.preventDefault();
    const firstName = firstNameInputRef.current.value;
    const lastName = lastNameInputRef.current.value;
    const dateOfBirth = dobInputRef.current.value;
    const authorData = {
      firstName,
      lastName,
      dateOfBirth,
      image,
    };
    if (props.label === "Add") {
      fetch("http://localhost:5000/admin/authors", {
        method: "POST",
        body: JSON.stringify(authorData),
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    } else {
      if (authorData.image === "") {
        delete authorData.image;
      }

      fetch(`http://localhost:5000/admin/authors/${props.author._id}`, {
        method: "PATCH",
        body: JSON.stringify(authorData),
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    }

    props.change(true);

    setShow(false);
  }

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
  };

  return (
    <div className="ipField">
      <Button variant="primary" onClick={handleShow} className="openBtn">
        {props.label}
      </Button>
      <Modal show={showModal} onHide={handleClose} className="myModal">
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name: </Form.Label>
              <Form.Control
                type="textarea"
                placeholder="ex: Joanne"
                autoFocus
                ref={firstNameInputRef}
                defaultValue={props.author.firstName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name: </Form.Label>
              <Form.Control
                type="textarea"
                placeholder="ex: Rowling"
                autoFocus
                ref={lastNameInputRef}
                defaultValue={props.author.lastName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div>
                <div className="row">
                  <div className="col-md-4">
                    <Form.Group controlId="dob">
                      <Form.Label>Select Date:</Form.Label>
                      <Form.Control
                        ref={dobInputRef}
                        defaultValue={props.author.dateOfBirth}
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Photo: </Form.Label>
              <div className="input-group">
                <div className="custom-file">
                  <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => {
                      setImage(base64);
                    }}
                  />{" "}
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <br></br>
          <Button variant="primary" onClick={submitHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default AuthorModal;
