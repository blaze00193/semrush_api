import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { lightBlue } from "@mui/material/colors";

const AllPosTable = ({ data }) => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }} sx={{overflow:"auto", width:"100%"}}>
      <Table style={{minWidth:"1024px", width: "100%"}}>
        <TableHead>
          <TableRow style={{backgroundColor:"lightBlue"}}>
            <TableCell>{t("No")}</TableCell>
            <TableCell>{t("Incoming Keywords")}</TableCell>
            <TableCell>{t("Position")}</TableCell>
            <TableCell>{t("Traffic(%)")}</TableCell>
            <TableCell>{t("SearchVolume")}</TableCell>
            <TableCell>{t("Cpc")}</TableCell>
            <TableCell>{t("Url")}</TableCell>
            <TableCell>{t("Traffic Cost")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {data.map((row, index) => (
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{row.Keyword}</TableCell>
                    <TableCell>{row.Position}</TableCell>
                    <TableCell>{row["Traffic (%)"]}</TableCell>
                    <TableCell>{row["Search Volume"]}</TableCell>
                    <TableCell>{row.CPC}</TableCell>
                    <TableCell>
                        <a href={row.Url} target="_blank" rel="noopener noreferrer">
                            {row.Url}
                        </a>
                    </TableCell>
                    <TableCell>{row["Traffic Cost (%)"]}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllPosTable;
