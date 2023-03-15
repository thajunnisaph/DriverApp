import React from "react";
import { useContext, useState } from "react";
import {
  Navbar,
  Container,
  Card,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UserContext from "../../store/UserContext";
import "./Dashboard.css";
import DriverList from "../Driver/DriverList";

const Dashboard = () => {
  const history = useHistory();
  const context = useContext(UserContext);
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const pendingcount = context.users.reduce((acc, curr) => {
    if (curr.status === "pending") acc++;
    return acc;
  }, 0);
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const addDriverHandler = () => {
    history.push("/add");
  };
  return (
    <div>
      <Navbar bg="dark" expand="sm">
        <Container>
          <Navbar.Brand>Figma</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="outer">
        <Form.Group className="mb-3 form">
          <FloatingLabel controlId="floatingSelect" label="COUNTRY">
            <Form.Select>
              <option>United Arab Emirates</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="form">
          <FloatingLabel controlId="floating" label="CURRENT-MONTH">
            <Form.Control
              type="date"
              value={date}
              onChange={handleDateChange}
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
      </Container>
      <Container className="cards">
        <Card className="card">
          <Card.Body>
            <Card.Title>Total New Drivers</Card.Title>
            <Card.Text>0</Card.Text>
          </Card.Body>
        </Card>
        <Card className="active">
          <Card.Body>
            <Card.Title>Active Drivers</Card.Title>
            <Card.Text>0</Card.Text>
          </Card.Body>
        </Card>
        <Card className="active">
          <Card.Body>
            <Card.Title>Inactive Drivers</Card.Title>
            <Card.Text>0</Card.Text>
          </Card.Body>
        </Card>
        <Card className="active">
          <Card.Body>
            <Card.Title>In-Process Drivers</Card.Title>
            <Card.Text>{pendingcount}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="active">
          <Card.Body>
            <Card.Title>Rejected Drivers</Card.Title>
            <Card.Text>0</Card.Text>
          </Card.Body>
        </Card>
        <Card className="active">
          <Card.Body>
            <Card.Title>Total Drivers</Card.Title>
            <Card.Text>0</Card.Text>
          </Card.Body>
        </Card>
        <div className="button">
          <Button
            variant="primary"
            size="lg"
            onClick={addDriverHandler}
            style={{ backgroundColor: "darkcyan" }}
          >
            Add New Driver{" "}
          </Button>
        </div>
      </Container>
      <Container className="my-5">
        <DriverList />
      </Container>
    </div>
  );
};

export default Dashboard;
