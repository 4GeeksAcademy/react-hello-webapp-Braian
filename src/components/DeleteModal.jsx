const DeleteModal = ({ contact, onConfirm, onCancel }) => {
  if (!contact) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>¿Eliminar contacto?</h2>
        <p>
          Estás a punto de eliminar a <strong>{contact.name}</strong>.
        </p>
        <div className="modal-actions">
          <button className="btn btn-delete" type="button" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="btn btn-outline-primary" type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
