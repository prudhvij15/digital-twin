import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid2 } from "@mui/material";
import Grid from "@mui/material/Grid2";
import RealTimeData from "./Chart";
import Controls from "./Controls";
import { fetchData } from "../services/api";
import InsertDataForm from "./InsertData";

const Dashboard: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchData();
      setData(response);
    };
    loadData();
  }, []);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Biodegradability Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid size={8}>
          {" "}
          <Card>
            <CardContent>
              <Typography variant="h6">Biodegradability Over Time</Typography>
              <RealTimeData />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={4}>
          {" "}
          <Card>
            <CardContent>
              <Typography variant="h6">Simulation Controls</Typography>
              <Controls />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <InsertDataForm />
    </Box>
  );
};

export default Dashboard;
