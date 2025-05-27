import { useState } from "react";
import { postComment } from "../services/postComment";
import Swal from "sweetalert2";

export default function Formulario({ setComments }) {
  const [errors, setErrors] = useState({
    name: false,
    message: false,
  });
  const [form, setForm] = useState({
    name: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameNotValid = form.name.trim() === "";
    const messageNotValid = form.message.trim() === "";

    setErrors({
      name: nameNotValid,
      message: messageNotValid,
    });

    if (nameNotValid || messageNotValid) return;

    const body = JSON.stringify({
      name: form.name.trim(),
      message: form.message.trim(),
    });

    postComment(body)
      .then((data) => {
        setComments((prevComments) => [data, ...prevComments]);
        setForm({ name: "", message: "" }); // Reset form fields
        setErrors({ name: false, message: false }); // Reset errors
      })
      .catch((error) => {
        console.error("Error al enviar el comentario:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo enviar el comentario.",
        });
      });
  };

  return (
    <form
      className="form-control needs-validation"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className={"form-control" + (!errors.name ? "" : " is-invalid")}
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <div className="invalid-feedback">El nombre es requerido</div>
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Comentario
        </label>
        <textarea
          className={"form-control" + (!errors.message ? "" : " is-invalid")}
          id="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        ></textarea>
        <div className="invalid-feedback">El mensaje es requerido</div>
      </div>
      <div className="w-100 d-flex justify-content-center">
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </div>
    </form>
  );
}
