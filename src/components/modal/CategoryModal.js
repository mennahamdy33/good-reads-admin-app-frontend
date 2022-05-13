
  import React, { useState, useRef } from "react";
  import "./CategoryModal.css";
  import { Modal } from "react-bootstrap";
  import "bootstrap/dist/css/bootstrap.min.css";
  import {
    Form,
    Button,
  
  } from "react-bootstrap";

  function CategoryModal(props) {
    const [showModal, setShow] = useState(false);

    // const bookNameInputRef = useRef();
    const categoryInputRef = useRef();
    // const authorInputRef = useRef();

    function submitHandler(event) {
      event.preventDefault();
      // const name = bookNameInputRef.current.value;
      const CategoryId = categoryInputRef.current.value;
      // const AuthorId = authorInputRef.current.value;
      // bookNameInputRef.current.value = "";
      categoryInputRef.current.value = "";
      const CategoryData = {
        // name,
        CategoryId,
        // AuthorId,
      };
      if(props.label === 'Add Category'){
      fetch("https://good-reads-server.herokuapp.com/admin/categories", {
        method: "POST",
        body: JSON.stringify(CategoryData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    }
    else{

        fetch(
            `https://good-reads-server.herokuapp.com/admin/categories/${props.category._id}`,
            {
              method: "PATCH",
              body: JSON.stringify(CategoryData),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Category Name: </Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="ex: Fiction"
                  autoFocus
                  ref={categoryInputRef}
                  defaultValue={ props.category.name }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={submitHandler}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  export default CategoryModal;