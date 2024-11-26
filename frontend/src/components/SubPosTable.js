import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { lightBlue } from "@mui/material/colors";

const SubPosTable = ({ data }) => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }} sx={{overflow:"auto", width:"100%"}}>
      <Table style={{minWidth:"1024px", width: "100%"}}>
        <TableHead>
          <TableRow style={{backgroundColor: "lightBlue"}}>
            <TableCell>{t("Incoming Keywords")}</TableCell>
            <TableCell>{t("Position")}</TableCell>
            <TableCell>{t("Previous Position")}</TableCell>
            <TableCell>{t("Traffic(%)")}</TableCell>
            <TableCell>{t("SearchVolume")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
            <TableCell>{row.Keyword}</TableCell>
            <TableCell>{row.Position}</TableCell>
            <TableCell>{row["Previous Position"]}</TableCell>
            <TableCell>{row["Traffic (%)"]}</TableCell>
            <TableCell>{row["Search Volume"]}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubPosTable;
