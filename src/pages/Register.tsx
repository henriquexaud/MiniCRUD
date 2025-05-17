import { type FormikHelpers } from "formik";
import { CustomForm } from "../components/CustomForm";

export default function Register() {
  const initialValues = { nome: "", email: "", cpf: "", telefone: "" };

  const handleSubmit = (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    const registros = JSON.parse(localStorage.getItem("registros") || "[]");
    const novoRegistro = {
      name: values.nome,
      cpf: values.cpf,
      phone: values.telefone,
      email: values.email,
    };
    registros.push(novoRegistro);
    localStorage.setItem("registros", JSON.stringify(registros));
    window.location.href = "/crud";
    alert("Registro salvo com sucesso!");
    resetForm();
  };

  return (
    <div
      className="px-3 py-2 px-md-5 py-md-4 text-start"
      style={{ maxWidth: "800px" }}
    >
      <h2 className="mb-2">Formulário de cadastro</h2>
      <p>Preencha os campos abaixo para cadastrar um novo usuário.</p>

      <CustomForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
}
