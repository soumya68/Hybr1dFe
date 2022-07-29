import React from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const AllData = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Serial no.</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {props.details.map((data, index) => {
            return (
              <tr
                key={index}
                onClick={() =>
                  navigate("/Details", { state: { id: data.objectID } })
                }
              >
                <td>{index + 1}</td>
                <td>
                  {data.title == null ? <p>No title available</p> : data.title}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default AllData;
