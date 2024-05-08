import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  showSuccessToast,
  showErrorToast,
} from "../components/toastNotifications";
import app from "../firebase";
import { addProduct } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

const sharedInputStyles = css`
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid #f0f0f3;
  background: #f0f0f3;
  margin-bottom: 10px;
  outline: none;
  &:focus {
    border: 2px solid gold;
  }
`;

const NewProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  padding: 20px;
  max-width: 800px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
`;

const FormTitle = styled.h1`
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
`;

const AddProductForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AddProductItem = styled.div`
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    color: black;
    font-weight: 600;
    margin-bottom: 10px;
  }

  input,
  textarea,
  select {
    ${sharedInputStyles}
  }

  input[type="checkbox"],
  input[type="radio"] {
    box-shadow: none;
    margin-right: 8px;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    label {
      display: flex;
      align-items: center;
    }
  }
`;

const AddProductButton = styled.button`
  width: 200px;
  padding: 10px 0;
  border: none;
  border-radius: 20px;
  background-color: #0056b3;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #004494;
  }
`;

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setInputs((prev) => ({
        ...prev,
        [name]: { ...prev[name], [value]: checked },
      }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    // For categories[0] which is for type like "VideoGames", "Movies", etc.
    setCategories([value, categories[1]]);
  };

  const handleGenreChange = (e) => {
    const { value } = e.target;
    // For categories[1] which is for genre like "Action", "RPG", etc.
    setCategories([categories[0], value]);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const productData = {
            ...inputs,
            img: downloadURL,
            price: parseFloat(inputs.price),
            salePercentage: parseFloat(inputs.salePercentage),
            console: Object.entries(inputs.console || {})
              .filter(([_, v]) => v)
              .map(([k, _]) => k),
            categories,
            type: inputs.type.split(","),
          };

          addProduct(productData, dispatch).then((result) => {
            if (!result.success) {
              showErrorToast("Adding Product failed!");
            } else {
              showSuccessToast("Adding Product successful!");
            }
          });
        });
      }
    );
  };

  return (
    <NewProductContainer>
      <FormTitle>Add a New Product</FormTitle>
      <AddProductForm>
        <AddProductItem>
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </AddProductItem>
        <AddProductItem>
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Product Title"
            onChange={handleChange}
          />
        </AddProductItem>
        <AddProductItem>
          <label>Description</label>
          <textarea
            name="description"
            type="text"
            placeholder="Product Description"
            onChange={handleChange}
          />
        </AddProductItem>
        <AddProductItem>
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </AddProductItem>

        <AddProductItem>
          <label>Category</label>
          <div>
            <label>
              <input
                type="radio"
                name="categories[0]"
                value="VideoGames"
                onChange={handleCategoryChange}
              />{" "}
              Video Games
            </label>
            <label>
              <input
                type="radio"
                name="categories[0]"
                value="Movies"
                onChange={handleCategoryChange}
              />{" "}
              Movies
            </label>
            <label>
              <input
                type="radio"
                name="categories[0]"
                value="FanMerch"
                onChange={handleCategoryChange}
              />{" "}
              Fan Merch
            </label>
          </div>
        </AddProductItem>
        <AddProductItem>
          <label>Genre</label>
          <input
            name="categories[1]"
            type="text"
            placeholder="Genre (e.g., Action, RPG)"
            onChange={handleGenreChange}
          />
        </AddProductItem>
        <AddProductItem>
          <label>Type</label>
          <input
            name="type"
            type="text"
            placeholder="Physical, Digital"
            onChange={handleChange}
          />
        </AddProductItem>
        <AddProductItem>
          <label>Console</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="console"
                value="Playstation"
                onChange={handleChange}
              />
              Playstation
            </label>
            <label>
              <input
                type="checkbox"
                name="console"
                value="Xbox"
                onChange={handleChange}
              />
              Xbox
            </label>
            <label>
              <input
                type="checkbox"
                name="console"
                value="Nintendo"
                onChange={handleChange}
              />
              Nintendo
            </label>
            <label>
              <input
                type="checkbox"
                name="console"
                value="PC"
                onChange={handleChange}
              />
              PC
            </label>
            <label>
              <input
                type="checkbox"
                name="console"
                value="NA"
                onChange={handleChange}
              />
              N/A
            </label>
          </div>
        </AddProductItem>
        <AddProductItem>
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </AddProductItem>

        <AddProductItem>
          <label>onSale</label>
          <select name="onSale" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </AddProductItem>

        <AddProductItem>
          <label>Sale Percentage</label>
          <input
            name="salePercentage"
            type="number"
            placeholder="Leave empty if no Sale"
            onChange={handleChange}
          />
        </AddProductItem>

        <AddProductButton onClick={handleClick}>Create</AddProductButton>
      </AddProductForm>
    </NewProductContainer>
  );
}
