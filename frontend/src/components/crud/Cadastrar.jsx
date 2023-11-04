import { toast } from "react-toastify";
import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import * as React from "react";
import axios from "axios";

import useMediaQuery from "@mui/material/useMediaQuery";
import Header from ".././Header";

const Cadastrar = ({
  entities_array,
  child_entities_api,
  entity_name,
  submit_body,
  checkout_schema_model,
  initialValues,
  title,
  subtitle,
  fields,
  reset_form,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [entities, setEntities] = React.useState(
    entities_array ? entities_array : null
  );
  const token = JSON.parse(localStorage.getItem("user_token")).token;
  const headers = {
    Authorization: token,
  };

  const loadEntities = async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}${child_entities_api}`,
      {
        headers,
      }
    );

    const updatedEntities = { ...entities };
    const keys = Object.keys(entities_array);

    if (keys.length > 1) {
      for (const entity of keys) {
        updatedEntities[entity] = result.data[entity];
      }
    } else {
      updatedEntities[keys[0]] = result.data;
    }

    setEntities(updatedEntities);
  };

  if (entities_array) {
    React.useEffect(() => {
      loadEntities();
    }, [entity_name]);
  }

  const checkoutSchema = checkout_schema_model(entities);

  const handleFormSubmit = async (values, { resetForm }) => {
    const result = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/${entity_name}`,
      submit_body(values),
      {
        headers,
      }
    );
    if (result.data.error) {
      toast.error(result.data.error);
    } else {
      toast.success(result.data.ok);
      if (!reset_form) resetForm();
      if (entities_array) {
        loadEntities();
      }
    }
  };

  return (
    <Box borderRadius="20px" p="30px">
      <Header title={`Cadastro de ${title}`} subtitle={subtitle} />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {entities
                ? fields(
                    entities,
                    handleBlur,
                    handleChange,
                    values,
                    touched,
                    errors,
                    setFieldValue
                  )
                : fields(
                    handleBlur,
                    handleChange,
                    values,
                    touched,
                    errors,
                    setFieldValue
                  )}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {`Adicionar ${title}`}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Cadastrar;
