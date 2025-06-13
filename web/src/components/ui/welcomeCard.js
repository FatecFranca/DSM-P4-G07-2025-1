"use client";

import Image from "next/image";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export const WelcomeCard = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative overflow-hidden">
      {/* Logo - Ajuste para mobile */}
      <div className="flex-1 flex justify-center w-full mb-4 max-h-[30vh]">
        <Image 
          src="/logo-petdex.svg" 
          alt="PetDex" 
          width={600}
          height={240}
          className="w-auto h-full max-h-[150px] object-contain"
          priority
        />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[90vw]">
        {/* Texto */}
        <div className="w-full text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 leading-tight">
            Seu pet mais seguro,<br />
            saudável e perto de<br />
            você. Sempre.
          </h1>
        </div>
        
        {/* Botão */}
        <div className="w-full flex justify-center mt-4">
          <Button
            onClick={() => router.push('/intro')}
            variant="primary"
            size="large"
            className="w-full max-w-[240px] py-3 text-base"
          >
            Vamos começar?
          </Button>
        </div>
      </div>

      {/* Pata decorativa (mobile) */}
      <div className="fixed opacity-20 -right-4 -bottom-4 z-0">
        <Image
          src="/pata-dex.svg"
          alt=""
          width={100}
          height={100}
          className="w-[100px] h-[100px]"
        />
      </div>
    </div>
  );
};