import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
  type FormikHelpers,
} from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface CustomFormProps {
  initialValues: {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
  };
  onSubmit: (
    values: { nome: string; cpf: string; telefone: string; email: string },
    formikHelpers: FormikHelpers<{
      nome: string;
      cpf: string;
      telefone: string;
      email: string;
    }>
  ) => void | Promise<void>;
  submitLabel?: string;
  isModal?: boolean;
  onFormStatusChange?: (status: { dirty: boolean; isValid: boolean }) => void;
}

export const CustomForm = ({
  initialValues,
  onSubmit,
  submitLabel = "Cadastrar",
  isModal = false,
  onFormStatusChange,
}: CustomFormProps) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .required("Nome é obrigatório")
      .min(3, "Nome deve ter pelo menos 3 caracteres"),
    cpf: Yup.string()
      .required("CPF é obrigatório")
      .matches(/^\d{11}$/, "CPF deve conter exatamente 11 números"),
    telefone: Yup.string()
      .required("Telefone é obrigatório")
      .matches(/^\d{10,11}$/, "Telefone deve conter 10 ou 11 dígitos"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  });

  // Notifica ao pai mudanças de dirty/isValid
  function FormStatusNotifier({
    onFormStatusChange,
  }: {
    onFormStatusChange?: (status: { dirty: boolean; isValid: boolean }) => void;
  }) {
    const { dirty, isValid } = useFormikContext<{
      nome: string;
      cpf: string;
      telefone: string;
      email: string;
    }>();
    useEffect(() => {
      onFormStatusChange?.({ dirty, isValid });
    }, [dirty, isValid, onFormStatusChange]);
    return null;
  }

  async function handleSubmit(
    values: { nome: string; cpf: string; telefone: string; email: string },
    formikHelpers: FormikHelpers<{
      nome: string;
      cpf: string;
      telefone: string;
      email: string;
    }>
  ) {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    await onSubmit(values, formikHelpers);
    setLoading(false);
  }

  return (
    <Formik
      key={JSON.stringify(initialValues)}
      initialValues={initialValues}
      initialTouched={
        isModal ? { nome: true, cpf: true, telefone: true, email: true } : {}
      }
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form className="row g-3" id={isModal ? "modal-form" : "register-form"}>
          {onFormStatusChange && (
            <FormStatusNotifier onFormStatusChange={onFormStatusChange} />
          )}

          {(
            [
              {
                name: "nome",
                label: "Nome completo (sem abreviações)",
                type: "text",
              },
              { name: "cpf", label: "CPF", type: "text" },
              {
                name: "telefone",
                label: "Telefone",
                type: "text",
              },
              { name: "email", label: "E-mail", type: "email" },
            ] as const
          ).map(({ name, label, type }) => (
            <div className={"col-md-6"} key={name}>
              <div className="form-floating">
                <Field
                  id={name}
                  name={name}
                  type={type}
                  placeholder={label}
                  className={`form-control ${
                    touched[name] && errors[name]
                      ? "is-invalid"
                      : touched[name]
                      ? "is-valid"
                      : ""
                  }`}
                />
                <label htmlFor={name}>{label}</label>
              </div>
              <ErrorMessage
                name={name}
                component="div"
                className="text-danger small"
              />
            </div>
          ))}

          <div className="col-12 d-flex justify-content-end mt-4">
            <button
              name="submit"
              type="submit"
              className={`custom-button${loading ? " loading" : ""}`}
              disabled={!isValid || !dirty || loading}
            >
              {submitLabel}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
