import { Button, TextField,  Grid } from "@mui/material"
import { useTranslation } from "react-i18next";
import "../i18n";
const InputDomain = ({domain, setDomain, onClick}) => {
    const {t} = useTranslation();
    return (
        <>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                <TextField label={t("inputLabel")} variant="outlined" value={domain} onChange={(e) => setDomain(e.target.value)} fullWidth sx={{ flex: 4 }} />
                <Button variant="contained" onClick={onClick} sx={{ flex: 1 }}>
                    {t("analyzeButton")}
                </Button>
            </Grid>
        </>
    )
}

export default InputDomain;