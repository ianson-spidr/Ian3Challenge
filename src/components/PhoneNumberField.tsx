import { useForm } from "react-hook-form";
import FormTextInput from "./FormTextInput";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  airFryerCost: string;
  spidrPin: string;
}

interface PhoneNumberFieldProps {
  register: ReturnType<typeof useForm<FormData>>["register"];
  errors: ReturnType<typeof useForm<FormData>>["formState"]["errors"];
  control: ReturnType<typeof useForm<FormData>>["control"];
}

const formatPhoneNumber = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");
  const limitedDigits = digitsOnly.slice(0, 10);

  if (limitedDigits.length == 0) {
    return "";
  } else if (limitedDigits.length <= 3) {
    return `(${limitedDigits}`;
  } else if (limitedDigits.length <= 6) {
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
  } else {
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${
      limitedDigits.slice(6)
    }`;
  }
};

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
  register,
  errors,
  control,
}) => {
  return (
    <FormTextInput
      label="Phone Number"
      name="phoneNumber"
      type="tel"
      placeholder="(xxx) xxx-xxxx"
      register={register}
      errors={errors}
      control={control}
      formatValue={formatPhoneNumber}
      validation={{
        required: "Phone number is required",
        validate: (value: string) => {
          const digitsOnly = value.replace(/\D/g, "");
          return digitsOnly.length === 10 ||
            "Phone number must be exactly 10 digits";
        },
      }}
    />
  );
};

export default PhoneNumberField;
