import { Typography, Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../i18n";
import SubPosTable from "@/components/SubPosTable";

const SubPostion = ({data}) => {
    const {t} = useTranslation();
    return(
        <>
            <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    {t("Incoming Keywords")} :
                </Typography>
                <SubPosTable data={data.semrush_data} />
            </Grid>       
            <Grid item xs={12}>
                <Typography>{data.ai_insight ? data.ai_insight : t("noDataAvailable")}</Typography>
            </Grid>
        </>
    )
}

export default SubPostion;