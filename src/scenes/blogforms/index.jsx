import React, { useState } from 'react';
import { useTempleData } from '../../components/context';
import { useParams, useNavigate } from 'react-router-dom';
function BlogForm() {
  const navigate = useNavigate();
  const { fetchData } = useTempleData();
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [description2, setDescription2] = useState('');
   const [slug, setSlug] = useState('');
  const [blockQuote, setBlockQuote] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
console.log("image",image);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!author || !date || !title || !description || !description2 || !slug || !blockQuote || !image) {
      setError('Please fill out all fields');
      return;
    }

    setLoading(true);

    // Your authentication token
    const token = '36d91d755f6933406f808c6bf39e61dfc5f91f83192d27953c1408254968d8370a23e758ffaa7a7aeefdebb91c21a8d6b7eb8dd771d427e6ee01f7e42e831681d35e263fc04f9209e5e02b6d5473a7899c896a983904eac92709ec1bb86fc2b726314bb0cebb7cfec92e46cd284328bf1a21e17736509a74b2ced35db5ef0265';

    try {
      const data = {
        author:author,
        date:date,
        title:title,
        description:description,
        description2:description2,
        slug:slug,
        blockQuote:blockQuote,
       };

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('files.image', image, image.name);

      const createResponse = await fetch("http://localhost:1337/api/blogs", {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (createResponse.ok) {
        alert('Blog entry created successfully!');
       navigate("/blogs");
       fetchData();
      } else {
        setError('Failed to create blog entry');
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
            <label htmlFor="author" style={{ color: '#fff', fontSize: '18px' }}>Author:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="date" style={{ color: '#fff', fontSize: '18px' }}>Date:</label>
            <input
              type="text"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="title" style={{ color: '#fff', fontSize: '18px' }}>Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
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
            <label htmlFor="description2" style={{ color: '#fff', fontSize: '18px' }}>Description 2:</label>
            <textarea
              id="description2"
              value={description2}
              onChange={(e) => setDescription2(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%', minHeight: '100px' }}
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
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="blockQuote" style={{ color: '#fff', fontSize: '18px' }}>Block Quote:</label>
            <textarea
              id="blockQuote"
              value={blockQuote}
              onChange={(e) => setBlockQuote(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%', minHeight: '100px' }}
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
        </div>
        <button type="submit" style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#6AAFE6', color: '#fff', cursor: 'pointer', width: 'fit-content', alignSelf: 'flex-end' }}>Submit</button>
      </form>
    </div>
  );
}

export default BlogForm;
