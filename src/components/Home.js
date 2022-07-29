import React, { useState, useEffect } from "react";
import MainNavbar from "./MainNavbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AllData from "./AllData";
import axios from "axios";
import Loader from "./Loader";
import Toasters from "./Tosters";
const Home = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(true);
  const [loader, setLoader] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [variant, setVariant] = useState("");
  const fetchData = (e) => {
    e.preventDefault();
    setLoader(true);
    setSearch(e.target.value);
    let searchQuery = e.target.value;
    let url = `http://hn.algolia.com/api/v1/search?query=${searchQuery}`;
    axios({
      method: "GET",
      url,
    })
      .then((response) => {
        setToast(true);
        setResults(response.data.hits);
        if (response.data.hits.length === 0) {
          setStatus(false);
          setMessage("Notfound");
          setMessageBody("No data found");
          setVariant("Warning");
        } else {
          setStatus(true);
          setMessage("Success");
          setMessageBody("Data found successfully");
          setVariant("Success");
        }
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Error");
        setMessageBody(error.message);
        setVariant("Danger");
        setToast(true);
      });
  };

  function toastOff() {
    setToast(false);
  }
  setTimeout(toastOff, 3000);
  return (
    <div>
      <MainNavbar name={"HOME"} />
      <Container>
        <Row>
          <Col xs={4}></Col>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Search Here"
                  name="search"
                  value={search}
                  onChange={(e) => fetchData(e)}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
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
          <Col xs={8}>
            {loader ? (
              <Loader />
            ) : (
              <div>
                {results.length > 0 && status === true ? (
                  <AllData details={results} />
                ) : results.length === 0 && status === false ? (
                  <h3 style={{color:"red",marginTop:"200px"}}>No data found</h3>
                ) : null}
              </div>
            )}
          </Col>

          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
