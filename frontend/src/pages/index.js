import React, { useState } from "react";
import { Button, CircularProgress, Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../i18n";
import InputDomain from "./InputDomain";
import RankingMap from "./RankingMap";
import SubPostion from "./SubPostion";
import AllPostion from "./AllPosition";
import Trends from "./Trends";
import _ from "lodash";

const DomainAnalysis = () => {
  const { t } = useTranslation();
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [activeComponent, setActiveComponent] = useState(0); // Index of the active component

  // List of components to render dynamically
  const components = [
    {
      key: "rankingMap",
      label: t("Competive search ranking map"),
      component: _.get(data, '[0]') ? <RankingMap data={data[0]} /> : null,
    },
    {
      key: "subPositon",
      label: t("SubPostion"),
      component: _.get(data, '[1]') ? <SubPostion data={data[1]} /> : null,
    },
    {
      key: "allPositon",
      label: t("AllPostion"),
      component: _.get(data, '[2]') ? <AllPostion data={data[2]} /> : null,
    },
    {
      key: "adwordsKey",
      label: t("Adwords"),
      component: _.get(data, '[3]') ? <Trends data={data[3]} /> : null,
    },
  ];

  const handleAnalyze = async () => {
    if (!domain.trim()) {
      alert(t("Please enter a valid domain"));
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/analyze-domain?domain=${encodeURIComponent(domain)}`);
      if (!response.ok) {
        alert("Fetch failed");
      }
      const result = await response.json();
      setData(result);
  
      // Create a JSON file for download
      const jsonBlob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(jsonBlob);
  
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${domain}_analysis.json`;  // Name the file based on the domain
      document.body.appendChild(a); // Append to the body to make it part of the DOM
      a.click(); // Simulate a click on the anchor element to trigger download
      document.body.removeChild(a); // Remove the anchor element from the DOM
      URL.revokeObjectURL(url); // Clean up the object URL
  
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
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        ) : data ? (
          _.get(components[activeComponent], 'component') || (
            <Box sx={{ textAlign: "center", my: 2 }}>{t("選択したコンポーネントのデータがありません。")}</Box>
          )
        ) : (
          <Box sx={{ textAlign: "center", my: 2 }}>{t("ドメインを入力して「分析する」をクリックすると、結果が表示されます。")}</Box>
        )}
      </Grid>
    </Grid>
  );
};

export default DomainAnalysis;
