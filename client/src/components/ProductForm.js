import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Select,
  MenuItem,
  FormControl,
  Grid,
  IconButton,
  Box,
  Typography,
  FormLabel,
  Tooltip,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { CloudUpload, Close } from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import StyedInputBase from "./StyedInputBase";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "../App";

function ProductForm() {
  const { setSnackbarSeverity, setSnackbarText, handleSnackbarOpen } =
    useContext(SnackbarContext);

  const navigate = useNavigate();
  const initialProductData = {
    name: "",
    description: "",
    price: "",
    currency: "USD",
    images: [],
  };
  const [product, setProduct] = useState(initialProductData);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleQuillChange = (value) => {
    setProduct({ ...product, description: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (product.images.length < 6) {
      setProduct({ ...product, images: [...product.images, ...files] });
    } else {
      setSnackbarSeverity("error");
      setSnackbarText("Upto 6 images are allowed");
      handleSnackbarOpen();
    }
  };

  const deleteImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.description.trim() === "") {
      setSnackbarSeverity("error");
      setSnackbarText("Description is required");
      handleSnackbarOpen();
      return;
    }

    if (product.images.length === 0) {
      setSnackbarSeverity("error");
      setSnackbarText("No image selected");
      handleSnackbarOpen();
      return;
    }

    // Send product data and images to the back-end for storage
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("currency", product.currency);
    product.images.forEach((image, index) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/upload-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setSnackbarSeverity("success");
        setSnackbarText("Product uploaded successfully");
        navigate("/");
      } else {
        setSnackbarSeverity("error");
        setSnackbarText("Server error");
      }

      handleSnackbarOpen();
    } catch (error) {
      console.error(error);
      if (error.response.status === 400) {
        setSnackbarSeverity("error");
        setSnackbarText(error.response.data.error);
        handleSnackbarOpen();
      } else {
        setSnackbarSeverity("error");
        setSnackbarText("Server error");
        handleSnackbarOpen();
      }
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ my: 1 }}>
        <Tooltip title="Go back to dashboard">
          <IconButton
            aria-label="go back to dashboard"
            onClick={() => navigate("/")}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        </Tooltip>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign="center"
          sx={{
            fontFamily: "Kdam Thmor Pro",
          }}
        >
          Add a product
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel required>Name</FormLabel>
                <StyedInputBase
                  required
                  fullWidth
                  label="Name"
                  id="name"
                  name="name"
                  placeholder="Product name"
                  value={product.name}
                  onChange={handleInputChange}
                  error={!!error}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel required>Description</FormLabel>
                <ReactQuill
                  required
                  theme="snow"
                  value={product.description}
                  onChange={handleQuillChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel required>Price</FormLabel>
                <StyedInputBase
                  required
                  fullWidth
                  type="number"
                  label="Price"
                  name="price"
                  placeholder="Price"
                  value={product.price}
                  onChange={handleInputChange}
                  error={!!error}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <label
                  style={{
                    marginBottom: "2px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  Currency *
                </label>
                <Select
                  required
                  name="currency"
                  value={product.currency}
                  onChange={handleInputChange}
                  error={!!error}
                  input={<StyedInputBase fullWidth />}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="INR">INR</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                multiple
                id="images"
                name="images"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <label htmlFor="images">
                <Button
                  variant="outlined"
                  size="small"
                  component="span"
                  startIcon={<CloudUpload />}
                  sx={{ textTransform: "unset", fontFamily: "Josefin Sans" }}
                >
                  Upload Images
                </Button>
              </label>
            </Grid>
            {product.images.map((image, index) => (
              <Grid item key={index} xs={3}>
                <Box
                  sx={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                  }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    style={{ position: "absolute", top: 0, right: 0 }}
                    onClick={() => deleteImage(index)}
                  >
                    <Close sx={{ filter: "drop-shadow(2px 2px 5px #000)" }} />
                  </IconButton>
                </Box>
              </Grid>
            ))}

            <Grid item xs={12} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                sx={{
                  color: "#fff",
                  fontFamily: "Kdam Thmor Pro",
                }}
              >
                Upload Product
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default ProductForm;
