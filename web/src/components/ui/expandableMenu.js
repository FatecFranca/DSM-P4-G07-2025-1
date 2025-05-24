"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "@/components/ui/logo"; // ajuste conforme o seu path
import InfoAnimal from "./infoAnimal";

export function ExpandableMenu({ collapsedHeight = "7rem", expandedHeight = "65vh" }) {
    const [expanded, setExpanded] = useState(false);

    function toggleExpand() {
        setExpanded((prev) => !prev);
    }

    return (
        <div
            className={`absolute w-full lg:w-[22rem] lg:left-0 lg:right-auto rounded-t-[3rem] lg:rounded-t-3xl shadow-lg p-4 text-center max-w-full lg:max-w-[22rem] lg:ml-0 bg-white transition-all duration-300 ease-in-out`}
            style={{
                backgroundColor: "var(--color-white-matte)",
                bottom: "5rem",
                height: expanded ? expandedHeight : collapsedHeight,
                overflow: "hidden",
                touchAction: "none",
            }}
        >
            {/* Linha superior com botão centralizado e logo à direita */}
            <div className="relative mb-4">
                {/* Botão da seta centralizado */}
                <div
                    onClick={toggleExpand}
                    className="absolute left-1/2 -translate-x-1/2 w-30 h-6 flex items-center justify-center rounded-full bg-[var(--color-orange)] cursor-pointer"
                    title={expanded ? "Fechar menu" : "Abrir menu"}
                >
                    <FontAwesomeIcon
                        icon={expanded ? faChevronDown : faChevronUp}
                        style={{ color: "var(--color-white)" }}
                        className="text-xl"
                    />
                </div>

                {/* Logo no canto direito */}
                <div className="absolute right-1 top-0">
                    <Logo className="h-10 w-auto sm:h-14 lg:h-10" />
                </div>
                <InfoAnimal className="mt-14" id={"68194120636f719fcd5ee5fd"}></InfoAnimal>
            </div>

            {expanded ? (
                <>
                    <p className="font-bold mt-6">Menu Expandido</p>
                    <p>Aqui vão mais informações do menu</p>
                </>
            ) : (
                <div>

                    <p className="font-bold mt-6">Menu Expansível</p>
                </div>
            )}

        </div>
    );
}
