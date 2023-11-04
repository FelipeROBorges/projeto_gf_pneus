import { TextField } from "@mui/material";
import { useField } from "formik";
import React, { memo, useEffect, useState } from "react";
import { usePropagateRef } from "./usePropagateRef";

const PerformantTextField = (props) => {
  const [field, meta] = useField(props.name);
  const error = props.error;
  const helperText = props.helperText;

  const [fieldValue, setFieldValue] = useState(
    props.type === "number" ? Number(field.value) : field.value
  );

  usePropagateRef({
    setFieldValue,
    name: props.name,
    value: field.value,
  });

  useEffect(() => {
    if (meta.touched) {
      return;
    }
    if (field.value !== fieldValue) {
      setFieldValue(
        props.type === "number" ? Number(field.value) : field.value
      );
    }
  }, [field.value]);

  const onChange = (evt) => {
    setFieldValue(
      props.type === "number" ? Number(evt.target.value) : evt.target.value
    );
  };

  const onBlur = (evt) => {
    const val = evt.target.value || "";
    setTimeout(() => {
      field.onChange({
        target: {
          name: props.name,
          value: props.type === "number" ? parseInt(val, 10) : val,
        },
      });
    }, 0);
  };

  const performanceProps = props.disablePerformance
    ? {
        ...field,
        value: props.loading ? "Loading..." : fieldValue,
      }
    : {
        ...field,
        value: props.loading ? "Loading..." : fieldValue,
        onChange,
        onBlur,
        onFocus: onBlur,
      };

  return !props.disableinteraction ? (
    <>
      <TextField
        {...props}
        InputProps={{
          readOnly: props.readOnly,
          ...(props.type === "number" && {
            inputProps: {
              min: props.min,
              max: props.max,
            },
          }),
        }}
        error={error}
        helperText={helperText}
        {...performanceProps}
      />
    </>
  ) : (
    <>
      <TextField
        {...props}
        InputProps={{
          readOnly: props.readOnly,
          ...(props.type === "number" && {
            inputProps: {
              min: props.min,
              max: props.max,
            },
          }),
        }}
        error={error}
        helperText={helperText}
      />
    </>
  );
};

export default memo(PerformantTextField);
