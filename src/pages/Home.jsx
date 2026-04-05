import ContactCard from "../components/contactCard.jsx";

export const Home = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>CRUD de Contactos</h1>
      <ContactCard />
    </div>
  );
};
