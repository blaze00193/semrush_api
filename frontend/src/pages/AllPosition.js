import { Typography, Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../i18n";
import AllPosTable from "@/components/AllPosTable";

const AllPostion = ({data}) => {
    const {t} = useTranslation();
    return(
        <>
            <Grid item xs={12}>
                { data && data.semrush_data ? (<AllPosTable data={data.semrush_data} />) : (<Typography>{t("No data available for the selected component.")}</Typography>)}
            </Grid>       
            <Grid item xs={12}>
                <Typography>{ data && data.ai_insight ? data.ai_insight : t("No data available for the selected component.")}</Typography>
            </Grid>
        </>
    )
}

export default AllPostion;