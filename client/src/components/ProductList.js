import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/products?page=${pageNumber}`
      );
      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.products,
      ]);
      console.log(JSON.stringify(response, null, 2));
      setPage(response.data.page);
      setHasMore(response.data.page < response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <Container maxWidth="md" sx={{ my: 1 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        textAlign="center"
        sx={{
          fontFamily: "Kdam Thmor Pro",
        }}
      >
        Products
      </Typography>
      <Grid container justifyContent="flex-end" spacing={0} mb={2}>
        <Link to="/add-product">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{
              color: "#fff",
              fontFamily: "Kdam Thmor Pro",
            }}
          >
            Add a product
          </Button>
        </Link>
      </Grid>
      <InfiniteScroll
        dataLength={products.length}
        next={() => fetchProducts(page + 1)}
        hasMore={hasMore}
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
      >
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product._id} xs={6} sm={4} md={3} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.REACT_APP_SERVER_BASE_URL}/${product.images[0]}`}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
};

export default ProductList;
