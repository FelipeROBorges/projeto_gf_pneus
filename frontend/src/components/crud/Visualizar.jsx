import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { Formik } from "formik";
import * as React from "react";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from ".././Header";
import { useParams } from "react-router-dom";

const Visualizar = ({
  result_body,
  entity_name,
  entities_array,
  checkout_schema_model,
  title,
  subtitle,
  fields,
}) => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [initialValues, setinitialValues] = React.useState(null);
  const token = JSON.parse(localStorage.getItem("user_token")).token;
  const [entities, setEntities] = React.useState(
    entities_array ? entities_array : null
  );
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
    if (result.data.error) {
      toast.error(result.data.error);
    } else {
      const initial_values = result_body(result);
      setinitialValues(initial_values);
      if (entities_array) {
        const updatedEntities = { ...entities };
        for (const entity of Object.keys(entities_array)) {
          updatedEntities[entity] = result.data[entity];
        }
        setEntities(updatedEntities);
      }
    }
  };

  const checkoutSchema = checkout_schema_model
    ? checkout_schema_model(entities)
    : null;

  if (initialValues === null) {
    return null;
  }

  return (
    <Box borderRadius="20px" p="30px">
      <Header title={`Visualização de ${title}`} subtitle={subtitle} />

      <Formik
        enableReinitialize
        onSubmit={() => null}
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
                    setFieldValue,
                    true
                  )
                : fields(
                    handleBlur,
                    handleChange,
                    values,
                    touched,
                    errors,
                    setFieldValue,
                    true
                  )}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Visualizar;
