"use client";

import Image from "next/image";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export const WelcomeCard = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-20 py-8 md:py-12 relative overflow-hidden">
      {/* Logo - Ajuste final mobile */}
      <div className="md:flex-1 flex justify-center w-full md:w-auto mb-8 md:mb-0">
        <Image 
          src="/logo-petdex.svg" 
          alt="PetDex" 
          width={600}
          height={240}
          className="w-auto h-[180px] md:h-[400px] object-contain" // Reduzido mais um pouco (de 200px para 180px)
          priority
        />
      </div>

      {/* Conteúdo - Espaçamento mobile aumentado */}
      <div className="md:flex-1 max-w-[90vw] md:max-w-md md:pl-16 mt-4 md:mt-0"> {/* Adicionado mt-4 no mobile */}
        {/* Texto */}
        <div className="w-full text-center md:text-left md:ml-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
            Seu pet mais seguro,<br />
            saudável e perto de<br />
            você. Sempre.
          </h1>
        </div>
        
        {/* Botão com mais margem superior no mobile */}
        <div className="flex justify-center mt-8 md:mt-10"> {/* Aumentado de mt-6 para mt-8 */}
          <Button
            onClick={() => router.push('/intro')}
            variant="primary"
            size="large"
            className="w-[240px] md:w-[240px] py-3 md:py-4 text-base md:text-lg"
          >
            Vamos começar?
          </Button>
        </div>
      </div>

      {/* Pata mobile */}
      <div className="fixed opacity-20 -right-4 -bottom-4 md:-right-6 md:-bottom-6">
        <Image
          src="/pata-dex.svg"
          alt=""
          width={100}
          height={100}
          className="w-[120px] h-[120px] md:w-[200px] md:h-[200px]"
        />
      </div>
    </div>
  );
};