import { Typography, Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../i18n";
import DataChart from "@/components/DataChart";

const Trends = ({data}) => {
    const {t} = useTranslation();
    return(
        <>
            <Grid item xs={12}>
                <DataChart data={data.semrush_data} />
            </Grid>       
            <Grid item xs={12}>
                <Typography>{data.ai_insight ? data.ai_insight : t("noDataAvailable")}</Typography>
            </Grid>
        </>
    )
}

export default Trends;