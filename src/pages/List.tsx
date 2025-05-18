import { useEffect, useState } from "react";
import { Trash, Pencil } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";
import { CustomForm } from "../components/CustomForm";

type Registro = {
  name: string;
  cpf: string;
  phone: string;
  email: string;
};

export default function List() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Registro>({
    name: "",
    cpf: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const localData = localStorage.getItem("registros");
    if (localData && JSON.parse(localData).length > 0) {
      setRegistros(JSON.parse(localData));
    } else {
      fetch("https://private-9d65b3-tinnova.apiary-mock.com/users")
        .then((res) => res.json())
        .then((data: Registro[]) => {
          setRegistros(data);
          localStorage.setItem("registros", JSON.stringify(data));
        })
        .catch((err) => {
          console.error("Erro ao buscar usuários da API:", err);
        });
    }
  }, []);

  const excluirRegistro = (index: number) => {
    const novosRegistros = [...registros];
    novosRegistros.splice(index, 1);
    setRegistros(novosRegistros);
    localStorage.setItem("registros", JSON.stringify(novosRegistros));
  };

  const abrirModalEdicao = (index: number) => {
    setEditIndex(index);
    setFormData(registros[index]);
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setEditIndex(null);
  };

  return (
    <div className="px-3 py-2 px-md-5 py-md-4 text-start">
      <h2 className="mb-2">Lista de usuários</h2>
      <p>Encontre e gerencie os registros salvos.</p>

      {registros.length === 0 ? (
        <p className="text-muted">Nenhum usuário encontrado.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-borderless align-middle">
            <thead>
              <tr className="border-bottom">
                <th className="fw-normal">Nome</th>
                <th className="fw-normal d-none d-md-table-cell">CPF</th>
                <th className="fw-normal d-none d-md-table-cell">Telefone</th>
                <th className="fw-normal d-none d-md-table-cell">Email</th>
                <th style={{ width: "80px" }}></th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro, index) => (
                <tr key={index} className="border-bottom">
                  <td>{registro.name}</td>
                  <td className="d-none d-md-table-cell">{registro.cpf}</td>
                  <td className="d-none d-md-table-cell">{registro.phone}</td>
                  <td className="d-none d-md-table-cell">{registro.email}</td>
                  <td className="text-end d-flex gap-2 justify-content-end">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => abrirModalEdicao(index)}
                      title="Editar"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => excluirRegistro(index)}
                      title="Excluir"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal show={showModal} onHide={fecharModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomForm
            initialValues={{
              nome: formData.name,
              cpf: formData.cpf,
              telefone: formData.phone,
              email: formData.email,
            }}
            submitLabel="Salvar"
            onSubmit={(values: {
              nome: string;
              cpf: string;
              telefone: string;
              email: string;
            }) => {
              if (editIndex === null) return;
              const novosRegistros = [...registros];
              novosRegistros[editIndex] = {
                name: values.nome,
                cpf: values.cpf,
                phone: values.telefone,
                email: values.email,
              };
              setRegistros(novosRegistros);
              localStorage.setItem("registros", JSON.stringify(novosRegistros));
              fecharModal();
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
