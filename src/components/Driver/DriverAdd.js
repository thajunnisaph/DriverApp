import React, { useRef, useContext, useState } from "react";
import "./DriverAdd.css";
import {
  Card,
  CloseButton,
  Button,
  Container,
  Form,
  Row,
  Col,
  Alert,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import UserContext from "../../store/UserContext";
import { useHistory } from "react-router-dom";

const DriverAdd = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();
  const usercntx = useContext(UserContext);
  const [phonenumber, setPhonenumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [country, setCountry] = useState("");
  const [isCountryValid, setIsCountryValid] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [fnameValid, setFnameValid] = useState(false);
  const [lastname, setLastName] = useState("");
  const [lnameValid, setLnameValid] = useState(false);
  const middleref = useRef();
  const genderref = useRef();
  const arabicfirstref = useRef();
  const arabicsecondref = useRef();
  const arabiclastref = useRef();
  const nationref = useRef();
  const countbref = useRef();
  const cardnameref = useRef();
  const citybref = useRef();
  const countref = useRef();
  const townref = useRef();
  const zipref = useRef();
  const buildref = useRef();
  const streetref = useRef();
  const workref = useRef();
  const professionref = useRef();
  const employeeref = useRef();
  const addressref = useRef();
  const salaryref = useRef();
  const identityref = useRef();
  const identnoref = useRef();
  const frontref = useRef();
  const backref = useRef();
  const issueref = useRef();
  const relationref = useRef();
  const preref = useRef();
  const politicref = useRef();
  const greenref = useRef();
  const taxref = useRef();
  const residentref = useRef();
  const [birthdate, setBirthdate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const handleBirthdateChange = (event) => {
    const dateOfBirth = new Date(event.target.value);
    const ageInMs = Date.now() - dateOfBirth.getTime();
    const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365.25);
    setIsValid(ageInYears >= 18);
    setBirthdate(event.target.value);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setIsCountryValid(e.target.value !== "");
  };
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFnameValid(e.target.value !== "");
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLnameValid(e.target.value !== "");
  };
  const handlePhoneNumberChange = (event) => {
    setPhonenumber(event.target.value);
    setIsPhoneValid(
      /^(\+\d{1,2}\s)?\d{3}[-]?\d{3}[-]?\d{4}$/.test(event.target.value)
    );
  };
  const closeHandler = () => {
    history.push("/");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setIsPhoneValid(
      /^(\+\d{1,2}\s)?\d{3}[-]?\d{3}[-]?\d{4}$/.test(phonenumber)
    );
    if (isValid && isPhoneValid && isCountryValid && fnameValid && lnameValid) {
      console.log("hello");
      const driver = {
        status: "pending",
        Country: country,
        UserType: selectedOption,
        FirstName: firstname,
        MiddleName: middleref.current.value,
        LastName: lastname,
        Gender: genderref.current.value,
        ArabicfirstName: arabicfirstref.current.value,
        ArabicMiddleName: arabicsecondref.current.value,
        ArabicLastName: arabiclastref.current.value,
        DOB: birthdate,
        MobileNumber: phonenumber,
        Nationality: nationref.current.value,
        CountryOfBirth: countbref.current.value,
        CityOfBirth: citybref.current.value,
        StreetName: streetref.current.value,
        AddressCountry: countref.current.value,
        City: townref.current.value,
        ZipCode: zipref.current.value,
        BuildingNumber: buildref.current.value,
        WorkStatus: workref.current.value,
        ProfessionalLevel: professionref.current.value,
        EmployeeName: employeeref.current.value,
        WorkAddress: addressref.current.value,
        SalaryRange: salaryref.current.value,
        IdentificationType: identityref.current.value,
        IdentificationNO: identnoref.current.value,
        frontside: frontref.current.value,
        backside: backref.current.value,
        IssuedDate: issueref.current.value,
        DegreeofRelation: relationref.current.value,
        Locationforcarddelivery: preref.current.value,
        USGreencardholder: greenref.current.value,
        USTaxpayer: taxref.current.value,
        USResident: residentref.current.value,
        Politicallyexposedperson: politicref.current.value,
      };
      axios
        .post(
          "https://test-fad68-default-rtdb.firebaseio.com/drivers.json",
          driver
        )
        .then((res) => {
          console.log(res.data);
          usercntx.addUser(driver, (driver.id = res.data.name));
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <Container>
        <Card style={{ width: "95%", height: "80%" }} className="my-5">
          <Card.Header as="h5">
            Add New Driver
            <div className="closebutton">
              <CloseButton variant="dark" onClick={closeHandler} />
            </div>
          </Card.Header>
          <Card.Body>
            <Form noValidate onSubmit={submitHandler}>
              <Container className="mb-3 but">
                <Button variant="outline-secondary" onClick={closeHandler}>
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  style={{ backgroundColor: "darkcyan" }}
                >
                  Send
                </Button>
              </Container>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>COUNTRY<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="select"
                    value={country}
                    onChange={handleCountryChange}
                    required
                    isInvalid={submitted && !isCountryValid}
                  >
                    <option value="">Select Country</option>
                    <option value="INDIA">INDIA</option>
                    <option value="UAE">UAE</option>
                    <option value="other">Other</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please select your country.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridtype">
                  <Form.Label>USER TYPE</Form.Label>

                  <div key={`inline-radio`} className="mb-3">
                    <Form.Check
                      inline
                      label="Driver"
                      name="group0"
                      type="radio"
                      value="Driver"
                      checked={selectedOption === "Driver"}
                      onChange={handleOptionChange}
                      id={`inline-radio-1`}
                    />
                    <Form.Check
                      inline
                      label="Broker & Driver"
                      name="group0"
                      type="radio"
                      value="Broker&Driver"
                      checked={selectedOption === "Broker&Driver"}
                      onChange={handleOptionChange}
                      id={`inline-radio-2`}
                    />
                  </div>
                </Form.Group>
              </Row>
              <fieldset>
                <legend className="field">PERSONAL DETAILS</legend>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridfirst">
                    <Form.Label>FIRST NAME<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={firstname}
                      onChange={handleFirstNameChange}
                      required
                      isInvalid={submitted && !fnameValid}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridMid">
                    <Form.Label>MIDDLE NAME</Form.Label>
                    <Form.Control ref={middleref} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridLast">
                    <Form.Label>LAST NAME<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={lastname}
                      onChange={handleLastNameChange}
                      required
                      isInvalid={submitted && !lnameValid}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your lastname.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridGender">
                    <Form.Label>GENDER</Form.Label>
                    <Form.Select defaultValue="Select" required ref={genderref}>
                      <option>Select</option>
                      <option>Female</option>
                      <option>Male</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select an option.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridArabic1">
                    <Form.Label>FIRST NAME IN ARABIC</Form.Label>
                    <Form.Control ref={arabicfirstref} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridMidarabic">
                    <Form.Label>MIDDLE NAME IN ARABIC</Form.Label>
                    <Form.Control ref={arabicsecondref} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridLastarabic">
                    <Form.Label>LAST NAME IN ARABIC</Form.Label>
                    <Form.Control ref={arabiclastref} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridDOB">
                    <Form.Label>DATE OF BIRTH<span className="text-danger">*</span></Form.Label>
                    <FormControl
                      type="date"
                      value={birthdate}
                      onChange={handleBirthdateChange}
                      required
                      isInvalid={submitted && !birthdate}
                    />
                    <FormControl.Feedback type="invalid">
                      Please enter your date of birth.
                    </FormControl.Feedback>
                  </Form.Group>
                  {submitted && !isValid && (
                    <Alert variant="danger">
                      You must be at least 18 years old to submit this form.
                    </Alert>
                  )}
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridMobile">
                    <Form.Label>MOBILE NUMBER<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="tel"
                      value={phonenumber}
                      onChange={handlePhoneNumberChange}
                      required
                      placeholder="+91"
                      isInvalid={submitted && !isPhoneValid}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid phone number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridNation">
                    <Form.Label>NATIONALITY</Form.Label>
                    <Form.Select
                      defaultValue="Select Nationality"
                      ref={nationref}
                      required
                    >
                      <option value=''>Select Nationality</option>
                      <option value='JAPAN'>JAPAN</option>
                      <option value='INDIAN'>INDIAN</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select an option.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridBirth">
                    <Form.Label>COUNTRY OF BIRTH</Form.Label>
                    <Form.Select
                      defaultValue="Select Country"
                      ref={countbref}
                      required
                    >
                      <option value =''>Select Country</option>
                      <option value ='Indian'>Indian</option>
                      <option value='Qatar'>Qatar</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCityB">
                    <Form.Label>CITY OF BIRTH</Form.Label>
                    <Form.Select defaultValue="Select City" ref={citybref}>
                      <option value=''>Select City</option>
                      <option value='Damam'>Damam</option>
                      <option>Kochin</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridNameCard">
                    <Form.Label>NAME ON THE CARD</Form.Label>
                    <Form.Control ref={cardnameref} />
                    <Form.Text id="formGridNameCard" muted>
                      Please enter a name which is used in the identity card
                    </Form.Text>
                  </Form.Group>
                </Row>
              </fieldset>
              <fieldset>
                <legend className="field">PRESENT ADDRESS</legend>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridStreet">
                    <Form.Label>STREET NAME</Form.Label>
                    <Form.Control required ref={streetref} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCount">
                    <Form.Label>COUNTRY</Form.Label>
                    <Form.Select
                      defaultValue="Select Country"
                      required
                      ref={countref}
                    >
                      <option value=''>Select Country</option>
                      <option value='India'>India</option>
                      <option value='Qatar'>Qatar</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select an option.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>CITY/TOWN</Form.Label>
                    <Form.Select
                      defaultValue="Select City/Town"
                      required
                      ref={townref}
                    >
                      <option value=''>Select City/Town</option>
                      <option value='Damam'>Damam</option>
                      <option value='kochin'>Kochin</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>ZIP CODE</Form.Label>
                    <Form.Control type="number" required ref={zipref} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} xs={5} controlId="formGridBuild">
                    <Form.Label>BUILDING NUMBER</Form.Label>
                    <Form.Control type="number" required ref={buildref} />
                  </Form.Group>
                </Row>
              </fieldset>
              <fieldset>
                <legend className="field">EMPLOYMENT DETAILS</legend>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridWorkStatus">
                    <Form.Label>WORK STATUS</Form.Label>
                    <Form.Select
                      defaultValue="Select Work Status"
                      required
                      ref={workref}
                    >
                      <option value=''>Select Work Status</option>
                      <option value='Experienced'>Experienced</option>
                      <option value='fresher'>Fresher</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridProfessional">
                    <Form.Label>PROFESSIONAL LEVEL</Form.Label>
                    <Form.Select
                      defaultValue="Select Professional Level"
                      required
                      ref={professionref}
                    >
                      <option value=''>Select Professional Level</option>
                      <option value='Experienced'>Experienced</option>
                      <option value = 'Fresher'>Fresher</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmployee">
                    <Form.Label>EMPLOYEE NAME</Form.Label>
                    <Form.Control required ref={employeeref} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridWorkAdd">
                    <Form.Label>WORK ADDRESS</Form.Label>
                    <Form.Control required ref={addressref} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} xs={5} controlId="formGridSalary">
                    <Form.Label>SALARY RANGE</Form.Label>
                    <Form.Control
                      type="number"
                      step="10000"
                      min="0"
                      required
                      ref={salaryref}
                    />
                  </Form.Group>
                </Row>
              </fieldset>
              <fieldset>
                <legend className="field">PROOF OF IDENTITY</legend>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridWorkType">
                    <Form.Label>IDENTIFICATION TYPE</Form.Label>
                    <Form.Select
                      defaultValue="Select Identification"
                      required
                      ref={identityref}
                    >
                      <option value=''>Select Identification</option>
                      <option value='Aadhar'>Aadhar</option>
                      <option value='ID'>ID Card</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridIdentity">
                    <Form.Label>IDENTIFICATION NO</Form.Label>
                    <Form.Control type="number" required ref={identnoref} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formFileLg" className="mb-3 ">
                    <Form.Label>FRONT SIDE</Form.Label>
                    <Form.Control type="file" size="lg" ref={frontref} />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="formFileback"
                    className="mb-3 "
                  >
                    <Form.Label>BACK SIDE</Form.Label>
                    <Form.Control type="file" size="lg" ref={backref} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} xs={5} controlId="formGridIssued">
                    <Form.Label>ISSUED DATE</Form.Label>
                    <Form.Control type="date" required ref={issueref} />
                  </Form.Group>
                </Row>
              </fieldset>
              <fieldset>
                <legend className="field">ADDITIONAL INFORMATION</legend>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridGreen">
                    <Form.Label>ARE YOU A US GREEN CARD HOLDER?</Form.Label>
                    <div key={`inline-radio`} className="mb-3">
                      <Form.Check
                        inline
                        label="No"
                        name="group1"
                        type="radio"
                        value="No"
                        ref={greenref}
                        id={`inline-radio-1`}
                      />
                      <Form.Check
                        inline
                        label="Yes"
                        name="group1"
                        type="radio"
                        value="Yes"
                        ref={greenref}
                        id={`inline-radio-2`}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridTax">
                    <Form.Label>ARE YOU A US TAX PAYER?</Form.Label>
                    <div key={`inline-radio`} className="mb-3">
                      <Form.Check
                        inline
                        label="No"
                        name="group4"
                        type="radio"
                        value="No"
                        ref={taxref}
                        id={`inline-radio-1`}
                      />
                      <Form.Check
                        inline
                        label="Yes"
                        name="group4"
                        type="radio"
                        value="Yes"
                        ref={taxref}
                        id={`inline-radio-2`}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridResident">
                    <Form.Label>ARE YOU RESIDENT IN THE US?</Form.Label>
                    <div key={`inline-radio`} className="mb-3">
                      <Form.Check
                        inline
                        label="No"
                        name="group2"
                        type="radio"
                        value="No"
                        ref={residentref}
                        id={`inline-radio-1`}
                      />
                      <Form.Check
                        inline
                        label="Yes"
                        name="group2"
                        type="radio"
                        value="Yes"
                        ref={residentref}
                        id={`inline-radio-2`}
                      />
                    </div>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="formGridPolitic">
                    <Form.Label>
                      ARE YOU A POLITICALLY EXPOSED PERSON OR DO YOU HAVE A
                      FIRST DEGREE RELATIONSHIP WITH FAMILY MEMBERS OR CLOSE
                      ASSOCIATES OF PEPS NATURE?
                    </Form.Label>
                    <div key={`inline-radio`} className="mb-3">
                      <Form.Check
                        inline
                        label="No"
                        name="group3"
                        type="radio"
                        value="No"
                        ref={politicref}
                        id={`inline-radio-1`}
                      />
                      <Form.Check
                        inline
                        label="Yes"
                        name="group3"
                        type="radio"
                        value="Yes"
                        ref={politicref}
                        id={`inline-radio-2`}
                      />
                    </div>
                  </Form.Group>
                </Row>
              </fieldset>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridWDegree">
                  <Form.Label>DEGREE OF RELATIONSHIP*</Form.Label>
                  <Form.Select
                    defaultValue="Select Relation"
                    required
                    ref={relationref}
                  >
                    <option value=''>Select Relation</option>
                    <option value='Father'>Father</option>
                    <option value='spouse'>Spouse</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGriddelivery">
                  <Form.Label>PREFFERED LOCATION FOR CARD DELIVERY</Form.Label>
                  <Form.Select
                    defaultValue="Select Location"
                    required
                    ref={preref}
                  >
                    <option value=''>Select Location</option>
                    <option value='India'>India</option>
                    <option value='UAE'>UAE</option>
                  </Form.Select>
                </Form.Group>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default DriverAdd;
