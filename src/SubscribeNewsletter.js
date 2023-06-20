import React, { useState } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubscribeNewsletter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: ""
  });
  const [validation, setValidation] = useState({
    email: { error: false, message: "" },
    topic: { error: false, message: "" },
    typeOfSubscriber: { error: false, message: "" }
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
    setValidation((prevValidation) => ({
      ...prevValidation,
      [name]: { error: false, message: "" }
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newValidation = { ...validation };

    if (formData.email.trim() === "") {
      newValidation.email.error = true;
      newValidation.email.message = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newValidation.email.error = true;
      newValidation.email.message = "Invalid email format";
      isValid = false;
    }

    setValidation(newValidation);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const url =
        "https://100085.pythonanywhere.com/api/v1/subscribe-newsletter/e4f8bbdf-d998-4b3a-bc21-e99ab8267c86/";
      const data = {
        topic: "Internal updates weekly",
        subscriberEmail: formData.email,
        typeOfSubscriber: "internal team"
      };
      axios
        .post(url, data)
        .then((response) => {
          setResponseMessage(response.data.message);
          setOpenDialog(true);
          setFormData({
            email: ""
          });
          setValidation({
            email: { error: false, message: "" }
          });
        })
        .catch((error) => {
          setResponseMessage("CATCH");
          setOpenDialog(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleUnSubcribe = () => {
    navigate("/unsubscribe");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        maxWidth: "400px",
        margin: "0 auto"
      }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        zIndex={loading ? 1 : "auto"}
      >
        {loading && <LinearProgress />}
      </Box>
      <Typography
        variant="h5"
        style={{
          marginBottom: "24px",
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        Subscribe to Our Newsletter
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          style={{ marginBottom: "16px" }}
          value={formData.email}
          onChange={handleInputChange}
          error={validation.email.error}
          helperText={validation.email.message}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
          fullWidth
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe Now"}
        </Button>
      </form>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "16px" }}
        fullWidth
        onClick={handleUnSubcribe}
      >
        Unsubscribe
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Subscription Status</DialogTitle>
        <DialogContent>
          <Typography>{responseMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubscribeNewsletter;
