"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronUp, 
  faChevronDown,
  faHeartPulse,
  faCircle,
  faBatteryFull,
  faMars
} from "@fortawesome/free-solid-svg-icons";
import { Logo } from "@/components/ui/logo";
import Image from "next/image";

export function ExpandableMenu() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`
      fixed bottom-20 bg-white rounded-t-[40px] p-4
      transition-all duration-300 overflow-hidden
      ${expanded ? "h-[65vh]" : "h-[180px]"}
      shadow-lg
      /* Mobile (full width) */
      left-0 right-0 mx-auto max-w-md
      /* Desktop (colado à esquerda sem espaços) */
      lg:left-0 lg:right-auto lg:mx-0 lg:max-w-none lg:w-auto
    `}>
      
      {/* Botão de expandir (laranja) - CENTRALIZADO */}
      <div className="relative flex justify-center mb-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="bg-[var(--color-orange)] rounded-full px-8 py-2 flex items-center"
        >
          <FontAwesomeIcon 
            icon={expanded ? faChevronDown : faChevronUp} 
            className="text-white text-xl"
          />
        </button>
      </div>

      {/* Container interno (protege o layout) */}
      <div className="w-full max-w-md lg:max-w-full mx-auto">
        {/* Conteúdo do card (MESMO LAYOUT ORIGINAL) */}
        <div className="flex items-start gap-4 pt-2">
          {/* Avatar */}
          <div className="relative">
            <Image
              src="/uno.png"
              alt="Pet Uno"
              width={80}
              height={80}
              className="rounded-full border-4 border-[var(--color-orange)]"
            />
          </div>

          {/* Informações (TEXTO PROTEGIDO) */}
          <div className="flex-1 min-w-0"> {/* Adicionei min-w-0 para prevenir quebra */}
            <div className="flex justify-between items-start">
              <div className="overflow-hidden">
                <h2 className="text-3xl font-bold flex items-center gap-2 truncate">
                  Uno
                  <FontAwesomeIcon 
                    icon={faMars} 
                    className="text-blue-500 text-xl flex-shrink-0"
                  />
                </h2>
              </div>
              
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-3xl font-bold">100</span>
                <FontAwesomeIcon 
                  icon={faHeartPulse} 
                  className="text-red-500 text-xl"
                />
                <span className="text-xl font-bold ml-1">BPM</span>
              </div>
            </div>

            {/* Status em UMA LINHA SÓ */}
            <div className="flex justify-between items-center mt-4 whitespace-nowrap">
              <div className="flex items-center overflow-hidden">
                <span className="text-sm truncate">Status da PetDex:</span>
                <FontAwesomeIcon 
                  icon={faCircle} 
                  className="text-green-500 text-xs ml-1 flex-shrink-0"
                />
                <span className="text-sm ml-1 truncate">Conectada</span>
              </div>
              
              <div className="flex items-center gap-1 flex-shrink-0">
                <FontAwesomeIcon 
                  icon={faBatteryFull} 
                  className="text-green-500 text-xl -rotate-90"
                />
                <span className="text-sm">96%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo expandido */}
        {expanded && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-center text-gray-500">Menu expandido</p>
          </div>
        )}
      </div>
    </div>
  );
}