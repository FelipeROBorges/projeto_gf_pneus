import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import * as React from "react";
import { Field, FastField } from "formik";
import PerformantTextField from "../../../components/PerformantTextField";

import * as yup from "yup";

// Propriedades compartilhadas
export const shared_props = {
  entity_name: "ordem_servico",
  title: "Ordem de Serviço",
  module: "gfp",
};

export const shared_cadastra_alterard_props = {
  fields: (
    entities,
    handleBlur,
    handleChange,
    values,
    touched,
    errors,
    setFieldValue
  ) => (
    <>
      <Autocomplete
        fullWidth
        options={entities.servicos}
        disableClearable
        closeText="Fechar"
        openText="Abrir"
        noOptionsText="Sem opções!"
        getOptionLabel={(option) => option.nome}
        sx={{ gridColumn: "span 2" }}
        value={
          entities.servicos.find((servico) => servico.id === values.servico) ||
          null
        }
        onChange={(e, value) => {
          if (value) {
            setFieldValue("servico", value.id);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Serviço"
            value={values.servico}
            onBlur={handleBlur}
            onChange={handleChange}
            name="servico"
            error={!!touched.servico && !!errors.servico}
            helperText={touched.servico && errors.servico}
          />
        )}
      />
      <FastField name="status">
        {({ field }) => (
          <Field
            {...field}
            fullWidth
            select
            name="status"
            label="Status"
            as={TextField}
            variant="filled"
            onBlur={handleBlur}
            value={values.status}
            onChange={handleChange}
            error={!!touched.status && !!errors.status}
            helperText={touched.status && errors.status}
            sx={{ gridColumn: "span 1" }}
          >
            <MenuItem value={false}>Em Andamento</MenuItem>
            <MenuItem value={true}>Concluído</MenuItem>
          </Field>
        )}
      </FastField>
      <PerformantTextField
        fullWidth
        variant="filled"
        type="text"
        label="Placa"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.placa}
        name="placa"
        error={!!touched.placa && !!errors.placa}
        helperText={touched.placa && errors.placa}
        sx={{ gridColumn: "span 1" }}
      />
      <PerformantTextField
        fullWidth
        variant="filled"
        type="text"
        label="Modelo"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.modelo}
        name="modelo"
        error={!!touched.modelo && !!errors.modelo}
        helperText={touched.modelo && errors.modelo}
        sx={{ gridColumn: "span 4" }}
      />
    </>
  ),
  checkout_schema_model: (entities) =>
    yup.object().shape({
      status: yup.string().required("Obrigatório!"),
      modelo: yup
        .string()
        .max(50, "Modelo não pode conter mais que 20 caracteres!")
        .required("Obrigatório!"),
      placa: yup.string().required("Obrigatório!"),
      servico: yup
        .number()
        .oneOf(entities.servicos.map((item) => item.id))
        .required("Selecione um Serviço!"),
    }),
  submit_body: (values) => ({
    status: values.status,
    placa: values.placa,
    modelo: values.modelo,
    servico: { id: values.servico },
  }),
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
  supress_concluir: true,
};

// Cadastrar Props
export const cadastrarProps = {
  ...shared_props,
  ...shared_cadastra_alterard_props,
  entities_array: {
    servicos: [],
  },
  child_entities_api: "/servico",
  initialValues: {
    servico: "",
    status: "",
    modelo: "",
    placa: "",
  },
  subtitle: "Adicione uma Nova Ordem de Serviço",
  reset_form: true,
};

// Alterar Props
export const alterarProps = {
  ...shared_props,
  ...shared_cadastra_alterard_props,
  subtitle: "Altere uma Ordem de Serviço",
  entities_array: {
    servicos: [],
  },
  result_body: (result) => ({
    status: result.data.ordem_servico.status,
    modelo: result.data.ordem_servico.modelo,
    placa: result.data.ordem_servico.placa,
    servico: result.data.ordem_servico.servico.id,
  }),
};

export default {
  cadastrarProps,
  indexProps,
  alterarProps,
};
