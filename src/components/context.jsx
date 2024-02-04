// TempleDataContext.js

import { createContext, useContext, useState, useEffect } from 'react';

const TempleDataContext = createContext();

const TempleDataProvider = ({ children }) => {
  const [templeData, setTempleData] = useState([]);
  const [newData, setNewData] = useState([]);
  const authToken = '0363d4c937bd2e7c7685bf62567fba601eea82d8dad4b13bb443175c1ce7ef343e157963dbb0a1622c35622632e8ce8013717f3b7c12b250c3c699dc26228a70c450d3f7703b161e1c63df37f92fd0bc4d9b2566bcf9fdf8127105b2efda85b0359cae361815ca6ac7dcc8c476dc4aaf672c129ae93794bd4f3db862b37e32f9';
  const templeApiUrl = 'https://bookseva-backend-7w338.ondigitalocean.app/api/temple-lists?populate=*';
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
