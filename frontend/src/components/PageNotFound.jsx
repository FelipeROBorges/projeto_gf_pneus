import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      textAlign="center"
    >
      <Typography
        variant="h1"
        color="error"
        gutterBottom
        style={{ fontSize: "8rem" }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        color="error"
        gutterBottom
        style={{ fontSize: "2.3rem", marginTop: "-40px" }}
      >
        PÁGINA NÃO ENCONTRADA
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        paragraph
        style={{ fontSize: "1.1rem" }}
      >
        A página que você está procurando não existe ou foi removida.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Voltar para a página inicial
      </Button>
    </Box>
  );
};

export default PageNotFound;
