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

interface SpidrPinFieldProps {
  register: ReturnType<typeof useForm<FormData>>["register"];
  errors: ReturnType<typeof useForm<FormData>>["formState"]["errors"];
  control: ReturnType<typeof useForm<FormData>>["control"];
}

const formatSpidrPin = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");
  const limitedDigits = digitsOnly.slice(0, 16);
  return limitedDigits.replace(/(\d{4})(?=\d)/g, "$1-");
};

const SpidrPinField: React.FC<SpidrPinFieldProps> = ({
  register,
  errors,
  control,
}) => {
  return (
    <FormTextInput
      label="Very, Very Secret 16-digit Spidr PIN"
      name="spidrPin"
      placeholder="####-####-####-####"
      maxLength={19}
      register={register}
      errors={errors}
      control={control}
      formatValue={formatSpidrPin}
      showToggle={true}
      validation={{
        required: "Spidr PIN is required",
        validate: (value: string) => {
          const digitsOnly = value.replace(/\D/g, "");
          return digitsOnly.length === 16 ||
            "PIN must be exactly 16 digits";
        },
      }}
    />
  );
};

export default SpidrPinField;
