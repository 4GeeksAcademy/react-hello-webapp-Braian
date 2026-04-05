import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

export const AddContact = () => {
  const { store, actions } = useGlobalReducer();
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [validationError, setValidationError] = useState("");
  const isEditing = Boolean(contactId);

  useEffect(() => {
    if (!store.contacts.length) {
      actions.fetchContacts();
    }
  }, []);

  useEffect(() => {
    if (!isEditing) {
      setForm(initialForm);
      return;
    }

    const contact = store.contacts.find((item) => `${item.id}` === contactId);
    if (contact) {
      setForm({
        name: contact.name || "",
        email: contact.email || "",
        phone: contact.phone || "",
        address: contact.address || "",
      });
    }
  }, [isEditing, contactId, store.contacts]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationError("");

    if (!form.name.trim() || !form.email.trim()) {
      setValidationError("Nombre y email son obligatorios.");
      return;
    }

    try {
      if (isEditing) {
        await actions.updateContact(contactId, form);
      } else {
        await actions.createContact(form);
      }
      navigate("/");
    } catch (error) {
      // El error ya se registra en el store.
    }
  };

  const buttonLabel = isEditing ? "Guardar cambios" : "Agregar contacto";
  const pageTitle = isEditing ? "Editar contacto" : "Agregar nuevo contacto";

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>{pageTitle}</h1>
          <p>Completa los datos para {isEditing ? "modificar" : "crear"} un contacto.</p>
        </div>
        <Link to="/">
          <button className="btn btn-outline-primary">Volver a contactos</button>
        </Link>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Nombre completo
          <input name="name" value={form.name} onChange={handleChange} placeholder="Ej. Juan Pérez" />
        </label>

        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} placeholder="ejemplo@mail.com" />
        </label>

        <label>
          Teléfono
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="555-1234" />
        </label>

        <label>
          Dirección
          <input name="address" value={form.address} onChange={handleChange} placeholder="Calle Falsa 123" />
        </label>

        {(validationError || store.error) && (
          <p className="error-message">{validationError || store.error}</p>
        )}

        <button type="submit" className="btn btn-primary" disabled={store.loading}>
          {buttonLabel}
        </button>
      </form>
    </div>
  );
};
