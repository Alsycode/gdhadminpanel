// TempleDataContext.js

import { createContext, useContext, useState, useEffect } from 'react';

const TempleDataContext = createContext();

const TempleDataProvider = ({ children }) => {
  
const [testimonyData,setTestimonyData] = useState([]);
const [projectData,setProjectData] = useState([])
const [blogData, setBlogData] = useState([]);
 
  const fetchData = async () => {
    const authToken = '36d91d755f6933406f808c6bf39e61dfc5f91f83192d27953c1408254968d8370a23e758ffaa7a7aeefdebb91c21a8d6b7eb8dd771d427e6ee01f7e42e831681d35e263fc04f9209e5e02b6d5473a7899c896a983904eac92709ec1bb86fc2b726314bb0cebb7cfec92e46cd284328bf1a21e17736509a74b2ced35db5ef0265';

    // Update URLs
    const worksApiUrl = 'http://localhost:1337/api/testimonies?populate=*';
    const projectsApiUrl = 'http://localhost:1337/api/projects?populate=*';
    const blogsApiUrl = 'http://localhost:1337/api/blogs?populate=*';
    try {
      const worksResponse = await fetch(worksApiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      const projectsResponse = await fetch(projectsApiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      const blogsResponse = await fetch(blogsApiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!worksResponse.ok || !projectsResponse.ok || !blogsResponse.ok) {
        throw new Error(`HTTP error! Status: ${worksResponse.status}`);
      }

      const testimonyData = await worksResponse.json();
setTestimonyData(testimonyData);
      const projectsData = await projectsResponse.json();
setProjectData(projectsData)
const blogsData = await blogsResponse.json();
      setBlogData(blogsData);
      // Handle the fetched data as needed
      console.log("Testimony Data:", testimonyData);
      console.log("Projects Data:", projectsData);

    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TempleDataContext.Provider value={{ projectData,setProjectData,testimonyData,setTestimonyData, blogData, setBlogData,fetchData }}>
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
