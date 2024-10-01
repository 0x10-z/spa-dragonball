import React, { useEffect, useState } from "react";

const CharacterModal = ({ characterId, closeModal, handleModalClick }) => {
  const [characterDetails, setCharacterDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(null); // Nuevo estado para la imagen actual

  // Función para obtener los detalles completos del personaje
  useEffect(() => {
    const fetchCharacterDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dragonball-api.com/api/characters/${characterId}`
        );
        const data = await response.json();
        setCharacterDetails(data);
        setCurrentImage(data.image); // Inicializar la imagen con la imagen del personaje
        setLoading(false);
      } catch (error) {
        console.error("Error fetching character details:", error);
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [characterId]);

  if (loading) {
    return (
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
        onClick={handleModalClick}>
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!characterDetails) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleModalClick} // Cerrar modal al hacer clic fuera del contenido
    >
      <div
        className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[100vh] overflow-y-auto overflow-x-hidden shadow-lg"
        onClick={(e) => e.stopPropagation()} // Evitar cierre si se hace clic dentro del modal
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-600">
          {characterDetails.name}
        </h2>

        {/* Mostrar la imagen actual, que cambia cuando seleccionas una transformación */}
        <div className="flex justify-center mb-6">
          <img
            src={currentImage}
            alt={characterDetails.name}
            className="w-60 h-60 object-contain rounded-md "
          />
        </div>

        {/* Información del personaje */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-6">
          <div>
            <p className="text-xl font-semibold text-gray-700">Raza</p>
            <p className="text-lg">{characterDetails.race}</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-700">Género</p>
            <p className="text-lg">{characterDetails.gender}</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-700">Afiliación</p>
            <p className="text-lg">{characterDetails.affiliation}</p>
          </div>
        </div>

        {/* Mostrar planeta de origen */}
        {characterDetails.originPlanet && (
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-green-600">
              Planeta de Origen
            </h3>
            <p className="text-lg">
              <strong>Nombre:</strong> {characterDetails.originPlanet.name}
            </p>
            <p className="text-sm text-gray-500">
              {characterDetails.originPlanet.description}
            </p>
            <div className="flex justify-center mt-4">
              <img
                src={characterDetails.originPlanet.image}
                alt={characterDetails.originPlanet.name}
                className="w-40 h-40 object-contain rounded-md "
              />
            </div>
          </div>
        )}

        {/* Mostrar transformaciones en carrusel horizontal */}
        {characterDetails.transformations &&
          characterDetails.transformations.length > 0 && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-blue-600 text-center mb-4">
                Transformaciones
              </h3>
              <div className="overflow-hidden">
                <div className="flex space-x-6 animate-scroll">
                  {characterDetails.transformations.map((transformation) => (
                    <div
                      key={transformation.id}
                      className="flex-none cursor-pointer text-center"
                      onClick={() => setCurrentImage(transformation.image)} // Actualiza la imagen al hacer clic
                    >
                      <img
                        src={transformation.image}
                        alt={transformation.name}
                        className="w-32 h-32 object-contain rounded-md mb-2 "
                      />
                      <p className="text-lg font-semibold">
                        {transformation.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Ki:</strong> {transformation.ki}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        {/* Botón de cierre */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            onClick={closeModal}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
