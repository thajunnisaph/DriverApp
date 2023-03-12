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
    console.log(user);
    setUser((prev) => {
      return [...prev, user];
    });
  };

  const getUserHandler = async () => {
    const res = await axios.get(
      `https://test-fad68-default-rtdb.firebaseio.com/drivers.json`
    );
    const data = res.data;
    const temp = [];
    for (const Key in data) {
      temp.push({
        id: Key,
        status: data[Key].status,
        UserType: data[Key].UserType,
        Country: data[Key].Country,
        FirstName: data[Key].FirstName,
        MiddleName: data[Key].MiddleName,
        LastName: data[Key].LastName,
        Gender: data[Key].Gender,
        ArabicfirstName: data[Key].ArabicfirstName,
        ArabicMiddleName: data[Key].ArabicMiddleName,
        ArabicLastName: data[Key].ArabicLastName,
        DOB: data[Key].DOB,
        MobileNumber: data[Key].MobileNumber,
        Nationality: data[Key].Nationality,
        CountryOfBirth: data[Key].CountryOfBirth,
        CityOfBirth: data[Key].CityOfBirth,
        StreetName: data[Key].StreetName,
        AddressCountry: data[Key].AddressCountry,
        City: data[Key].City,
        ZipCode: data[Key].ZipCode,
        BuildingNumber: data[Key].BuildingNumber,
        WorkStatus: data[Key].WorkStatus,
        ProfessionalLevel: data[Key].ProfessionalLevel,
        EmployeeName: data[Key].EmployeeName,
        WorkAddress: data[Key].WorkAddress,
        SalaryRange: data[Key].SalaryRange,
        IdentificationType: data[Key].IdentificationType,
        IdentificationNO: data[Key].IdentificationNO,
        frontside: data[Key].frontside,
        backside: data[Key].backside,
        IssuedDate: data[Key].IssuedDate,
        DegreeofRelation: data[Key].DegreeofRelation,
        Locationforcarddelivery: data[Key].Locationforcarddelivery,
        USGreencardholder: data[Key].USGreencardholder,
        USTaxpayer: data[Key].USTaxpayer,
        USResident: data[Key].USResident,
        Politicallyexposedperson: data[Key].Politicallyexposedperson,
      });
    }
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
