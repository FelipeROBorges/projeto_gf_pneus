import * as React from "react";
import { Box, Typography } from "@mui/material";
import * as yup from "yup";
import PerformantTextField from "../../../components/PerformantTextField";

// Propriedades gerais compartilhadas
export const shared_props = {
  entity_name: "servico",
  title: "Serviço",
  module: "gfp",
};

// Propriedades Index
export const indexProps = {
  ...shared_props,
  columns: (dateFormatter, colors) => {
    return [
      { field: "id", headerName: "ID", headerClassName: "colum--header" },
      {
        field: "nome",
        headerClassName: "colum--header",
        headerName: "Tipo",
        flex: 1,
      },
      {
        field: "created_at",
        headerClassName: "colum--header",
        headerName: "Data de Criação",
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
      {
        field: "updated_at",
        headerClassName: "colum--header",
        headerName: "Última Atualização",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row: { updated_at } }) => {
          if (!updated_at) return "";
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
                {dateFormatter(updated_at)}
              </Typography>
            </Box>
          );
        },
      },
    ];
  },
  supress_concluir: true,
};

// Propriedades compartilhadas entre cadastrar e alterar
export const shared_cadastra_alterar_props = {
  fields: (entities, handleBlur, handleChange, values, touched, errors) => (
    <>
      <PerformantTextField
        fullWidth
        variant="filled"
        type="text"
        label="Serviço"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.nome}
        name="nome"
        error={!!touched.nome && !!errors.nome}
        helperText={touched.nome && errors.nome}
        sx={{ gridColumn: "span 4" }}
      />
    </>
  ),
  checkout_schema_model: (entities) =>
    yup.object().shape({
      nome: yup.string().required("Obrigatorio!"),
    }),
  submit_body: (values) => ({
    nome: values.nome,
  }),
};

// Cadastrar Props
export const cadastrarProps = {
  ...shared_props,
  ...shared_cadastra_alterar_props,
  initialValues: {
    nome: "",
  },
  subtitle: "Adicione um Novo Serviço",
};

// Alterar Props
export const alterarProps = {
  ...shared_props,
  ...shared_cadastra_alterar_props,
  subtitle: "Altere um Serviço",
  entities_array: {
    servico: [],
  },
  result_body: (result) => ({
    nome: result.data.nome,
  }),
};

export default {
  cadastrarProps,
  indexProps,
  alterarProps,
};
