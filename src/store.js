export const initialStore = () => ({
  contacts: [],
  loading: false,
  error: null,
  selectedContact: null,
  deleteModal: {
    visible: false,
    contact: null,
  },
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_loading":
      return { ...store, loading: action.payload };
    case "set_error":
      return { ...store, error: action.payload };
    case "set_contacts":
      return { ...store, contacts: action.payload || [] };
    case "set_selected_contact":
      return { ...store, selectedContact: action.payload };
    case "reset_selected_contact":
      return { ...store, selectedContact: null };
    case "add_contact":
      return { ...store, contacts: [...store.contacts, action.payload] };
    case "update_contact":
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case "remove_contact":
      return {
        ...store,
        contacts: store.contacts.filter((contact) => contact.id !== action.payload),
      };
    case "show_delete_modal":
      return {
        ...store,
        deleteModal: { visible: true, contact: action.payload },
      };
    case "hide_delete_modal":
      return {
        ...store,
        deleteModal: { visible: false, contact: null },
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
