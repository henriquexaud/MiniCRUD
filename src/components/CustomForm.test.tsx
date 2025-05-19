// src/components/CustomForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CustomForm } from "./CustomForm";

describe("CustomForm (unit)", () => {
  const initialValues = {
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
  };

  it("should call onFormStatusChange whenever dirty or isValid changes", async () => {
    const statusChanges: Array<{ dirty: boolean; isValid: boolean }> = [];
    const onFormStatusChange = (status: {
      dirty: boolean;
      isValid: boolean;
    }) => {
      statusChanges.push(status);
    };

    render(
      <CustomForm
        initialValues={initialValues}
        onSubmit={jest.fn()}
        onFormStatusChange={onFormStatusChange}
      />
    );

    // initial call: dirty=false, isValid=true
    await waitFor(() => {
      expect(statusChanges[0]).toEqual({ dirty: false, isValid: true });
    });

    // change one field -> dirty: true, isValid: false
    fireEvent.change(screen.getByPlaceholderText(/Nome completo/i), {
      target: { value: "Pedro" },
    });
    await waitFor(() => {
      expect(
        statusChanges.some((s) => s.dirty === true && s.isValid === false)
      ).toBe(true);
    });

    // fill all valid fields -> dirty: true, isValid: true
    fireEvent.change(screen.getByPlaceholderText(/^CPF$/i), {
      target: { value: "12345678901" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Telefone/i), {
      target: { value: "21988887777" },
    });
    fireEvent.change(screen.getByPlaceholderText(/E-mail/i), {
      target: { value: "p@p.com" },
    });

    await waitFor(() => {
      expect(
        statusChanges.some((s) => s.dirty === true && s.isValid === true)
      ).toBe(true);
    });
  });
});
