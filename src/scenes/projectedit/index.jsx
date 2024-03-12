import React, { useState,useEffect } from 'react';
import { useTempleData } from "../../components/context";
import { useParams, useNavigate } from 'react-router-dom'; 
function ProjectEditForm() {
const [id,setId] = useState("");
const { projectData,fetchData } = useTempleData();
const { slug } = useParams();
console.log("projectss",projectData)
  const [name, setName] = useState('');
const [originalName, setOriginalName] = useState('');
const navigate = useNavigate(); 
const [slugVal, setSlugVal] = useState('');
const [originalSlugVal, setOriginalSlugVal] = useState('');

const [specifics, setSpecifics] = useState('');
const [originalSpecifics, setOriginalSpecifics] = useState('');

const [description, setDescription] = useState('');
const [originalDescription, setOriginalDescription] = useState('');

const [carousal, setCarousal] = useState([]);
const [originalCarousal, setOriginalCarousal] = useState([]);

const [sector, setSector] = useState('');
const [originalSector, setOriginalSector] = useState('');

const [owner, setOwner] = useState('');
const [originalOwner, setOriginalOwner] = useState('');

const [projectDates, setProjectDates] = useState('');
const [originalProjectDates, setOriginalProjectDates] = useState('');

const [image, setImage] = useState(null);
const [originalImage, setOriginalImage] = useState(null);

const [introduction, setIntroduction] = useState('');
const [originalIntroduction, setOriginalIntroduction] = useState('');

const [categories, setCategories] = useState('');
const [originalCategories, setOriginalCategories] = useState('');

  const [error, setError] = useState('');
  const [loading,setLoading] =  useState('');
  const items = carousal;

  useEffect(() => {
    const currententry = projectData?.data?.find(blog => blog.attributes.slug === slug);
    if (currententry) {
        setId(currententry.id);
        setName(currententry.attributes.name);
        setOriginalName(currententry.attributes.name);
        setSlugVal(currententry.attributes.slug);
        setOriginalSlugVal(currententry.attributes.slug);
        setSpecifics(currententry.attributes.specifics);
        setOriginalSpecifics(currententry.attributes.specifics);
        setDescription(currententry.attributes.description);
        setOriginalDescription(currententry.attributes.description);
        setSector(currententry.attributes.secctor);
        setOriginalSector(currententry.attributes.sector);
        setOwner(currententry.attributes.owner);
        setOriginalOwner(currententry.attributes.owner);
        setProjectDates(currententry.attributes.projectdates);
        setOriginalProjectDates(currententry.attributes.projectdates);
        setIntroduction(currententry.attributes.introduction);
        setOriginalIntroduction(currententry.attributes.introduction);
        setCategories(currententry.attributes.categories);
        setOriginalCategories(currententry.attributes.categories);
        console.log('currententry:', currententry);
    }
  }, [projectData, slug]);

console.log("specifics",specifics);
const handleDelete = async () => {
  const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
  if (confirmDelete) {
    // Your authentication token
    const token = '36d91d755f6933406f808c6bf39e61dfc5f91f83192d27953c1408254968d8370a23e758ffaa7a7aeefdebb91c21a8d6b7eb8dd771d427e6ee01f7e42e831681d35e263fc04f9209e5e02b6d5473a7899c896a983904eac92709ec1bb86fc2b726314bb0cebb7cfec92e46cd284328bf1a21e17736509a74b2ced35db5ef0265';

    try {
      // Ensure id is set before making the delete request
      if (!id) {
        setError('Testimony id not found');
        return;
      }

      const deleteResponse = await fetch(`http://localhost:1337/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (deleteResponse.ok) {
        alert('Project deleted successfully!');
        fetchData();
        navigate('/projects');
      } else {
        setError('Failed to delete testimony entry');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing your request');
    }
  }
}


const handleSubmit = async (event) => {
  event.preventDefault();

//   if (!name || !slug || !specifics || !description || !carousal.length || !sector || !owner || !projectDates || !categories || !introduction || !image) {
//     setError('Please fill out all fields');
//     return;
//   }

  setLoading(true);

  const token = '36d91d755f6933406f808c6bf39e61dfc5f91f83192d27953c1408254968d8370a23e758ffaa7a7aeefdebb91c21a8d6b7eb8dd771d427e6ee01f7e42e831681d35e263fc04f9209e5e02b6d5473a7899c896a983904eac92709ec1bb86fc2b726314bb0cebb7cfec92e46cd284328bf1a21e17736509a74b2ced35db5ef0265'; // Replace with your authentication token
    try {
        const data = {};
         
    if (name !== originalName) {
        data.name = name;
    }
    if (slugVal !== originalSlugVal) {
        data.slug = slug;
    }
    if (specifics !== originalSpecifics) {
data.specifics = specifics;
    }
    if (sector !== originalSector) {
        data.sector = sector;
    }
    if (owner !== originalOwner) {
        data.owner = owner;
    }
    if (projectDates !== originalProjectDates) {
        data.projectDates = projectDates;
    }
    if (categories !== originalCategories) {
        data.categories = categories;
    }
    if (introduction !== originalIntroduction) {
        data.introduction = introduction;
    }
    const formData = new FormData();
      formData.append('data', JSON.stringify(data));
    {[...items]?.map((item, index) => formData.append('files.image', item, item.name))}
    formData.append('files.image', image, image.name);

    
    const createResponse = await fetch(`http://localhost:1337/api/projects/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    if (createResponse.ok) {
      alert('Project updated successfully!');
     
    } else {
      setError('Failed to update project');
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
              value={slugVal}
              onChange={(e) => setSlugVal(e.target.value)}
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
        <button type="button" onClick={handleDelete} style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#FF0000', color: '#fff', cursor: 'pointer', width: 'fit-content', alignSelf: 'flex-end' }}>Delete</button>
        <button type="submit" style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#6AAFE6', color: '#fff', cursor: 'pointer', width: 'fit-content', alignSelf: 'flex-end' }}>Submit</button>
      </form>
    </div>
  );
}

export default ProjectEditForm;
