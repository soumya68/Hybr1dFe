import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useLocation, NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Loader from "./Loader";
import ReactHtmlParser from "react-html-parser";
import Toasters from "./Tosters";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const PostDetails = () => {
  const { state } = useLocation();
  const { id } = state;

  const [result, setResult] = useState(null);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [variant, setVariant] = useState("");

  const fetchData = (id) => {
    console.log(id);

    let url = `http://hn.algolia.com/api/v1/items/${id}`;
    console.log(url);
    axios({
      method: "GET",
      url,
    })
      .then((response) => {
        console.log(response);
        setResult(response.data);
        setMessage("Success");
        setMessageBody("Data found successfully");
        setVariant("Success");
        setToast(true);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Error");
        setMessageBody(error.message);
        setVariant("Danger");
        setToast(true);
      });
  };
  useEffect(() => {
    fetchData(id);
  }, []);
  function toastOff() {
    setToast(false);
  }
  setTimeout(toastOff, 3000);
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="justify-content-center">
        <Navbar.Brand style={{ color: "red", textAlign: "center" }}>
          POST DETAILS
        </Navbar.Brand>
        <Nav className="mr-auto" style={{ padding: "15px" }}>
          <NavLink to="/" style={{ paddingRight: "10px" }}>
            Home
          </NavLink>
        </Nav>
      </Navbar>

      <Container fluid>
        <Row>
          <Col xs={2}>
            {toast ? (
              <Toasters
                message={message}
                messageBody={messageBody}
                variant={variant}
              />
            ) : null}
          </Col>
          <Col xs={12}>
            {result == null ? (
              <Loader />
            ) : (
              <Table striped>
                <tbody>
                  <tr>
                    <td>Title</td>
                    <td>Points</td>
                    <td>Comments</td>
                  </tr>

                  <tr>
                    <td>
                      {result?.title == null ? (
                        <p>No title available</p>
                      ) : (
                        result.title
                      )}
                    </td>
                    <td>
                      {result?.points == null ? (
                        <p>No points available</p>
                      ) : (
                        result.points
                      )}
                    </td>
                    <td>
                      {result?.children.length > 0 ? (
                        <Table striped bordered hover>
                          <tr>
                            <td>Sl.No</td>
                            <td>Text</td>
                            <td>Points</td>
                            <td>Children</td>
                          </tr>
                          {result?.children.map((item, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{ReactHtmlParser(item.text)}</td>
                              <td>{item.points}</td>
                              <td>
                                {item.children.length > 0 ? (
                                  <Table striped bordered hover>
                                    <tr>
                                      <td>Sl.No</td>
                                      <td>Text</td>
                                      <td>Points</td>
                                      <td>Children</td>
                                    </tr>
                                    {item.children?.map((childItem, i) => (
                                      <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>
                                          {ReactHtmlParser(childItem.text)}
                                        </td>
                                        <td>
                                          {childItem.points == null ? (
                                            <p>No points available</p>
                                          ) : (
                                            childItem.points
                                          )}
                                        </td>
                                        <td>
                                          {childItem.children.length > 0 ? (
                                            <Table striped bordered hover>
                                              <tr>
                                                <td>Sl.No</td>
                                                <td>Text</td>
                                                <td>Points</td>
                                                <td>Children</td>
                                              </tr>
                                              {childItem.children?.map(
                                                (innerChilditem, i) => (
                                                  <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                      {ReactHtmlParser(
                                                        innerChilditem.text
                                                      )}
                                                    </td>
                                                    <td>
                                                      {innerChilditem.points ==
                                                      null ? (
                                                        <p>
                                                          No points available
                                                        </p>
                                                      ) : (
                                                        innerChilditem.points
                                                      )}
                                                    </td>
                                                  </tr>
                                                )
                                              )}
                                            </Table>
                                          ) : (
                                            <p>No comments found</p>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </Table>
                                ) : (
                                  <p>No comments found</p>
                                )}
                              </td>
                            </tr>
                          ))}
                        </Table>
                      ) : (
                        <p>No comments found</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostDetails;
