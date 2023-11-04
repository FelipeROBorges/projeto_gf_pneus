import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import MaskedInput from "react-text-mask";

const MaskedInputField = forwardRef(
  ({ mask, mask_length, onChange, ...props }, ref) => {
    const [maskedValue, setMaskedValue] = useState(props.value || "");
    const maskedInputRef = useRef(null);

    useEffect(() => {
      setMaskedValue(props.value);
    }, [props.value]);

    const handleInputChange = (event) => {
      const value = event.target.value;
      const valueWithoutMask = value.replace(/\D/g, "");
      setMaskedValue(valueWithoutMask);
      if (valueWithoutMask.length == mask_length) {
        onChange(valueWithoutMask);
      }
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        setTimeout(() => {
          if (maskedInputRef.current) {
            maskedInputRef.current.inputElement.focus();
          }
        }, 0);
      },
    }));

    return (
      <MaskedInput
        {...props}
        ref={maskedInputRef}
        mask={mask}
        onBlur={() => onChange(maskedValue)}
        placeholderChar={"\u2000"}
        showMask
        value={maskedValue}
        onChange={handleInputChange}
        guide={false}
      />
    );
  }
);

export default MaskedInputField;
