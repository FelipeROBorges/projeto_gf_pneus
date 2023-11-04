import { toast } from "react-toastify";
import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import * as React from "react";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from ".././Header";
import { useParams } from "react-router-dom";

const Alterar = ({
  entities_array,
  result_body,
  entity_name,
  submit_body,
  checkout_schema_model,
  title,
  subtitle,
  fields,
}) => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [initialValues, setinitialValues] = React.useState(null);
  const [entities, setEntities] = React.useState(
    entities_array ? entities_array : null
  );
  const token = JSON.parse(localStorage.getItem("user_token")).token;
  const headers = {
    Authorization: token,
  };

  React.useEffect(() => {
    loadEntities();
  }, [entity_name]);

  const loadEntities = async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/${entity_name}/${id}`,
      {
        headers,
      }
    );
    const initial_values = result_body(result);
    setinitialValues(initial_values);
    if (entities_array) {
      const updatedEntities = { ...entities };
      for (const entity of Object.keys(entities_array)) {
        updatedEntities[entity] = result.data[entity];
      }
      setEntities(updatedEntities);
    }
  };

  const checkoutSchema = checkout_schema_model(entities);

  const handleFormSubmit = async (values) => {
    const result = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/${entity_name}/${id}`,
      submit_body(values),
      {
        headers,
      }
    );
    if (result.data.error) {
      toast.error(result.data.error);
    } else {
      toast.success(result.data.ok);
      if (entities_array) {
        loadEntities();
      }
    }
  };

  if (initialValues === null) {
    return null;
  }

  return (
    <Box borderRadius="20px" p="30px">
      <Header title={`Alteração de ${title}`} subtitle={subtitle} />

      <Formik
        enableReinitialize
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
                {`Alterar ${title}`}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Alterar;
