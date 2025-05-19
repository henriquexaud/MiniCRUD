import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
  type FormikHelpers,
} from "formik";
import { useEffect } from "react";
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
  ) => void;
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
  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .required("Nome é obrigatório")
      .min(3, "Nome deve ter pelo menos 3 caracteres"),
    cpf: Yup.string()
      .required("CPF é obrigatório")
      .matches(/^\d{11}$/, "CPF deve conter exatamente 11 números"),
    telefone: Yup.string()
      .required("Telefone é obrigatório")
      // agora aceita 10 OU 11 dígitos
      .matches(/^\d{10,11}$/, "Telefone deve conter 10 ou 11 dígitos"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  });

  // Custom hook to notify form status changes
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
      if (onFormStatusChange) {
        onFormStatusChange({ dirty, isValid });
      }
    }, [dirty, isValid, onFormStatusChange]);
    return null;
  }

  return (
    <Formik
      key={JSON.stringify(initialValues)}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
            <div className={isModal ? "col-12" : "col-md-6"} key={name}>
              <div className="form-floating">
                <Field
                  id={name}
                  name={name}
                  type={type}
                  placeholder={label}
                  className={`form-control ${
                    errors[name] && touched[name] ? "is-invalid" : ""
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

          {!isModal && (
            <div className="col-12 d-flex justify-content-end mt-4">
              <button
                name="submit"
                type="submit"
                className={`btn ${
                  isValid && dirty ? "btn-primary" : "btn-secondary"
                }`}
                disabled={!isValid || !dirty}
              >
                {submitLabel}
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};
