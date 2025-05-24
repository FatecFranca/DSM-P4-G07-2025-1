"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
                bottom: "5rem", // fixado acima da barra inferior
                height: expanded ? expandedHeight : collapsedHeight,
                overflow: "hidden",
                touchAction: "none",
            }}
        >
            {/* Barra com ícone */}
            <div
                onClick={toggleExpand}
                className="mx-auto mb-4 w-30 h-6 flex items-center justify-center rounded-full bg-[var(--color-orange)] cursor-pointer "
                title={expanded ? "Fechar menu" : "Abrir menu"}
            >
                <FontAwesomeIcon
                    icon={expanded ? faChevronDown : faChevronUp}
                    style={{ color: "var(--color-white)" }}
                    className="text-xl"
                />

            </div>

            {expanded ? (
                <>
                    <p className="font-bold">Menu Expandido</p>
                    <p>Aqui vão mais informações do menu</p>
                </>
            ) : (
                <p className="font-bold">Menu Expansível</p>
            )}
        </div>
    );
}
