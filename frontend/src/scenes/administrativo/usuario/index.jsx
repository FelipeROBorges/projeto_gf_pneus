import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import PerformantTextField from "../../../components/PerformantTextField";
import { Field, FastField } from "formik";
import * as React from "react";
import * as yup from "yup";

// Propriedades compartilhadas
export const sharedProps = {
  entity_name: "usuario",
  title: "Usuário",
  module: "adm",
};

// Propriedades Index
export const indexProps = {
  ...sharedProps,
  columns: (dateFormatter, colors) => {
    return [
      {
        field: "id",
        headerClassName: "colum--header",
        headerName: "ID",
      },
      {
        field: "nome",
        headerClassName: "colum--header",
        headerName: "Nome",
        flex: 1,
      },
      {
        field: "email",
        headerClassName: "colum--header",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "perfil",
        headerClassName: "colum--header",
        headerName: "Perfil",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row: { perfil } }) => {
          if (!perfil) return "";
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
                {perfil.descricao}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "status",
        headerClassName: "colum--header",
        headerName: "Status",
        renderCell: ({ row: { status } }) => {
          return status ? "Ativo" : "Inativo";
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
  supress_delete: true,
};

// Cadastrar Props
export const cadastrarProps = {
  ...sharedProps,
  entities_array: {
    perfis: [],
  },
  child_entities_api: "/perfil",
  checkout_schema_model: (entities) =>
    yup.object().shape({
      senha: yup
        .string()
        .required("Obrigatorio!")
        .min(12, "Senha deve ter pelo menos 12 dígitos!")
        .max(18, "Senha não pode conter mais que 18 dígitos!")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&^#()[\]{}\\|<>~`"_;:,./\\+=-]+$/,
          "Senha deve conter ao menos uma letra maiuscula, uma minuscula, um caractere especial e uma numero!"
        ),
      confirmar_senha: yup
        .string()
        .oneOf([yup.ref("senha"), null], "As senhas devem ser iguais!")
        .required("Obrigatorio!"),
      perfil: yup
        .number()
        .oneOf(entities.perfis.map((item) => item.id))
        .required("Obrigatorio!"),
      email: yup.string().email("Email invalido!").required("Obrigatório!"),
      nome: yup.string().required("Obrigatório!"),
    }),
  submit_body: (values) => ({
    perfil: { id: values.perfil },
    nome: values.nome,
    email: values.email,
    senha: values.senha,
  }),
  initialValues: {
    perfil: "",
    senha: "",
    nome: "",
    email: "",
    confirmar_senha: "",
  },
  subtitle: "Adicione um Novo Usuário",
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
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name="email"
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email}
        sx={{ gridColumn: "span 4" }}
      />
      <PerformantTextField
        fullWidth
        variant="filled"
        type="password"
        label="Senha"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.senha}
        name="senha"
        error={!!touched.senha && !!errors.senha}
        helperText={touched.senha && errors.senha}
        sx={{ gridColumn: "span 4" }}
      />
      <PerformantTextField
        fullWidth
        variant="filled"
        type="password"
        label="Confirmar Senha"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.confirmar_senha}
        name="confirmar_senha"
        error={!!touched.confirmar_senha && !!errors.confirmar_senha}
        helperText={touched.confirmar_senha && errors.confirmar_senha}
        sx={{ gridColumn: "span 4" }}
      />
    </>
  ),
};

// Alterar Props
export const alterarProps = {
  ...sharedProps,
  subtitle: "Altere um Usuário",
  entities_array: {
    perfis: [],
  },
  checkout_schema_model: (entities) =>
    yup.object().shape({
      perfil: yup
        .number()
        .oneOf(entities.perfis.map((item) => item.id))
        .required("Obrigatorio!"),
      status: yup.boolean().required("Obrigatorio!"),
    }),
  result_body: (result) => ({
    perfil: result.data.usuario.perfil.id,
    status: result.data.usuario.status,
  }),
  submit_body: (values) => ({
    perfil: { id: values.perfil },
    status: values.status,
  }),
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
          entities.perfis.find((pefil) => pefil.id === values.perfil) || null
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
            value={values.pefil}
            onBlur={handleBlur}
            onChange={handleChange}
            name="perfil"
            error={!!touched.perfil && !!errors.perfil}
            helperText={touched.perfil && errors.perfil}
          />
        )}
      />
      <FastField name="status">
        {({ field, meta }) => (
          <Field
            {...field}
            fullWidth
            name="status"
            label="Status"
            as={TextField}
            variant="filled"
            select
            onBlur={handleBlur}
            value={field.value}
            error={!!meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            sx={{ gridColumn: "span 2" }}
          >
            <MenuItem value={true}>Ativo(a)</MenuItem>
            <MenuItem value={false}>Inativo(a)</MenuItem>
          </Field>
        )}
      </FastField>
    </>
  ),
};

export default {
  cadastrarProps,
  indexProps,
  alterarProps,
};
