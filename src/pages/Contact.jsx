import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/contactCard";
import DeleteModal from "../components/DeleteModal";

export const Contact = () => {
  const { store, actions } = useGlobalReducer();
  const { contacts, loading, error, deleteModal } = store;
  const navigate = useNavigate();

  useEffect(() => {
    actions.fetchContacts();
  }, []);

  const handleEdit = (contact) => {
    navigate(`/edit/${contact.id}`);
  };

  const handleDelete = (contact) => {
    actions.showDeleteModal(contact);
  };

  const confirmDelete = async () => {
    if (!deleteModal.contact) return;
    await actions.deleteContact(deleteModal.contact.id);
    actions.hideDeleteModal();
  };

  const cancelDelete = () => {
    actions.hideDeleteModal();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Lista de contactos</h1>
          <p>Administra tus contactos usando Context API y la API de 4Geeks.</p>
        </div>
        <Link to="/add">
          <button className="btn btn-primary">Nuevo contacto</button>
        </Link>
      </div>

      {loading && <p>Cargando contactos...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !contacts.length && <p>No hay contactos registrados aún.</p>}

      <div className="contacts-grid">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <DeleteModal contact={deleteModal.contact} onConfirm={confirmDelete} onCancel={cancelDelete} />
    </div>
  );
};
