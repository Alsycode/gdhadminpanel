// TempleDataContext.js

import { createContext, useContext, useState, useEffect } from 'react';

const TempleDataContext = createContext();

const TempleDataProvider = ({ children }) => {
  const [templeData, setTempleData] = useState([]);
  const [newData, setNewData] = useState([]);
  const authToken = '36d91d755f6933406f808c6bf39e61dfc5f91f83192d27953c1408254968d8370a23e758ffaa7a7aeefdebb91c21a8d6b7eb8dd771d427e6ee01f7e42e831681d35e263fc04f9209e5e02b6d5473a7899c896a983904eac92709ec1bb86fc2b726314bb0cebb7cfec92e46cd284328bf1a21e17736509a74b2ced35db5ef0265';
  const templeApiUrl = 'http://localhost:1337/api/temple-lists?populate=*';
   const fetchData = async () => {
     try {
      const response = await fetch(templeApiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

       const data = await response.json();
       setTempleData(data);
       const templeDatas = data.data.map((item) => ({
         nameinenglish: item.attributes.nameinenglish,
        nameinmalayalam: item.attributes.nameinmalayalam,
         district: item.attributes.district,
        email: item.attributes.email,
         id: item.id,
       }));

       setNewData(templeDatas);
    //    setTempleData(data);
      // Handle the fetched data as needed
     } catch (error) {
       console.error('Error fetching data:', error);
       // Handle errors
    }
   };

   useEffect(() => {
     fetchData();
   }, []);

  return (
    <TempleDataContext.Provider value={{ newData,setNewData,setTempleData,templeData}}>
      {children}
    </TempleDataContext.Provider>
  );
};

const useTempleData = () => {
  const context = useContext(TempleDataContext);
  if (!context) {
    throw new Error('useTempleData must be used within a TempleDataProvider');
  }
  return context;
};

export { TempleDataProvider, useTempleData };
