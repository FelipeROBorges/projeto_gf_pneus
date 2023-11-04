import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import * as React from "react";
import { Field, FastField } from "formik";
import * as yup from "yup";

// Propriedades compartilhadas
export const shared_props = {
  entity_name: "acesso",
  title: "Acesso",
  module: "adm",
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
        options={entities.perfis}
        disableClearable
        closeText="Fechar"
        openText="Abrir"
        noOptionsText="Sem opções!"
        getOptionLabel={(option) => option.descricao}
        sx={{ gridColumn: "span 2" }}
        value={
          entities.perfis.find((perfil) => perfil.id === values.perfil) || null
        }
        onChange={(e, value) => {
          if (value) {
            setFieldValue("perfil", value.id);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Perfil"
            value={values.perfil}
            onBlur={handleBlur}
            onChange={handleChange}
            name="perfil"
            error={!!touched.perfil && !!errors.perfil}
            helperText={touched.perfil && errors.perfil}
          />
        )}
      />
      <Autocomplete
        fullWidth
        options={entities.modulos}
        disableClearable
        closeText="Fechar"
        openText="Abrir"
        noOptionsText="Sem opções!"
        getOptionLabel={(option) => option.nome}
        sx={{ gridColumn: "span 2" }}
        value={
          entities.modulos.find((modulo) => modulo.id === values.modulo) || null
        }
        onChange={(e, value) => {
          if (value) {
            setFieldValue("modulo", value.id);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Modulo"
            value={values.modulo}
            onBlur={handleBlur}
            onChange={handleChange}
            name="modulo"
            error={!!touched.modulo && !!errors.modulo}
            helperText={touched.modulo && errors.modulo}
          />
        )}
      />
      <FastField name="visualizar">
        {({ field, meta }) => (
          <Field
            {...field}
            fullWidth
            name="visualizar"
            label="Visualizar"
            as={TextField}
            variant="filled"
            select
            onBlur={handleBlur}
            value={field.value}
            error={!!meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            sx={{ gridColumn: "span 1" }}
          >
            <MenuItem value={true}>Sim</MenuItem>
            <MenuItem value={false}>Não</MenuItem>
          </Field>
        )}
      </FastField>
      <FastField name="cadastrar">
        {({ field, meta }) => (
          <Field
            {...field}
            fullWidth
            name="cadastrar"
            label="Cadastrar"
            as={TextField}
            variant="filled"
            select
            onBlur={handleBlur}
            value={field.value}
            error={!!meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            sx={{ gridColumn: "span 1" }}
          >
            <MenuItem value={true}>Sim</MenuItem>
            <MenuItem value={false}>Não</MenuItem>
          </Field>
        )}
      </FastField>
      <FastField name="alterar">
        {({ field, meta }) => (
          <Field
            {...field}
            fullWidth
            name="alterar"
            label="Alterar"
            as={TextField}
            variant="filled"
            select
            onBlur={handleBlur}
            value={field.value}
            error={!!meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            sx={{ gridColumn: "span 1" }}
          >
            <MenuItem value={true}>Sim</MenuItem>
            <MenuItem value={false}>Não</MenuItem>
          </Field>
        )}
      </FastField>
      <FastField name="deletar">
        {({ field, meta }) => (
          <Field
            {...field}
            fullWidth
            name="deletar"
            label="Deletar"
            as={TextField}
            variant="filled"
            select
            onBlur={handleBlur}
            value={field.value}
            error={!!meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            sx={{ gridColumn: "span 1" }}
          >
            <MenuItem value={true}>Sim</MenuItem>
            <MenuItem value={false}>Não</MenuItem>
          </Field>
        )}
      </FastField>
    </>
  ),
  checkout_schema_model: (entities) =>
    yup.object().shape({
      modulo: yup
        .number()
        .oneOf(entities.modulos.map((item) => item.id))
        .required("Selecione um modulo!"),
      perfil: yup
        .number()
        .oneOf(entities.perfis.map((item) => item.id))
        .required("Selecione um perfil!"),
      deletar: yup.boolean().required("Obrigatório!"),
      alterar: yup.boolean().required("Obrigatório!"),
      visualizar: yup.boolean().required("Obrigatório!"),
      cadastrar: yup.boolean().required("Obrigatório!"),
    }),

  submit_body: (values) => ({
    alterar: values.alterar,
    cadastrar: values.cadastrar,
    deletar: values.deletar,
    visualizar: values.visualizar,
    modulo: { id: values.modulo },
    perfil: { id: values.perfil },
  }),
  entities_array: {
    perfis: [],
    modulos: [],
  },
};

// Propriedades Index
export const indexProps = {
  ...shared_props,
  columns: (dateFormatter, colors) => {
    return [
      { field: "id", headerName: "ID", headerClassName: "colum--header" },
      {
        field: "perfil",
        headerClassName: "colum--header",
        headerName: "Perfil",
        flex: 1,
      },
      {
        field: "modulo",
        headerClassName: "colum--header",
        headerName: "Modulo",
        flex: 1,
      },
      {
        field: "visualizar",
        headerClassName: "colum--header",
        headerName: "Visualização",
      },
      {
        field: "cadastrar",
        headerClassName: "colum--header",
        headerName: "Cadastro",
      },
      {
        field: "alterar",
        headerClassName: "colum--header",
        headerName: "Alteração",
      },
      {
        field: "deletar",
        headerClassName: "colum--header",
        headerName: "Deleção",
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
  child_entities_api: "/acesso/perfis_modulos",
  initialValues: {
    alterar: false,
    cadastrar: false,
    deletar: false,
    visualizar: true,
    modulo: "",
    perfil: "",
  },
  subtitle: "Adicione um Novo Acesso",
};

// Alterar Props
export const alterarProps = {
  ...shared_props,
  ...shared_cadastra_alterard_props,
  subtitle: "Altere um Acesso",

  result_body: (result) => ({
    alterar: result.data.acesso.alterar,
    cadastrar: result.data.acesso.cadastrar,
    deletar: result.data.acesso.deletar,
    visualizar: result.data.acesso.visualizar,
    modulo: result.data.acesso.modulo.id,
    perfil: result.data.acesso.perfil.id,
  }),
};

export default {
  cadastrarProps,
  indexProps,
  alterarProps,
};
