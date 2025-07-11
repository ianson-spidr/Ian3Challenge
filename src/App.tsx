import { useForm } from "react-hook-form";
import FormTextInput from "./components/FormTextInput";
import PhoneNumberField from "./components/PhoneNumberField";
import CostField from "./components/CostField";
import SpidrPinField from "./components/SpidrPinField";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  airFryerCost: string;
  spidrPin: string;
}

function App() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      airFryerCost: "",
      spidrPin: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "Raleway",
      }}
    >
      <div
        style={{
          background: "#333",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#56acbd",
          }}
        >
          Contact Us!
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <FormTextInput
            label="First Name"
            name="firstName"
            register={register}
            errors={errors}
            validation={{ required: "First name is required" }}
          />

          <FormTextInput
            label="Last Name"
            name="lastName"
            register={register}
            errors={errors}
            validation={{ required: "Last name is required" }}
          />

          <PhoneNumberField
            register={register}
            errors={errors}
            control={control}
          />

          <FormTextInput
            label="Email Address"
            name="email"
            type="email"
            register={register}
            errors={errors}
            validation={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />

          <CostField
            register={register}
            errors={errors}
            control={control}
          />

          <SpidrPinField
            register={register}
            errors={errors}
            control={control}
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#56acbd",
                color: "white",
                border: "none",
                width: "auto",
                padding: "0.875rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s ease, transform 0.1s ease",
                marginTop: "1rem",
              }}
              onMouseOver={(
                e,
              ) => (e.currentTarget.style.backgroundColor = "#3e8a99")}
              onMouseOut={(
                e,
              ) => (e.currentTarget.style.backgroundColor = "#56acbd")}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
