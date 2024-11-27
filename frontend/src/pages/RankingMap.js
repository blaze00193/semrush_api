import BubbleChart from "@/components/BubbleChart";
import { Typography, Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../i18n";

const RankingMap = ({data}) => {
    const {t} = useTranslation();
    return(
        <>
            <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                {t("Competive search ranking map")} :
                </Typography>
                {data && data.semrush_data ?               
                    (<BubbleChart data={data.semrush_data} />) : (<Typography>{t("No data available for the selected component.")}</Typography>)
                }
            </Grid>  
            <Grid item xs={12}>
                <Typography>{data && data.ai_insight ? data.ai_insight : t("No data available for the selected component.")}</Typography>
            </Grid>
        </>
    )
}

export default RankingMap;