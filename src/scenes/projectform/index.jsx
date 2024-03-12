import React, { useState } from 'react';
import { useTempleData } from "../../components/context";
import { useNavigate  } from 'react-router-dom';

function ProjectForm() {
  const { fetchData } = useTempleData();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [specifics, setSpecifics] = useState('');
  const [description, setDescription] = useState('');
  const [carousal, setCarousal] = useState([]);
  const [sector, setSector] = useState('');
  const [owner, setOwner] = useState('');
  const [projectDates, setProjectDates] = useState('');
  const [image, setImage] = useState(null);
  const [introduction, setIntroduction] = useState('');
  const [categories, setCategories] = useState('');
  const [error, setError] = useState('');
  const [loading,setLoading] =  useState('');
  const items = carousal;




const handleSubmit = async (event) => {
  event.preventDefault();

//   if (!name || !slug || !specifics || !description || !carousal.length || !sector || !owner || !projectDates || !categories || !introduction || !image) {
//     setError('Please fill out all fields');
//     return;
//   }

  setLoading(true);

  const token = '36d91d755f6933406f808c6bf39e61dfc5f91f83192d27953c1408254968d8370a23e758ffaa7a7aeefdebb91c21a8d6b7eb8dd771d427e6ee01f7e42e831681d35e263fc04f9209e5e02b6d5473a7899c896a983904eac92709ec1bb86fc2b726314bb0cebb7cfec92e46cd284328bf1a21e17736509a74b2ced35db5ef0265'; // Replace with your authentication token
    try {
        const data = {
          name: name,
          slug: slug,
          specifics: specifics,
          description: description,
          carousal: carousal,
          sector: sector,
          owner: owner,
          projectDates: projectDates,
          categories: categories,
          introduction: introduction,
        };
    
    const formData = new FormData();
      formData.append('data', JSON.stringify(data));
    {[...items]?.map((item, index) => formData.append('files.image', item, item.name))}
    formData.append('files.image', image, image.name);

    const createResponse = await fetch("http://localhost:1337/api/projects", {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    if (createResponse.ok) {
      alert('Project created successfully!');
     fetchData();
     navigate("/projects")
    } else {
      setError('Failed to create project');
    }
  } catch (error) {
    console.error('Error:', error);
    setError('An error occurred while processing your request');
  } finally {
    setLoading(false);
  }
}

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "100px" }}>
      <form onSubmit={handleSubmit} style={{ background: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(20px)', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', gap: '15px', width: '80%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="name" style={{ color: '#fff', fontSize: '18px' }}>Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="slug" style={{ color: '#fff', fontSize: '18px' }}>Slug:</label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 100%', marginBottom: '15px' }}>
            <label htmlFor="specifics" style={{ color: '#fff', fontSize: '18px' }}>Specifics:</label>
            <textarea
              id="specifics"
              value={specifics}
              onChange={(e) => setSpecifics(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%', minHeight: '100px' }}
            />
          </div>
          <div style={{ flex: '0 0 100%', marginBottom: '15px' }}>
            <label htmlFor="description" style={{ color: '#fff', fontSize: '18px' }}>Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%', minHeight: '100px' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="carousal" style={{ color: '#fff', fontSize: '18px' }}>Carousal:</label>
            <input
              type="file"
              id="carousal"
              onChange={(e) => setCarousal(e.target.files)}
              accept="image/*"
              multiple
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="sector" style={{ color: '#fff', fontSize: '18px' }}>Sector:</label>
            <input
              type="text"
              id="sector"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="owner" style={{ color: '#fff', fontSize: '18px' }}>Owner:</label>
            <input
              type="text"
              id="owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="projectDates" style={{ color: '#fff', fontSize: '18px' }}>Project Dates:</label>
            <input
              type="text"
              id="projectDates"
              value={projectDates}
              onChange={(e) => setProjectDates(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="image" style={{ color: '#fff', fontSize: '18px' }}>Image:</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 100%', marginBottom: '15px' }}>
            <label htmlFor="introduction" style={{ color: '#fff', fontSize: '18px' }}>Introduction:</label>
            <textarea
              id="introduction"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%', minHeight: '100px' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="categories" style={{ color: '#fff', fontSize: '18px' }}>Categories:</label>
            <input
              type="text"
              id="categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
        </div>
        <button type="submit" style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#6AAFE6', color: '#fff', cursor: 'pointer', width: 'fit-content', alignSelf: 'flex-end' }}>Submit</button>
      </form>
    </div>
  );
}

export default ProjectForm;
