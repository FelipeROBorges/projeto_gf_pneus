import { Box, Typography } from "@mui/material";
import React from "react";

export const shared_props = {
  entity_name: "operacao",
  title: "Operação",
  module: "adm",
};

// Propriedades Index
export const indexProps = {
  ...shared_props,
  columns: (dateFormatter, colors) => {
    return [
      { field: "id", headerName: "ID", headerClassName: "colum--header" },
      {
        field: "nome_usuario",
        headerClassName: "colum--header",
        headerName: "Nome",
        flex: 1,
      },
      {
        field: "nome",
        headerClassName: "colum--header",
        headerName: "Nome",
        flex: 1,
      },

      {
        field: "id_operacao",
        headerClassName: "colum--header",
        headerName: "Identificador",
        flex: 1,
      },

      {
        field: "created_at",
        headerClassName: "colum--header",
        headerName: "Data de Operação",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row: { created_at } }) => {
          if (!created_at) return "";
          return (
            <Box
              width="60%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              borderRadius="4px"
            >
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                {dateFormatter(created_at)}
              </Typography>
            </Box>
          );
        },
      },
    ];
  },
  supress_actions: true,
  supress_add: true,
};

export default {
  indexProps,
};
