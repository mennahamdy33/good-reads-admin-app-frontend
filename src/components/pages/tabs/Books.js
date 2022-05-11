import React, { useState, useEffect, useRef } from "react";
import "./Books.css";
import Home from "./Home";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,

} from "react-bootstrap";
import "./Modal.css";
function Books() {

  const [loadedbooks, setLoadedbooks] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [loadedAuthors, setLoadedAuthors] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  function getAuthors() {
    fetch("https://good-reads-server.herokuapp.com/admins/authors")
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setLoadedAuthors(data);
      });
  }
  function getCategories() {
    fetch("https://good-reads-server.herokuapp.com/admins/categories")
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setLoadedCategories(data);
      });
  }

  function DeleteHandler(val) {
    fetch(`https://good-reads-server.herokuapp.com/admins/books/${val._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setIsChanged(true);

      });
  }

  useEffect(() => {
    fetch("https://good-reads-server.herokuapp.com/admins/books")
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setIsLoading(false);
        setLoadedbooks(data);
      });
    setIsChanged(false);
    getCategories();
    getAuthors();
  }, [isChanged]);

  if (isLoading) {
    return (
      <Home active="Books">
        <section>Loading...</section>
      </Home>
    );
  }

  function BookInput({ label = "Add Book" }) {
    const [showModal, setShow] = useState(false);

    const bookNameInputRef = useRef();
    const categoryInputRef = useRef();
    const authorInputRef = useRef();

    function submitHandler(event) {
      event.preventDefault();
      const name = bookNameInputRef.current.value;
      const CategoryId = categoryInputRef.current.value;
      const AuthorId = authorInputRef.current.value;
      bookNameInputRef.current.value = "";
      categoryInputRef.current.value = "";
      const bookData = {
        name,
        CategoryId,
        AuthorId,
      };

      fetch("https://good-reads-server.herokuapp.com/admin/books", {
        method: "POST",
        body: JSON.stringify(bookData),
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
      setIsChanged(true);

      setShow(false);
    }

    const handleClose = () => setShow(false);
    const handleShow = async () => {
      setShow(true);
    };

    return (
      <div className="ipField">
        <Button variant="primary" onClick={handleShow} className="openBtn">
          Add Book
        </Button>
        <Modal show={showModal} onHide={handleClose} className="myModal">
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Book Name: </Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="ex: Harry Potter"
                  autoFocus
                  ref={bookNameInputRef}
                  requried
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Select
                  ref={categoryInputRef}
                  aria-label="Default select example"
                >
                  <option>Category</option>
                  {loadedCategories.map((val) => {
                    return <option value={val._id}>{val.name} </option>;
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Select
                  ref={authorInputRef}
                  aria-label="Default select example"
                >
                  <option>Author</option>

                  {loadedAuthors.map((val) => {
                    return (
                      <option value={val._id}>
                        {val.firstName} {val.lastName}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Image: </Form.Label>
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                    />
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

  function EditButton(props) {
    const [showModalEdit, setShowEdit] = useState(false);

    const bookNameInputRef = useRef();
    const categoryInputRef = useRef();
    const authorInputRef = useRef();
    function submitHandler(event) {
      event.preventDefault();
      const name = bookNameInputRef.current.value;
      const CategoryId = categoryInputRef.current.value;
      const AuthorId = authorInputRef.current.value;
      bookNameInputRef.current.value = "";
      categoryInputRef.current.value = "";
      const bookData = {
        name,
        CategoryId,
        AuthorId,
      };

      fetch(
        `https://good-reads-server.herokuapp.com/admin/books/${props.book._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(bookData),
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
      setIsChanged(true);

      setShowEdit(false);
    }

    const handleClose = () => setShowEdit(false);
    const handleShow = () => {
      setShowEdit(true);
    };

    return (
      <div className="ipField">
        <Button variant="primary" onClick={handleShow} className="openBtn">
          edit Book
        </Button>
        <Modal show={showModalEdit} onHide={handleClose} className="myModal">
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Book Name: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ex: Harry Potter"
                  autoFocus
                  ref={bookNameInputRef}
                  defaultValue={props.book.name}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Select
                  ref={categoryInputRef}
                  aria-label="Default select example"
                  defaultValue={props.book.CategoryId}
                >
                  <option>Category</option>
                  {loadedCategories.map((val) => {
                    return <option value={val._id}>{val.name} </option>;
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Select
                  ref={authorInputRef}
                  aria-label="Default select example"
                  defaultValue={props.book.AuthorId}
                >
                  <option>Author</option>

                  {loadedAuthors.map((val) => {
                    return (
                      <option value={val._id}>
                        {val.firstName} {val.lastName}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Image: </Form.Label>
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                    />
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
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  return (
    <Home active="Books">
      <div>
        <BookInput />

        <div className="App">
          <table>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Name</th>
              <th>CategoryID</th>
              <th>AuthorID</th>
              <th>Actions</th>
            </tr>
            {loadedbooks.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{val.photo}</td>
                  <td>{val.name}</td>

                  <td>{val.category[0].name}</td>

                  <td>
                    {val.author[0].firstName} {val.author[0].lastName}
                  </td>
                  <td>
                    <button
                      className="xBtn"
                      onClick={() => {
                        DeleteHandler(val);
                      }}
                    >
                      x
                    </button>
                    <EditButton book={val} />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </Home>
  );
}
export default Books;
