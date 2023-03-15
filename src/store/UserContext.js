import React, { useState } from "react";
import axios from "axios";
const UserContext = React.createContext({
  users: [],
  addUser: (user) => {},
  getUser: () => {},
});
export const UserContextProvider = (props) => {
  const [user, setUser] = useState([]);

  const addUserHandler = (user) => {
    setUser((prev) => {
      return [...prev, user];
    });
  };

  const getUserHandler = async () => {
    const res = await axios.get(
      `https://test-fad68-default-rtdb.firebaseio.com/drivers.json`
    );
    const data = res.data;
    const requiredProps = [
      "id",
      "UserType",
      "status",
      "Country",
      "FirstName",
      "MiddleName",
      "LastName",
      "Gender",
      "ArabicfirstName",
      "ArabicLastName",
      "DOB",
      "MobileNumber",
      "Nationality",
      "CountryOfBirth",
      "CityOfBirth",
      "StreetName",
      "AddressCountry",
      "City",
      "ZipCode",
      "BuildingNumber",
      "WorkStatus",
      "ProfessionalLevel",
      "EmployeeName",
      "WorkAddress",
      "SalaryRange",
      "IdentificationType",
      "IdentificationNO",
      "frontside",
      "backside",
      "IssuedDate",
      "DegreeOfRelation",
      "Locationforcarddelivery",
      "USGreencardholder",
      "USTaxpayer",
      "USResident",
      "Politicallyexposedperson",
    ];
    const temp = Object.keys(data).map((key) => {
      const newObj = {};
      requiredProps.forEach((prop) => {
        newObj[prop] = data[key][prop];
      });
      return newObj;
    });

    setUser(temp);
  };
  const uservalue = {
    users: user,
    addUser: addUserHandler,
    getUser: getUserHandler,
  };
  return (
    <UserContext.Provider value={uservalue}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
