import React, { useState } from "react";
import { Button, CircularProgress, Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../i18n";
import InputDomain from "./InputDomain";
import RankingMap from "./RankingMap";
import SubPostion from "./SubPostion";
import AllPostion from "./AllPosition";
import Trends from "./Trends";

const DomainAnalysis = () => {
  const { t } = useTranslation();
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [activeComponent, setActiveComponent] = useState(0); // Index of the active component

  const components = [
    { key: "rankingMap", label: t("Competive search ranking map"), component: <RankingMap data={data?.[0]} /> },
    { key: "subPositon", label: t("SubPostion"), component: <SubPostion data={data?.[1]} /> },
    { key: "allPositon", label: t("AllPostion"), component: <AllPostion data={data?.[2]} /> },
    { key: "adwordsKey", label: t("Adwords"), component: <Trends data={data?.[3]} /> }
    // Add more components as needed
  ];

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/analyze-domain?domain=${domain}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching domain analysis:", error);
      setData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: "40px", maxWidth: "1440px", mx: "auto" }}>
      {/* Sidebar */}
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          alignItems: { xs: "center", md: "flex-start" },
          gap: 2,
          width: { xs: "100%", md: "15%" },
          padding: 2,
          borderRight: { md: "1px solid #ddd" },
          borderBottom: { xs: "1px solid #ddd", md: "none" },
        }}
      >
        {components.map((item, index) => (
          <Button
            key={item.key}
            variant={activeComponent === index ? "contained" : "outlined"}
            onClick={() => setActiveComponent(index)}
            sx={{
              width: { xs: "90%", md: "95%" },
              margin: "0 auto",
            }}
          >
            {item.label}
          </Button>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid
        item
        xs={12}
        md={9}
        sx={{
          width: { xs: "100%", md: "85%" },
          padding: 2,
        }}
      >
        <InputDomain domain={domain} setDomain={setDomain} onClick={handleAnalyze} />
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {data && components[activeComponent]?.component}
      </Grid>
    </Grid>
  );
};

export default DomainAnalysis;
