import React, { useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase"; // Your Firebase configuration file
import { useDispatch } from "react-redux";
import { addCompany } from "../redux/apiCalls"; // Ensure you have this action creator
import {
  showSuccessToast,
  showErrorToast,
} from "../components/toastNotifications";

// Styled components
const NewCompanyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  padding: 20px;
  max-width: 800px;
  background-color: #f4f4f4;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const AddCompanyForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AddCompanyItem = styled.div`
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  > label {
    color: #555;
    font-weight: bold;
    margin-bottom: 5px;
  }

  > input,
  > select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
  }
`;

const AddCompanyButton = styled.button`
  width: 200px;
  padding: 10px 0;
  border: none;
  border-radius: 20px;
  background-color: #0056b3;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #004494;
  }
`;

export default function NewCompany() {
  const [companyData, setCompanyData] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCompanyData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogoUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const storage = getStorage(app);
      const fileName = `companies/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          showErrorToast("Failed to upload logo.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const updatedCompanyData = { ...companyData, logo: downloadURL };
            addCompany(updatedCompanyData, dispatch)
              .then(() => showSuccessToast("Company added successfully!"))
              .catch((error) => {
                console.error("Error adding company:", error);
                showErrorToast("Error adding company.");
              });
          });
        }
      );
    } else {
      // Handle company addition without logo upload
      addCompany(companyData, dispatch)
        .then(() => showSuccessToast("Company added successfully!"))
        .catch((error) => {
          console.error("Error adding company:", error);
          showErrorToast("Error adding company.");
        });
    }
  };

  return (
    <NewCompanyContainer>
      <FormTitle>Add New Company</FormTitle>
      <AddCompanyForm>
        {/* Company Name */}
        <AddCompanyItem>
          <label>Company Name</label>
          <input name="companyName" type="text" onChange={handleChange} />
        </AddCompanyItem>

        {/* Company Username */}
        <AddCompanyItem>
          <label>Company Username</label>
          <input name="username" type="text" onChange={handleChange} />
        </AddCompanyItem>

        {/* Company Username */}
        <AddCompanyItem>
          <label>Password</label>
          <input name="password" type="password" onChange={handleChange} />
        </AddCompanyItem>

        {/* Email */}
        <AddCompanyItem>
          <label>Email</label>
          <input name="email" type="email" onChange={handleChange} />
        </AddCompanyItem>

        {/* Phone Number */}
        <AddCompanyItem>
          <label>Phone Number</label>
          <input name="phone" type="text" onChange={handleChange} />
        </AddCompanyItem>

        {/* Address */}
        <AddCompanyItem>
          <label>Address</label>
          <input name="address" type="text" onChange={handleChange} />
        </AddCompanyItem>

        {/* Logo Upload */}
        <AddCompanyItem>
          <label>Company Logo</label>
          <input type="file" onChange={handleLogoUpload} />
        </AddCompanyItem>

        <AddCompanyButton onClick={handleSubmit}>
          Create Company
        </AddCompanyButton>
      </AddCompanyForm>
    </NewCompanyContainer>
  );
}
