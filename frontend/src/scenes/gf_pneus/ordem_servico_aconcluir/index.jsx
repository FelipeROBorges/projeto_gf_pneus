import { Box, Typography } from "@mui/material";
import * as React from "react";

// Propriedades compartilhadas
export const shared_props = {
  entity_name: "ordem_servico_nao_concluida",
  title: "Ordens a Concluir",
  module: "gfp",
};

// Propriedades Index
export const indexProps = {
  ...shared_props,
  columns: (dateFormatter, colors) => {
    return [
      { field: "id", headerName: "ID", headerClassName: "colum--header" },
      {
        field: "servico",
        headerClassName: "colum--header",
        headerName: "Serviço",
        flex: 1,
      },
      {
        field: "placa",
        headerClassName: "colum--header",
        headerName: "Placa",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "modelo",
        headerClassName: "colum--header",
        headerName: "Modelo",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "status",
        headerClassName: "colum--header",
        headerName: "Status",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "created_at",
        headerClassName: "colum--header",
        headerName: "Data de Criação",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "updated_at",
        headerClassName: "colum--header",
        headerName: "Última Atualização",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
    ];
  },
  supress_view: true,
  supress_add: true,
  supress_delete: true,
  supress_alter: true,
};

export default {
  indexProps,
};
