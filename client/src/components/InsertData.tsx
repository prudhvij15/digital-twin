import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import axios from "axios";

const InsertDataForm: React.FC = () => {
  const [rate, setRate] = useState<number>(0);
  const [moisture, setMoisture] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/insert-data", {
        rate,
        moisture,
      });

      setMessage(`Data inserted successfully! ID: ${response.data.id}`);
    } catch (error) {
      console.error("Error inserting data:", error);
      setMessage("Error inserting data. Please try again.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Insert Biodegradability Data
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Decomposition Rate (%)"
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Moisture (%)"
          type="number"
          value={moisture}
          onChange={(e) => setMoisture(Number(e.target.value))}
          fullWidth
          required
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: "10px" }}
        >
          Insert Data
        </Button>
      </form>

      {message && <Typography sx={{ marginTop: "10px" }}>{message}</Typography>}
    </Box>
  );
};

export default InsertDataForm;
