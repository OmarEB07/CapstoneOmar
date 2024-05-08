import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Publish } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { updateProduct } from "../redux/apiCalls"; // Make sure this function is correctly implemented in your apiCalls.js
import { toast } from "react-toastify"; // Import toast
import {
  showSuccessToast,
  showErrorToast,
} from "../components/toastNotifications";
// Styled Components
const Container = styled.div`
  display: flex;
  padding: 20px;
  margin: auto;
  max-width: 1200px;
  background-color: #f8f9fa;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InfoImg = styled.img`
  width: 60%;
  height: auto;
  object-fit: cover;
  margin-bottom: 10px;
`;

const InfoTitle = styled.h3`
  margin: 20px 0;
  color: #555;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  height: 100px;
  resize: vertical;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: #0d6efd;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0b5ed7;
  }
`;

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.product.products.find((p) => p._id === productId)
  );

  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(product?.img || ""); // Use a separate state for the image URL

  useEffect(() => {
    if (product) {
      setImgUrl(product.img); // Update image URL state when the product changes
    }
  }, [product]);

  const [formData, setFormData] = useState({
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
    salePercentage: product?.salePercentage || "",
    onSale: product?.onSale || false,
    inStock: product?.inStock || false,
    category: product?.categories?.[0] || "",
    genre: product?.categories?.[1] || "",
    console: product?.console || "",
    type: product?.type || "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        inStock: product.inStock,
        onSale: product.onSale,
        salePercentage: product.salePercentage,
        category: product.categories[0] || "",
        genre: product.categories[1] || "",
        console: product.console.join(","),
        type: product.type.join(","),
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdateProduct = async () => {
    let imageUrl = imgUrl; // Use the current state value

    if (file) {
      const storageRef = ref(
        getStorage(app),
        `products/${Date.now()}_${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            toast.error("Failed to upload image.");
            reject(error);
          },
          async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            setImgUrl(imageUrl); // Update state with the new image URL
            resolve(imageUrl);
          }
        );
      });
    }

    const updatedProduct = {
      ...formData,
      img: imageUrl, // Use the updated image URL
      price: parseFloat(formData.price),
      salePercentage: parseFloat(formData.salePercentage),
      inStock: formData.inStock,
      onSale: formData.onSale,

      categories: [formData.category, formData.genre],
      console: formData.console.split(","),
      type: formData.type.split(","),
    };

    const result = await updateProduct(productId, updatedProduct, dispatch);
    if (result.success) {
      showSuccessToast("Product updated successful!");
    } else {
      showErrorToast("Product update Failed");
    }
  };

  return (
    <Container>
      <LeftSection>
        <Label htmlFor="title">Product Name</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange}
        />

        <Label htmlFor="description">Product Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
        />

        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleInputChange}
        />

        <Label htmlFor="genre">Genre</Label>
        <Input
          id="genre"
          name="genre"
          type="text"
          value={formData.genre}
          onChange={handleInputChange}
        />

        <Label htmlFor="console">Console</Label>
        <Input
          id="console"
          name="console"
          type="text"
          value={formData.console}
          onChange={handleInputChange}
        />

        <Label htmlFor="type">Type</Label>
        <Input
          id="type"
          name="type"
          type="text"
          value={formData.type}
          onChange={handleInputChange}
        />

        <Label htmlFor="inStock">In Stock</Label>
        <Select
          id="inStock"
          name="inStock"
          value={formData.inStock}
          onChange={handleInputChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Select>

        <Label htmlFor="onSale">On Sale</Label>
        <Select
          id="onSale"
          name="onSale"
          value={formData.onSale}
          onChange={handleInputChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Select>

        <Label htmlFor="salePercentage">Sale Percentage</Label>
        <Input
          id="salePercentage"
          name="salePercentage"
          type="number"
          value={formData.salePercentage}
          onChange={handleInputChange}
        />

        <Label htmlFor="file">
          <Publish /> Change Image
        </Label>
        <Input
          type="file"
          id="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </LeftSection>
      <RightSection>
        <InfoImg
          src={imgUrl || "default_image_path.jpg"}
          alt={formData.title}
        />
        <InfoTitle>{formData.title}</InfoTitle>
        <Button onClick={handleUpdateProduct}>Update Product</Button>
      </RightSection>
    </Container>
  );
}
