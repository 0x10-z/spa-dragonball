import React, { useEffect, useState } from "react";

const Character = ({ character, openModal }) => {
  // Definir colores para cada raza
  const getBadgeColor = (race) => {
    switch (race) {
      case "Saiyan":
        return "bg-yellow-500"; // Amarillo para los Saiyan
      case "Namekian":
        return "bg-green-500"; // Verde para los Namekianos
      case "Human":
        return "bg-blue-500"; // Azul para los Humanos
      case "Frieza Race":
        return "bg-purple-500"; // Púrpura para la raza de Frieza
      case "Majin":
      case "Nucleico benigno":
        return "bg-pink-500"; // Rosa para los Majin
      case "Android":
        return "bg-gray-700"; // Gris oscuro para los Androides
      case "God":
        return "bg-red-500"; // Rojo para los Dioses
      case "Angel":
        return "bg-indigo-500"; // Índigo para los Ángeles
      default:
        return "bg-gray-500"; // Gris para otras razas
    }
  };

  return (
    <div
      key={character.id}
      className="bg-white border-2 shadow-lg hover:shadow-2xl border-gray-300 rounded-lg p-2  cursor-pointer"
      onClick={() => openModal(character)}>
      {/* Cabecera de la carta */}
      <div className="bg-gray-800 text-white text-center py-2 rounded-t-lg">
        <h2 className="text-xl font-bold">{character.name}</h2>
      </div>

      {/* Imagen del personaje */}
      <div className="transform hover:scale-150 transition duration-500 ease-in-out">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-48 object-contain rounded-md my-4"
        />
      </div>

      {/* Información de la carta */}
      <div className="text-center">
        <span
          className={`${getBadgeColor(
            character.race
          )} text-white text-xs font-bold mr-2 px-2.5 py-0.5 rounded`}>
          {character.race}
        </span>
        <p className="text-gray-700 mt-2">
          <strong>Ki:</strong> {character.ki}
        </p>
      </div>
    </div>
  );
};

export default Character;
