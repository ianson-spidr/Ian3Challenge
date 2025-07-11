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

interface CostFieldProps {
  register: ReturnType<typeof useForm<FormData>>["register"];
  errors: ReturnType<typeof useForm<FormData>>["formState"]["errors"];
  control: ReturnType<typeof useForm<FormData>>["control"];
}

const formatAirFryerCost = (value: string) => {
  // Remove everything except digits and decimal point
  let cleanValue = value.replace(/[^\d.]/g, "");

  // Handle multiple decimal points - keep only the first one
  const decimalIndex = cleanValue.indexOf(".");
  if (decimalIndex !== -1) {
    cleanValue = cleanValue.slice(0, decimalIndex + 1) +
      cleanValue.slice(decimalIndex + 1).replace(/\./g, "");
  }

  // Limit to 2 decimal places
  if (decimalIndex !== -1) {
    const beforeDecimal = cleanValue.slice(0, decimalIndex);
    const afterDecimal = cleanValue.slice(decimalIndex + 1, decimalIndex + 3);
    cleanValue = beforeDecimal + "." + afterDecimal;
  }

  // Format with commas and dollar sign
  if (cleanValue === "" || cleanValue === ".") {
    return "";
  }

  const parts = cleanValue.split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const decimalPart = parts[1] !== undefined ? "." + parts[1] : "";

  return "$" + integerPart + decimalPart;
};

const CostField: React.FC<CostFieldProps> = ({
  register,
  errors,
  control,
}) => {
  return (
    <FormTextInput
      label="Guess the Air Fryer's Cost"
      name="airFryerCost"
      placeholder="$0.00"
      register={register}
      errors={errors}
      control={control}
      formatValue={formatAirFryerCost}
      validation={{ required: "Air fryer cost is required" }}
    />
  );
};

export default CostField;
