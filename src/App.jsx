import React, { useEffect, useState } from "react";
import CharacterModal from "./components/CharacterModal";
import Character from "./components/Character";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [meta, setMeta] = useState({});
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchCharacters = (
    url = "https://dragonball-api.com/api/characters",
    append = false
  ) => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCharacters((prev) =>
          append ? [...prev, ...data.items] : data.items
        );
        setMeta(data.meta);
        setLinks(data.links);
        setLoading(false);
        setIsFetching(false);
      })
      .catch((error) => {
        console.error("Error al obtener los personajes: ", error);
        setLoading(false);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const openModal = (character) => {
    setSelectedCharacter(character);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCharacter(null);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      !isFetching &&
      links.next
    ) {
      setIsFetching(true);
      fetchCharacters(links.next, true); // Cargar más personajes al hacer scroll
    }
  };

  // Escuchar el evento de scroll para el scroll infinito
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links.next, isFetching]); // Escuchar los cambios en el enlace `next` y `isFetching`

  return (
    <div className="bg-dragonball-theme container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-500">
        Personajes de Dragon Ball
      </h1>

      {/* Mostrar un indicador de carga */}
      {loading && <p>Cargando...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-gray-700">
        {characters.map((character) => (
          <Character
            key={character.id}
            character={character}
            openModal={openModal}
          />
        ))}
      </div>

      {/* Mostrar un indicador si se está cargando más personajes */}
      {isFetching && (
        <p className="text-center my-6">Cargando más personajes...</p>
      )}

      {/* Modal */}
      {modalOpen && selectedCharacter && (
        <CharacterModal
          characterId={selectedCharacter.id}
          closeModal={closeModal}
          handleModalClick={handleModalClick}
        />
      )}
    </div>
  );
};

export default App;
