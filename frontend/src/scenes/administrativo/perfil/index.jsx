import { Box, Typography } from "@mui/material";
import * as React from "react";
import * as yup from "yup";
import PerformantTextField from "../../../components/PerformantTextField";

// Propriedades compartilhadas
export const shared_props = {
  entity_name: "perfil",
  title: "Perfil",
  module: "adm",
};

export const shared_cadastra_alterard_props = {
  fields: (handleBlur, handleChange, values, touched, errors) => (
    <>
      <PerformantTextField
        fullWidth
        variant="filled"
        type="text"
        label="Nome"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.nome}
        name="nome"
        error={!!touched.nome && !!errors.nome}
        helperText={touched.nome && errors.nome}
        sx={{ gridColumn: "span 2" }}
      />
      <PerformantTextField
        fullWidth
        variant="filled"
        type="text"
        label="Descrição"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.descricao}
        name="descricao"
        error={!!touched.descricao && !!errors.descricao}
        helperText={touched.descricao && errors.descricao}
        sx={{ gridColumn: "span 2" }}
      />
    </>
  ),

  checkout_schema_model: () =>
    yup.object().shape({
      nome: yup.string().required("Obrigatorio!"),
      descricao: yup.string().required("Obrigatorio!"),
    }),

  submit_body: (values) => ({
    nome: values.nome,
    descricao: values.descricao,
  }),
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
        headerName: "Perfil",
        flex: 1,
      },
      {
        field: "descricao",
        headerClassName: "colum--header",
        headerName: "Descrição",
        flex: 1,
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
};

// Cadastrar Props
export const cadastrarProps = {
  ...shared_props,
  ...shared_cadastra_alterard_props,
  entities_array: null,
  child_entities_api: null,
  initialValues: {
    nome: "",
    descricao: "",
  },
  subtitle: "Adicione um Novo Perfil",
};

// Alterar Props
export const alterarProps = {
  ...shared_props,
  ...shared_cadastra_alterard_props,
  subtitle: "Altere um Perfil",
  entities_array: null,
  result_body: (result) => ({
    nome: result.data.nome,
    descricao: result.data.descricao,
  }),
};

export default {
  cadastrarProps,
  indexProps,
  alterarProps,
};
