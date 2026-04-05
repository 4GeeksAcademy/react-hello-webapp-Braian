import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();
const AGENDA_SLUG = "react_hello_webapp";
const API_BASE = "https://playground.4geeks.com/contact";
const CONTACTS_URL = `${API_BASE}/agendas/${AGENDA_SLUG}/contacts`;
const AGENDA_URL = `${API_BASE}/agendas/${AGENDA_SLUG}`;

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  const setLoading = (isLoading) => dispatch({ type: "set_loading", payload: isLoading });
  const setError = (message) => dispatch({ type: "set_error", payload: message });
  const setContacts = (contacts) => dispatch({ type: "set_contacts", payload: contacts });
  const setSelectedContact = (contact) => dispatch({ type: "set_selected_contact", payload: contact });
  const resetSelectedContact = () => dispatch({ type: "reset_selected_contact" });
  const showDeleteModal = (contact) => dispatch({ type: "show_delete_modal", payload: contact });
  const hideDeleteModal = () => dispatch({ type: "hide_delete_modal" });

  const createAgenda = async () => {
    const response = await fetch(AGENDA_URL, { method: "POST" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.detail || "No se pudo crear la agenda.");
    }
    return response.json();
  };

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      let response = await fetch(CONTACTS_URL);
      if (response.status === 404) {
        await createAgenda();
        response = await fetch(CONTACTS_URL);
      }
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || data.detail || "No se pudieron cargar los contactos.");
      const contacts = Array.isArray(data) ? data : data.contacts || [];
      setContacts(contacts);
      return contacts;
    } catch (error) {
      setError(error.message || "Error al cargar los contactos.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contact) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(CONTACTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "No se pudo crear el contacto.");
      await fetchContacts();
      return data;
    } catch (error) {
      setError(error.message || "Error al crear el contacto.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (id, contact) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${CONTACTS_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "No se pudo actualizar el contacto.");
      await fetchContacts();
      return data;
    } catch (error) {
      setError(error.message || "Error al actualizar el contacto.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${CONTACTS_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg || "No se pudo eliminar el contacto.");
      }
      dispatch({ type: "remove_contact", payload: id });
    } catch (error) {
      setError(error.message || "Error al eliminar el contacto.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        store,
        dispatch,
        actions: {
          fetchContacts,
          createContact,
          updateContact,
          deleteContact,
          setSelectedContact,
          resetSelectedContact,
          showDeleteModal,
          hideDeleteModal,
        },
      }}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useGlobalReducer must be used within StoreProvider");
  }
  return context;
}
