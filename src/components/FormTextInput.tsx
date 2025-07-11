import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  airFryerCost: string;
  spidrPin: string;
}

interface FormTextInputProps {
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  register: ReturnType<typeof useForm<FormData>>["register"];
  errors: ReturnType<typeof useForm<FormData>>["formState"]["errors"];
  control?: ReturnType<typeof useForm<FormData>>["control"];
  formatValue?: (value: string) => string;
  validation?: object;
  showToggle?: boolean;
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  maxLength,
  register,
  errors,
  control,
  formatValue,
  validation,
  showToggle = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const calculateNewCursorPosition = (
    oldValue: string,
    newValue: string,
    oldCursor: number,
  ) => {
    // For simple cases, try to maintain relative position
    const oldLength = oldValue.length;
    const newLength = newValue.length;
    const lengthDiff = newLength - oldLength;

    // If cursor was at the end, keep it at the end
    if (oldCursor >= oldLength) {
      return newLength;
    }

    // Otherwise, adjust cursor position based on length change
    const newCursor = oldCursor + lengthDiff;

    // Ensure cursor is within bounds
    return Math.max(0, Math.min(newCursor, newLength));
  };

  const handleFormattedChange = (
    rawValue: string,
    onChange: (value: string) => void,
  ) => {
    const input = inputRef.current;
    if (!input || !formatValue) {
      onChange(rawValue);
      return;
    }

    // Store cursor position before formatting
    const cursorPosition = input.selectionStart || 0;
    const oldValue = input.value;

    // Apply formatting
    const formattedValue = formatValue(rawValue);

    // Update the value
    onChange(formattedValue);

    // Calculate and restore cursor position after the DOM updates
    setTimeout(() => {
      const newCursorPosition = calculateNewCursorPosition(
        oldValue,
        formattedValue,
        cursorPosition,
      );
      if (input === document.activeElement) {
        input.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = inputRef.current;
    if (!input || !formatValue) return;

    // Handle backspace over non-digit characters
    if (e.key === "Backspace" && input.selectionStart === input.selectionEnd) {
      const cursorPosition = input.selectionStart || 0;
      const currentValue = input.value;

      if (cursorPosition > 0) {
        const charToDelete = currentValue[cursorPosition - 1];

        // If the character to delete is not a digit, just move cursor back
        if (!/\d/.test(charToDelete)) {
          e.preventDefault();
          input.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
          return;
        }
      }
    }
  };

  const inputBaseStyle = {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    transition: "border-color 0.2s ease",
    backgroundColor: "#333",
    color: "#ffffff",
  };

  const labelStyle = {
    color: "#fff",
    fontSize: "0.95rem",
  };

  const getBorderColor = () => {
    if (errors[name]) return "#ef4444";
    if (isFocused) return "#56acbd";
    return "#ffffff";
  };

  const inputType = showToggle ? (isVisible ? "text" : "password") : type;

  const baseInputProps = {
    id: name,
    type: inputType,
    placeholder,
    maxLength,
    className: "form-input",
    style: {
      ...inputBaseStyle,
      border: `1px solid ${getBorderColor()}`,
      paddingRight: showToggle ? "3.5rem" : "0.75rem",
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    onKeyDown: formatValue ? handleKeyDown : undefined,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <style>
        {`
          .form-input::placeholder {
            color: #969696;
          }
        `}
      </style>
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>

      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        {control && formatValue
          ? (
            <Controller
              name={name}
              control={control}
              rules={validation}
              render={({ field: { onChange, value, onBlur } }) => (
                <input
                  {...baseInputProps}
                  ref={inputRef}
                  value={value}
                  onChange={(e) =>
                    handleFormattedChange(e.target.value, onChange)}
                  onBlur={() => {
                    onBlur();
                    setIsFocused(false);
                  }}
                />
              )}
            />
          )
          : (
            <input
              {...baseInputProps}
              {...register(name, validation)}
              onBlur={(e) => {
                setIsFocused(false);
                register(name, validation).onBlur(e);
              }}
            />
          )}

        {showToggle && (
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            style={{
              position: "absolute",
              right: "0.75rem",
              background: "transparent",
              border: "none",
              color: "#969696",
              cursor: "pointer",
              fontSize: "0.875rem",
              padding: "0.25rem",
            }}
          >
            {isVisible ? "Hide" : "Show"}
          </button>
        )}
      </div>

      <div style={{ height: "1.25rem", display: "flex", alignItems: "center" }}>
        {errors[name] && isFocused && (
          <span style={{ color: "#ef4444", fontSize: "0.875rem" }}>
            {errors[name].message}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormTextInput;
