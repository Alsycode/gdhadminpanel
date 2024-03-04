import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { useTempleData } from '../../components/context';
function Form() {
  const { userData } = useAuth();
  const [nameInEnglish, setNameInEnglish] = useState('');
  const [nameInMalayalam, setNameInMalayalam] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [content, setContent] = useState('');
  const [district, setDistrict] = useState('');
  const [place, setPlace] = useState('');
  const [slug, setSlug] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [siteDirection, setSiteDirection] = useState(true); // Assuming default value is true
  const [siteUrl, setSiteUrl] = useState('');
  const [id, setId] = useState('');
  const [image1, setImage1] = useState(null); // New state for image1
  const [image2, setImage2] = useState(null); // New state for image2
  const [dietyImage, setDietyImage] = useState([]);
  const [deities, setDeities] = useState([{ nameinenglish: '', nameinmalayalam: '', mainDeity: false, image: null }]);
  
  const handleAddDeity = () => {
    setDeities([...deities, { nameinenglish: '', nameinmalayalam: '', mainDeity: false, image: null }]);
  }; 
const handleDeityChange = (index, key, value) => {
  // Create a copy of the existing deities array
  const updatedDeities = [...deities];
  // Update the specific deity object at the given index with the new value
  updatedDeities[index] = { ...updatedDeities[index], [key]: value };
  // Set the state to the updated array
  setDeities(updatedDeities);
};

  const handleRemoveDeity = (index) => {
    const updatedDeities = [...deities];
    updatedDeities.splice(index, 1);
    setDeities(updatedDeities);
  };
  console.log("image1",image1)


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nameInEnglish || !nameInMalayalam || !image) {
      setError('Please fill out all fields');
      return;
    }

    setLoading(true);

    const data = {
             nameinenglish: nameInEnglish,
          nameinmalayal: nameInMalayalam,
          content: content,
          district: district,
          place: place,
          slug: slug,
          url: url,
          mapurl: url,
          email: email,
          address: address,
          number: number,
          siteDirection: siteDirection,
          siteUrl: siteUrl,
          id: id,
          diety: deities
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('files.image', image, image.name);
    formData.append('files.image1', image1, image.name1);
    formData.append('files.image2', image2, image2.name);
    deities?.map((deity, index) => {
      // Assuming image2 and deity.image are already defined
      formData.append(`files.diety[${index}].image`, deity?.image, deity.image?.name);
    });
   

    const token = '36d91d755f6933406f808c6bf39e61dfc5f91f83192d27953c1408254968d8370a23e758ffaa7a7aeefdebb91c21a8d6b7eb8dd771d427e6ee01f7e42e831681d35e263fc04f9209e5e02b6d5473a7899c896a983904eac92709ec1bb86fc2b726314bb0cebb7cfec92e46cd284328bf1a21e17736509a74b2ced35db5ef0265';

    try {
      const response = await fetch('http://localhost:1337/api/temple-lists', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Temple entry created successfully!');
        setNameInEnglish('');
        setNameInMalayalam('');
        setImage(null);
      } else {
        setError('Failed to create temple entry');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing your request');
    } finally {
      setLoading(false);
    }
  };

 console.log("dieties",deities)
//  const namess = deities[0]?.image?.name; 
//  const file = deities[0]?.image;
//  const
// console.log("name",namess)
  return (

    <div style={{ display: 'flex',borderRadius:"50px", justifyContent: 'center', alignItems: 'center',paddingTop:"60px",marginTop:"100px" }}>
      <form onSubmit={handleSubmit} style={{ background: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(20px)', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', gap: '15px', width: '80%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="nameInEnglish" style={{ color: '#fff', fontSize: '18px' }}>Name in English:</label>
            <input
              type="text"
              id="nameInEnglish"
              value={nameInEnglish}
              onChange={(e) => setNameInEnglish(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="nameInMalayalam" style={{ color: '#fff', fontSize: '18px' }}>Name in Malayalam:</label>
            <input
              type="text"
              id="nameInMalayalam"
              value={nameInMalayalam}
              onChange={(e) => setNameInMalayalam(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="district" style={{ color: '#fff', fontSize: '18px' }}>District:</label>
            <input
              type="text"
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
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
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="email" style={{ color: '#fff', fontSize: '18px' }}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="address" style={{ color: '#fff', fontSize: '18px' }}>Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="id" style={{ color: '#fff', fontSize: '18px' }}>ID:</label>
            <input
              type="number"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="number" style={{ color: '#fff', fontSize: '18px' }}>Number:</label>
            <input
              type="text"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px', alignItems: 'center' }}>
            <label htmlFor="siteDirection" style={{ color: '#fff', fontSize: '18px' }}>Site Direction:</label>
            <input
              type="checkbox"
              id="siteDirection"
              checked={siteDirection}
              onChange={(e) => setSiteDirection(e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer', marginLeft: '10px' }}
            />
          </div>
          <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
            <label htmlFor="siteUrl" style={{ color: '#fff', fontSize: '18px' }}>Site URL:</label>
            <input
              type="text"
              id="siteUrl"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
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
             
              style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
            />
            </div>
          <div style={{ flex: '0 0 100%', marginBottom: '15px' }}>
  <label htmlFor="content" style={{ color: '#fff', fontSize: '18px' }}>Content:</label>
  <textarea
    id="content"
    value={content}
    onChange={(e) => setContent(e.target.value)}
    style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%', height: '400px' }}
  />
</div>
        {/* New image1 field */}
        <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
          <label htmlFor="image1" style={{ color: '#fff', fontSize: '18px' }}>Image 1:</label>
          <input
            type="file"
            id="image1"
            onChange={(e) => setImage1(e.target.files[0])}
            accept="image/*"
          
            style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
          />
        </div>
        {/* New image2 field */}
        <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
          <label htmlFor="image2" style={{ color: '#fff', fontSize: '18px' }}>Image 2:</label>
          <input
            type="file"
            id="image2"
            onChange={(e) => setImage2(e.target.files[0])}
            accept="image/*"
            
            style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
          />
        </div>
        <div id="deities" style={{ display: 'flex', flexDirection: 'column', gap: '10px',}}>
          <h3>Dieties {deities.length}</h3>
          {deities.map((deity, index) => (
            <div style={{background: "linear-gradient(135deg, #ffe259, #ffa751)", marginBottom:"30px", padding: "20px", borderRadius: '20px' }} key={index}>



              <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
          <label htmlFor="image2" style={{ color: '#fff', fontSize: '18px' }}>Name in English:</label>
              <input
                type="text"
                value={deity.nameinenglish}
                onChange={(e) => handleDeityChange(index, 'nameinenglish', e.target.value)}
                placeholder="Name in English"
                style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
              />
              </div>
              <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
          <label htmlFor="image2" style={{ color: '#fff', fontSize: '18px' }}>Name in Malayalam:</label>
              <input
                type="text"
                value={deity.nameinmalayalam}
                onChange={(e) => handleDeityChange(index, 'nameinmalayalam', e.target.value)}
                placeholder="Name in Malayalam"
                style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
              />
              </div>
              <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
              <label htmlFor="image2" style={{ color: '#fff', fontSize: '18px' }}>
                Main Deity:</label>
                <input
                  type="checkbox"
                  checked={deity.maindiety}
                  onChange={(e) => handleDeityChange(index, 'maindiety', e.target.checked)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer', marginLeft: '10px' }}
                />
              </div>
              <div style={{ flex: '0 0 48%', marginBottom: '15px' }}>
             <label htmlFor="ddietyImage" style={{ color: '#fff', fontSize: '18px' }}>Image:</label>
             <input
               type="file"
               id="dietyImage"
               onChange={(e) => handleDeityChange(index, 'image', e.target.files[0])}
               accept="image/*"
              
               style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', color: '#fff', width: '100%' }}
             />
             </div>
              <button style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#6AAFE6', color: '#fff', cursor: 'pointer', width: 'fit-content', alignSelf: 'center' }} onClick={() => handleRemoveDeity(index)}>Remove Deity</button>
            </div>
            
          ))}
        </div>
     

        </div>
        <button style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#6AAFE6', color: '#fff', cursor: 'pointer', width: 'fit-content', alignSelf: 'center' }} onClick={handleAddDeity}>Add Deity</button>
        <button type="submit" style={{ padding: '10px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#6AAFE6', color: '#fff', cursor: 'pointer', width: 'fit-content', alignSelf: 'center' }}>Submit</button>
      </form>
    </div>
  );
}

export default Form;
