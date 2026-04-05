const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <article className="contact-card">
      <div className="contact-header">
        <h3>{contact.name}</h3>
        <small>{contact.email}</small>
      </div>
      <div className="contact-details">
        {contact.phone && (
          <p>
            <strong>Teléfono:</strong> {contact.phone}
          </p>
        )}
        {contact.address && (
          <p>
            <strong>Dirección:</strong> {contact.address}
          </p>
        )}
      </div>
      <div className="contact-actions">
        <button type="button" className="btn btn-edit" onClick={() => onEdit(contact)}>
          Editar
        </button>
        <button type="button" className="btn btn-delete" onClick={() => onDelete(contact)}>
          Eliminar
        </button>
      </div>
    </article>
  );
};

export default ContactCard;
