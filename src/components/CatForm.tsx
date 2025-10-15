import React, { useState } from "react";

interface CatFormProps {
  onCreate: (data: { name: string; origin: string; temperamento: string; esperanza_vida: string; descripcion_completa: string }) => void;
}

const CatForm: React.FC<CatFormProps> = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [temperamento, setTemperamento] = useState("");
  const [esperanza_vida, setEsperanzaVida] = useState("");
  const [descripcion_completa, setDescripcionCompleta] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ name, origin, temperamento, esperanza_vida, descripcion_completa });
    setName("");
    setOrigin("");
    setTemperamento("");
    setEsperanzaVida("");
    setDescripcionCompleta("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Origen"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Temperamento"
        value={temperamento}
        onChange={(e) => setTemperamento(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Esperanza de vida"
        value={esperanza_vida}
        onChange={(e) => setEsperanzaVida(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción completa"
        value={descripcion_completa}
        onChange={(e) => setDescripcionCompleta(e.target.value)}
        required
      />
      <button type="submit">Crear Gato</button>
    </form>
  );
};

export default CatForm;