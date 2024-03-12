import React, { useState, useEffect } from 'react';
import { useTempleData } from "../../components/context";
import { useParams, useNavigate } from 'react-router-dom';
import { shouldSkipGeneratingVar } from '@mui/material';

function TestimonyEditForm() {
  const { testimonyData,fetchData } = useTempleData();
  const { slug } = useParams();
  const navigate = useNavigate();
console.log("tets",slug)
  // Initialize state variables with default values or values from currentData
  const [id, setId] = useState("");
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [designation, setDesignation] = useState('');
  const [place, setPlace] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [slugVal, setSlugVal] = useState("");
const item = testimonyData?.data?.find(testimony => testimony.attributes.slug === slug);
console.log("item",item);
  // Fetch the current testimony's data when the component mounts
  useEffect(() => {
    const currentTestimony = testimonyData?.data?.find(testimony => testimony.attributes.slug === slug);
    if (currentTestimony) {
        setId(currentTestimony.id);
      setName(currentTestimony.attributes.name);
      setText(currentTestimony.attributes.text);
      setDesignation(currentTestimony.attributes.designation);
      setPlace(currentTestimony.attributes.place);
      setSlugVal(currentTestimony.attributes.slug);
      // You may also want to pre-fill other fields if necessary
    }
  }, [testimonyData, slug]);
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
  
        const deleteResponse = await fetch(`http://localhost:1337/api/testimonies/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
  
        if (deleteResponse.ok) {
          alert('Testimony deleted successfully!');
          fetchData();
          navigate('/testimonies');
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

    if (!name || !text || !designation || !place || !image) {
      setError('Please fill out all fields');
      return;
    }

    setLoading(true);

    // Your authentication token
    const token = '36d91d755f6933406f808c6bf39e61dfc5f91f83192d27953c1408254968d8370a23e758ffaa7a7aeefdebb91c21a8d6b7eb8dd771d427e6ee01f7e42e831681d35e263fc04f9209e5e02b6d5473a7899c896a983904eac92709ec1bb86fc2b726314bb0cebb7cfec92e46cd284328bf1a21e17736509a74b2ced35db5ef0265';

    try {
      const data = {
        name: name,
        text: text,
        designation: designation,
        place: place,
        slug: slugVal
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('files.image', image, image.name);

      // Make a PUT request to update the testimony data
      // Replace the URL with your actual backend endpoint
      const updateResponse = await fetch(`http://localhost:1337/api/testimonies/${slug}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (updateResponse.ok) {
        alert('Testimony updated successfully!');
        window.location.href = '/testimony'; // Redirect to the testimonies page after successful update
      } else {
        setError('Failed to update testimony');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing your request');
    } finally {
      setLoading(false);
    }
  }

  // Render the form with input fields and submit button
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "100px" }}>
      <form onSubmit={handleSubmit} style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(200px)', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', gap: '15px', width: '80%' }}>
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
            <label htmlFor="text" style={{ color: '#fff', fontSize: '18px' }}>Text:</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%', minHeight: '100px' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="designation" style={{ color: '#fff', fontSize: '18px' }}>Designation:</label>
            <input
              type="text"
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="place" style={{ color: '#fff', fontSize: '18px' }}>Place:</label>
            <input
              type="text"
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
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
        </div>
        {error && <div>{error}</div>}
        <button type="button" onClick={handleDelete} style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#FF0000', color: '#fff', cursor: 'pointer', width: 'fit-content', alignSelf: 'flex-end' }}>Delete</button>
        <button type="submit" style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#6AAFE6', color: '#fff', cursor: 'pointer', width: 'fit-content', alignSelf: 'flex-end' }}>Submit</button>
      </form>
    </div>
  );
}

export default TestimonyEditForm;