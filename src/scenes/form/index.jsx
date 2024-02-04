  import React from "react";
  import { Box, Button, TextField } from "@mui/material";
  import { Formik } from "formik";
  import * as yup from "yup";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import Header from "../../components/Header";
  import { useDropzone } from 'react-dropzone';
  import {useState,useEffect} from "react"
  import { useTempleData } from "../../components/context";
  const Form = () => {
    const {newData,setNewData} = useTempleData();
    const [submittedValues, setSubmittedValues] = useState(null); // State to store submitted values
   const [addedValue,setAddedValue] = useState(null);
   useEffect(() => {
    // This block will be executed whenever newData changes
    console.log('New data has been added:', newData);
    
    // You can add more logic here if needed
  }, [newData]);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dropzoneStyle = {
      border: '2px dashed #cccccc',
      borderRadius: '4px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
    };
    const [files, setFiles] = useState([]);

    const onDrop = (acceptedFiles) => {
      setFiles(acceptedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleFormSubmit = (e, values) => {
      e.preventDefault();
      const newDataItem = {
        id: values.id,
        email: values.email,
        nameinenglish: values.nameinenglish,
        nameinmalayalam: values.nameinmalayalam,
        district: values.district,
      };
      setNewData([...newData, newDataItem]);
    
      setSubmittedValues(values); // Store the submitted values in state
     setAddedValue(newDataItem)

      // Call the Formik handleSubmit function
      
    };
    const createNewDataItem = (values) => ({
      id: submittedValues.id,
      email: values.email,
      nameinenglish: values.nameinenglish,
      nameinmalayalam: values.nameinmalayalam,
      district: values.district,
    });

    console.log("++++++++++++++++++++++++++++++",createNewDataItem)
    console.log("update-----------------",newData)
    console.log("newDta@@@@@@@@@@@",submittedValues)
   
    const handleImageChange = (event, setFieldValue) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFieldValue("image", reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleImage1Change = (event, setFieldValue) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFieldValue("image1", reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleImage2Change = (event, setFieldValue) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFieldValue("image2", reader.result);
        };
        reader.readAsDataURL(file);
      }
    };


    return (
      <Box m="20px">
        <Header title="Add new temple" />
  
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            // Your form submission logic here
            setSubmittedValues(values);
          }}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit, // Formik provides handleSubmit
            setFieldValue,
          }) => (
            <form onSubmit={e => handleSubmit(e)}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                }}
              >
                {/* ... */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Content"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.content}
                  name="content"
                  error={!!touched.content && !!errors.content}
                  helperText={touched.content && errors.content}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Created At"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.createdAt}
                  name="createdAt"
                  error={!!touched.createdAt && !!errors.createdAt}
                  helperText={touched.createdAt && errors.createdAt}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Deity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.deity}
                  name="deity"
                  error={!!touched.deity && !!errors.deity}
                  helperText={touched.deity && errors.deity}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="District"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.district}
                  name="district"
                  error={!!touched.district && !!errors.district}
                  helperText={touched.district && errors.district}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />
            <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-input"
                  type="file"
                  onChange={(event) => handleImageChange(event, setFieldValue)}
                  onBlur={handleBlur}
                  name="image"
                />
                <label htmlFor="image-input">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Image"
                    value={values.image}
                    error={!!touched.image && !!errors.image}
                    helperText={touched.image && errors.image}
                    sx={{ gridColumn: 'span 2' }}
                  />
                </label>

                {/* Image1 Field */}
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image1-input"
                  type="file"
                  onChange={(event) => handleImage1Change(event, setFieldValue)}
                  onBlur={handleBlur}
                  name="image1"
                />
                <label htmlFor="image1-input">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Image1"
                    value={values.image1}
                    error={!!touched.image1 && !!errors.image1}
                    helperText={touched.image1 && errors.image1}
                    sx={{ gridColumn: 'span 2' }}
                  />
                </label>

                {/* Image2 Field */}
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image2-input"
                  type="file"
                  onChange={(event) => handleImage2Change(event, setFieldValue)}
                  onBlur={handleBlur}
                  name="image2"
                />
                <label htmlFor="image2-input">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Image2"
                    value={values.image2}
                    error={!!touched.image2 && !!errors.image2}
                    helperText={touched.image2 && errors.image2}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  </label>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Map URL"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mapurl}
                  name="mapurl"
                  error={!!touched.mapurl && !!errors.mapurl}
                  helperText={touched.mapurl && errors.mapurl}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name in English"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nameinenglish}
                  name="nameinenglish"
                  error={!!touched.nameinenglish && !!errors.nameinenglish}
                  helperText={touched.nameinenglish && errors.nameinenglish}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name in Malayalam"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nameinmalayalam}
                  name="nameinmalayalam"
                  error={!!touched.nameinmalayalam && !!errors.nameinmalayalam}
                  helperText={touched.nameinmalayalam && errors.nameinmalayalam}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.number}
                  name="number"
                  error={!!touched.number && !!errors.number}
                  helperText={touched.number && errors.number}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Place"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.place}
                  name="place"
                  error={!!touched.place && !!errors.place}
                  helperText={touched.place && errors.place}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Published At"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.publishedAt}
                  name="publishedAt"
                  error={!!touched.publishedAt && !!errors.publishedAt}
                  helperText={touched.publishedAt && errors.publishedAt}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="SEO"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.seo}
                  name="seo"
                  error={!!touched.seo && !!errors.seo}
                  helperText={touched.seo && errors.seo}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Site Direction"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.siteDirection}
                  name="siteDirection"
                  error={!!touched.siteDirection && !!errors.siteDirection}
                  helperText={touched.siteDirection && errors.siteDirection}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Site URL"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.siteUrl}
                  name="siteUrl"
                  error={!!touched.siteUrl && !!errors.siteUrl}
                  helperText={touched.siteUrl && errors.siteUrl}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Update"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.update}
                  name="update"
                  error={!!touched.update && !!errors.update}
                  helperText={touched.update && errors.update}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Updated At"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.updatedAt}
                  name="updatedAt"
                  error={!!touched.updatedAt && !!errors.updatedAt}
                  helperText={touched.updatedAt && errors.updatedAt}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="URL"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.url}
                  name="url"
                  error={!!touched.url && !!errors.url}
                  helperText={touched.url && errors.url}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* ... */}
              </Box>
              {/* ... */}
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          )}
        </Formik>
        {/* ... (remaining code) */}
      </Box>
    );
  };
  
  // ... (validation and initial values)
  
  



  // ... (your existing validation and initial values)

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    // Add validations for other fields

    address: yup.string().required("required"),
  
    content:yup.string().required("required"),
  });

  const initialValues = {
    // Add initial values for other fields
    diety: "",
    district: "",
    address: "",
    mapurl: "",
  };

  export default Form;
