import React, { useContext, useState } from "react";
import UserContext from "../../store/UserContext";
import { Table, Container, Row, Col, Button, Modal } from "react-bootstrap";
import "./DriverList.css";

const DriverList = (props) => {
  const contextvar = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleViewClick = (user) => {
    setSelectedEmployee(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setShowModal(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Table responsive>
            <thead className="heading">
              <tr>
                <th>STATUS</th>
                <th>MOXEY ID</th>
                <th>TRANSPORTER</th>
                <th>DRIVER NAME</th>
                <th>MOBILE NO.</th>
                <th>CARD NO.</th>
                <th>COUNTRY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {contextvar.users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>
                      {" "}
                      <Button
                        variant="primary"
                        size="sm"
                        style={{ backgroundColor: "green" }}
                      >
                        {" "}
                        {user.status}
                      </Button>
                    </td>
                    <td>{user.id}</td>
                    <td>{user.UserType}</td>
                    <td>{user.FirstName + user.LastName}</td>
                    <td>{user.MobileNumber}</td>
                    <td>{user.IdentificationNO}</td>
                    <td>{user.Country}</td>
                    <td>
                      {" "}
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleViewClick(user)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Driver Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <>
              <p>
                Name:{" "}
                {selectedEmployee.FirstName +
                  selectedEmployee.MiddleName +
                  selectedEmployee.LastName}
              </p>
              <p>UserType: {selectedEmployee.UserType}</p>
              <p>Gender: {selectedEmployee.Gender}</p>
              <p>
                ArabicName:
                {selectedEmployee.ArabicfirstName +
                  selectedEmployee.ArabicMiddleName +
                  selectedEmployee.ArabicLastName}
              </p>
              <p>DOB:{selectedEmployee.DOB}</p>
              <p>MobileNumber:{selectedEmployee.MobileNumber}</p>
              <p>Nationality:{selectedEmployee.Nationality}</p>
              <p>CountryOfBirth:{selectedEmployee.CountryOfBirth}</p>
              <p>CityOfBirth:{selectedEmployee.CityOfBirth}</p>
              <p>
                Present Address:{selectedEmployee.StreetName},  
                {selectedEmployee.AddressCountry},{selectedEmployee.City},
                {selectedEmployee.ZipCode},{selectedEmployee.BuildingNumber}
              </p>
              <p>
                Employment Details: WorkStatus:{selectedEmployee.WorkStatus}
                ,{selectedEmployee.ProfessionalLevel}</p>
               <p> EmployeeName:
                {selectedEmployee.EmployeeName},WorkAddress:
                {selectedEmployee.WorkAddress},SalaryRange:
                {selectedEmployee.SalaryRange}
              </p>
              <p>
                Identity Proof:{selectedEmployee.IdentificationType},ID NO:
                {selectedEmployee.IdentificationNO},IssuedDate:
                {selectedEmployee.IssuedDate}
              </p>
              <p>
                US Greencardholder:{selectedEmployee.USGreencardholder},US
                Taxpayer:{selectedEmployee.USTaxpayer},US Resident:
                {selectedEmployee.USResident}
              </p>
              <p>
                US Taxpayer:{selectedEmployee.USTaxpayer},US Resident:
                {selectedEmployee.USResident}
              </p>
              <p>Degree of Relation:{selectedEmployee.DegreeofRelation}</p>
              <p>
                Location for carddelivery:
                {selectedEmployee.Locationforcarddelivery}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DriverList;
