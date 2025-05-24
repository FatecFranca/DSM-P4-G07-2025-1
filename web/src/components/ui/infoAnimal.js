"use client";

import { useEffect, useState } from "react";
import { getAnimalInfo } from "@/utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

export default function InfoAnimal({ id }) {
    const [animal, setAnimal] = useState(null);

    useEffect(() => {
        async function fetchAnimal() {
            const data = await getAnimalInfo(id);
            setAnimal(data);
            console.log(animal)
        }

        fetchAnimal();
    }, [id]);

    if (!animal) return <p>Carregando dados...</p>;

    return (
        <div>
            <img src={animal.avatar || "/avatar-placeholder.png"} alt={animal.nome} className="w-24 h-24 rounded-full" />
            <h2 className="text-xl font-bold">{animal.nome}</h2>
            {
                animal.sexo == 'M' ? <FontAwesomeIcon icon={faMars}/> : <FontAwesomeIcon icon={faVenus}/> 
            }
            <p>Sexo: {animal.sexo}</p>
            <p>Espécie: {animal.especieNome}</p>
        </div>
    );
}
