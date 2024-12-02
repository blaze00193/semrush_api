import { Typography, Grid, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../i18n";
import DataChart from "@/components/DataChart";
import { useEffect, useState } from "react";

const Trends = ({data}) => {
    const {t} = useTranslation();
    const [aiInsight, setAiInsight] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchAIInsight = async () => {
        if(!data || !data.semrush_data) return;
        setLoading(true);
        try{
            const response = await fetch("http://localhost:8000/api/openai-insight", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    data: data.semrush_data,
                }),
            });
            if(!response.ok) {
                throw new Error(t("Failed to fetch AI insights"));
            }
            const result = await response.json();
            setAiInsight(result.ai_insight); 
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAIInsight();
    }, [data]);
    return(
        <>
            <Grid item xs={12}>
                {data && data.semrush_data ? (<DataChart data={data.semrush_data} />): (<Typography>{t("No data available for the selected component.")}</Typography>)}
            </Grid>       
            <Grid item xs={12} sx={{ mt: 2 }}>
                {loading ? (
                <CircularProgress />
                ) : error ? (
                <Typography color="error">{error}</Typography>
                ) : aiInsight ? (
                <Typography>{aiInsight}</Typography>
                ) : (
                <Typography>{t("No AI insights available for the selected component.")}</Typography>
                )}
            </Grid>
        </>
    )
}

export default Trends;