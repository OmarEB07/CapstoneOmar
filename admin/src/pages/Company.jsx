import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { updateCompany, getCompanies } from "../redux/apiCalls";
import {
  showSuccessToast,
  showErrorToast,
} from "../components/toastNotifications";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 50px auto;
  padding: 20px;
  max-width: 1200px;
  background-color: #f4f4f4;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  margin-left: 100px;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const RightSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ImagePreview = styled.img`
  width: 100%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InfoTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 25px;
  width: 100%;
  text-align: center;
  font-size: 40px;
`;

const FormItem = styled.div`
  margin-bottom: 20px;

  > label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
    color: #444;
  }

  > input,
  > select {
    width: 90%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  width: 50%;
  margin-left: 43%;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function EditCompany() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const company = useSelector((state) =>
    state.company.companies.find((c) => c._id === companyId)
  );
  const [companyData, setCompanyData] = useState(company || {});
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!company) {
      dispatch(getCompanies());
    } else {
      setCompanyData(company);
    }
  }, [company, companyId, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedData = { ...companyData };

    if (file) {
      const storage = getStorage(app);
      const fileName = `companies/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          showErrorToast("Failed to upload logo.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updatedData.logo = downloadURL;
            finalizeUpdate(updatedData);
          });
        }
      );
    } else {
      finalizeUpdate(updatedData);
    }
  };

  const finalizeUpdate = async (updatedData) => {
    const result = await updateCompany(companyId, updatedData, dispatch);
    if (result.success) {
      showSuccessToast("Company updated successfully!");
    } else {
      showErrorToast(result.error || "Failed to update company.");
    }
  };

  return (
    <Container>
      <InfoTitle>Edit Company</InfoTitle>
      <ContentContainer>
        <LeftSection>
          <ImagePreview
            src={companyData.logo || "https://via.placeholder.com/200"}
            alt="Company Logo"
          />
        </LeftSection>
        <RightSection>
          <Form onSubmit={handleSubmit}>
            <FormItem>
              <label>Company Username</label>
              <input
                type="text"
                name="username"
                value={companyData.username || ""}
                onChange={handleChange}
              />
            </FormItem>

            <FormItem>
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={companyData.companyName || ""}
                onChange={handleChange}
              />
            </FormItem>
            <FormItem>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={companyData.email || ""}
                onChange={handleChange}
              />
            </FormItem>
            <FormItem>
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={companyData.phone || ""}
                onChange={handleChange}
              />
            </FormItem>
            <FormItem>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={companyData.address || ""}
                onChange={handleChange}
              />
            </FormItem>
            <FormItem>
              <label>Change Logo</label>
              <input type="file" onChange={handleLogoUpload} />
            </FormItem>
            <Button type="submit">Update Company</Button>
          </Form>
        </RightSection>
      </ContentContainer>
    </Container>
  );
}
