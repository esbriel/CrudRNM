import { useEffect, useState } from "react";
import { getComments } from "./services/getComments";
import Formulario from "./components/formulario";
import Swal from "sweetalert2";
import Tabla from "./components/tabla";

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments()
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los comentarios.",
        });
      });
  }, []);

  return (
    <div>
      <h1>CRUD REACT + NODE + MySQL</h1>
      <Formulario setComments={setComments} />
      <h2 className="mt-4">Comentarios <span className="badge text-bg-secondary">{comments.length}</span></h2>
      <Tabla comments={comments} />
    </div>
  );
}

export default App;
