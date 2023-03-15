import React, { useContext, useState } from "react";
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
  const [formData, setFormData] = useState({
    country: "",
    userType: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    arabicFirstName: "",
    arabicMiddleName: "",
    ArabicLastName: "",
    nationality: "",
    countryOfBirth: "",
    cityOfBirth: "",
    nameOnTheCard: "",
    streetName: "",
    presentAddressCountry: "",
    city: "",
    zipCode: "",
    buildingNumber: "",
    workStatus: "",
    professionalLevel: "",
    employeeName: "",
    workAddress: "",
    salaryRange: "",
    identificationType: "",
    identificationNO: "",
    issuedDate: "",
    USGreenCardHolder: "",
    USTaxPayer: "",
    USResident: "",
    politicallyExposedPerson: "",
    degreeOfRelation: "",
    cardDeliveryLocation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();
  const usercntx = useContext(UserContext);
  const [phonenumber, setPhonenumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const [birthdate, setBirthdate] = useState("");

  const handleBirthdateChange = (event) => {
    const dateOfBirth = new Date(event.target.value);
    const ageInMs = Date.now() - dateOfBirth.getTime();
    const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365.25);
    setIsValid(ageInYears >= 18);
    setBirthdate(event.target.value);
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
  const validateForm = () => {
    const requiredFields = ["firstName", "lastName", "group0", "gender"];
    const hasEmptyField = requiredFields.some(
      (fieldName) => !formData[fieldName]
    );
    return !hasEmptyField;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setIsPhoneValid(
      /^(\+\d{1,2}\s)?\d{3}[-]?\d{3}[-]?\d{4}$/.test(phonenumber)
    );
    if (isValid && isPhoneValid) {
      const driver = {
        status: "pending",
        Country: formData.country,
        UserType: formData.userType,
        FirstName: formData.firstName,
        MiddleName: formData.middleName,
        LastName: formData.lastName,
        Gender: formData.gender,
        ArabicfirstName: formData.arabicFirstName,
        ArabicMiddleName: formData.arabicMiddleName,
        ArabicLastName: formData.ArabicLastName,
        DOB: birthdate,
        MobileNumber: phonenumber,
        Nationality: formData.nationality,
        CountryOfBirth: formData.countryOfBirth,
        CityOfBirth: formData.cityOfBirth,
        nameOnTheCard: formData.nameOnTheCard,
        StreetName: formData.streetName,
        AddressCountry: formData.presentAddressCountry,
        City: formData.city,
        ZipCode: formData.zipCode,
        BuildingNumber: formData.buildingNumber,
        WorkStatus: formData.workStatus,
        ProfessionalLevel: formData.professionalLevel,
        EmployeeName: formData.employeeName,
        WorkAddress: formData.workAddress,
        SalaryRange: formData.salaryRange,
        IdentificationType: formData.identificationType,
        IdentificationNO: formData.identificationNO,
        IssuedDate: formData.issuedDate,
        DegreeofRelation: formData.degreeOfRelation,
        Locationforcarddelivery: formData.cardDeliveryLocation,
        USGreencardholder: formData.USGreenCardHolder,
        USTaxpayer: formData.USTaxPayer,
        USResident: formData.USResident,
        Politicallyexposedperson: formData.politicallyExposedPerson,
      };
      axios
        .post(
          "https://test-fad68-default-rtdb.firebaseio.com/drivers.json",
          driver
        )
        .then((res) => {
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
                  <Form.Label>
                    COUNTRY<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    required
                    className={formData.country ? "" : "is-invalid" }
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
                      checked={formData.userType === "Driver"}
                      onChange={(e) =>
                        setFormData({ ...formData, userType: e.target.value })
                      }
                      id={`inline-radio-1`}
                    />
                    <Form.Check
                      inline
                      label="Broker & Driver"
                      name="group0"
                      type="radio"
                      value="Broker&Driver"
                      checked={formData.userType === "Broker&Driver"}
                      onChange={(e) =>
                        setFormData({ ...formData, userType: e.target.value })
                      }
                      id={`inline-radio-2`}
                    />
                  </div>
                </Form.Group>
              </Row>
              <fieldset>
                <legend className="field">PERSONAL DETAILS</legend>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridfirst">
                    <Form.Label>
                      FIRST NAME<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      required
                      className={formData.firstName ? "" : "is-invalid"}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridMid">
                    <Form.Label>MIDDLE NAME</Form.Label>
                    <Form.Control
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={(e) =>
                        setFormData({ ...formData, middleName: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridLast">
                    <Form.Label>
                      LAST NAME<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      required
                      className={formData.lastName ? "" : "is-invalid"}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your lastname.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridGender">
                    <Form.Label>GENDER</Form.Label>
                    <Form.Select
                      required
                      name="gender"
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    >
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
                    <Form.Control
                      type="text"
                      name="arabicFirstName"
                      value={formData.arabicFirstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          arabicFirstName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridMidarabic">
                    <Form.Label>MIDDLE NAME IN ARABIC</Form.Label>
                    <Form.Control
                      type="text"
                      name="arabicMiddleName"
                      value={formData.arabicMiddleName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          arabicMiddleName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridLastarabic">
                    <Form.Label>LAST NAME IN ARABIC</Form.Label>
                    <Form.Control
                      type="text"
                      name="arabicMiddleName"
                      value={formData.arabicLastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          arabicLastName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridDOB">
                    <Form.Label>
                      DATE OF BIRTH<span className="text-danger">*</span>
                    </Form.Label>
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
                    <Form.Label>
                      MOBILE NUMBER<span className="text-danger">*</span>
                    </Form.Label>
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
                      name="nationality"
                      value={formData.nationality}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nationality: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select Nationality</option>
                      <option value="JAPAN">JAPAN</option>
                      <option value="INDIAN">INDIAN</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select an option.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridBirth">
                    <Form.Label>COUNTRY OF BIRTH</Form.Label>
                    <Form.Select
                      name="birthCountry"
                      value={formData.countryOfBirth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          countryOfBirth: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="Indian">Indian</option>
                      <option value="Qatar">Qatar</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCityB">
                    <Form.Label>CITY OF BIRTH</Form.Label>
                    <Form.Select
                      name="city"
                      value={formData.cityOfBirth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cityOfBirth: e.target.value,
                        })
                      }
                    >
                      <option value="">Select City</option>
                      <option value="Damam">Damam</option>
                      <option>Kochin</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridNameCard">
                    <Form.Label>NAME ON THE CARD</Form.Label>
                    <Form.Control
                      type="text"
                      name="nameOnTheCard"
                      value={formData.nameOnTheCard}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nameOnTheCard: e.target.value,
                        })
                      }
                    />
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
                    <Form.Control
                      type="text"
                      name="streetName"
                      value={formData.streetName}
                      onChange={(e) =>
                        setFormData({ ...formData, streetName: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCount">
                    <Form.Label>COUNTRY</Form.Label>
                    <Form.Select
                      name="presentAddressCountry"
                      value={formData.presentAddressCountry}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          presentAddressCountry: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="India">India</option>
                      <option value="Qatar">Qatar</option>
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
                      name="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    >
                      <option value="">Select City/Town</option>
                      <option value="Damam">Damam</option>
                      <option value="kochin">Kochin</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>ZIP CODE</Form.Label>
                    <Form.Control
                      type="number"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} xs={5} controlId="formGridBuild">
                    <Form.Label>BUILDING NUMBER</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      name="buildingNumber"
                      value={formData.buildingNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          buildingNumber: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Row>
              </fieldset>
              <fieldset>
                <legend className="field">EMPLOYMENT DETAILS</legend>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridWorkStatus">
                    <Form.Label>WORK STATUS</Form.Label>
                    <Form.Select
                      required
                      name="workStatus"
                      value={formData.workStatus}
                      onChange={(e) =>
                        setFormData({ ...formData, workStatus: e.target.value })
                      }
                    >
                      <option value="">Select Work Status</option>
                      <option value="Experienced">Experienced</option>
                      <option value="fresher">Fresher</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridProfessional">
                    <Form.Label>PROFESSIONAL LEVEL</Form.Label>
                    <Form.Select
                      defaultValue="Select Professional Level"
                      required
                      name="professionalLevel"
                      value={formData.professionalLevel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          professionalLevel: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Professional Level</option>
                      <option value="Experienced">Experienced</option>
                      <option value="Fresher">Fresher</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmployee">
                    <Form.Label>EMPLOYEE NAME</Form.Label>
                    <Form.Control
                      required
                      name="employeeName"
                      value={formData.employeeName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          employeeName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridWorkAdd">
                    <Form.Label>WORK ADDRESS</Form.Label>
                    <Form.Control
                      required
                      name="workAddress"
                      value={formData.workAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          workAddress: e.target.value,
                        })
                      }
                    />
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
                      name="salaryRange"
                      value={formData.salaryRange}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salaryRange: e.target.value,
                        })
                      }
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
                      required
                      name="identificationType"
                      value={formData.identificationType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          identificationType: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Identification</option>
                      <option value="Aadhar">Aadhar</option>
                      <option value="ID">ID Card</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridIdentity">
                    <Form.Label>IDENTIFICATION NO</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      name="identificationNO"
                      value={formData.identificationNO}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          identificationNO: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formFileLg" className="mb-3 ">
                    <Form.Label>FRONT SIDE</Form.Label>
                    <Form.Control type="file" size="lg" />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="formFileback"
                    className="mb-3 "
                  >
                    <Form.Label>BACK SIDE</Form.Label>
                    <Form.Control type="file" size="lg" />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} xs={5} controlId="formGridIssued">
                    <Form.Label>ISSUED DATE</Form.Label>
                    <Form.Control
                      type="date"
                      required
                      name="issuedDate"
                      value={formData.issuedDate}
                      onChange={(e) =>
                        setFormData({ ...formData, issuedDate: e.target.value })
                      }
                    />
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
                        checked={formData.USGreenCardHolder === "No"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            USGreenCardHolder: e.target.value,
                          })
                        }
                        id={`inline-radio-1`}
                      />
                      <Form.Check
                        inline
                        label="Yes"
                        name="group1"
                        type="radio"
                        value="Yes"
                        checked={formData.USGreenCardHolder === "Yes"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            USGreenCardHolder: e.target.value,
                          })
                        }
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
                        checked={formData.USTaxPayer === "No"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            USTaxPayer: e.target.value,
                          })
                        }
                        id={`inline-radio-1`}
                      />
                      <Form.Check
                        inline
                        label="Yes"
                        name="group4"
                        type="radio"
                        value="Yes"
                        checked={formData.USTaxPayer === "Yes"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            USTaxPayer: e.target.value,
                          })
                        }
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
                        checked={formData.USResident === "No"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            USResident: e.target.value,
                          })
                        }
                        id={`inline-radio-1`}
                      />
                      <Form.Check
                        inline
                        label="Yes"
                        name="group2"
                        type="radio"
                        value="Yes"
                        checked={formData.USResident === "Yes"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            USResident: e.target.value,
                          })
                        }
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
                        checked={formData.politicallyExposedPerson === "No"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            politicallyExposedPerson: e.target.value,
                          })
                        }
                        id={`inline-radio-1`}
                      />
                      <Form.Check
                        inline
                        label="Yes"
                        name="group3"
                        type="radio"
                        value="Yes"
                        checked={formData.politicallyExposedPerson === "Yes"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            politicallyExposedPerson: e.target.value,
                          })
                        }
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
                    required
                    name="degreeOfRelation"
                    value={formData.degreeOfRelation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        degreeOfRelation: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Relation</option>
                    <option value="Father">Father</option>
                    <option value="spouse">Spouse</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGriddelivery">
                  <Form.Label>PREFFERED LOCATION FOR CARD DELIVERY</Form.Label>
                  <Form.Select
                    required
                    name="cardDeliveryLocation"
                    value={formData.cardDeliveryLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cardDeliveryLocation: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Location</option>
                    <option value="India">India</option>
                    <option value="UAE">UAE</option>
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
