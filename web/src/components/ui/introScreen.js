"use client";

import Image from "next/image";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars } from "@fortawesome/free-solid-svg-icons";

export const IntroScreen = () => {
    const router = useRouter();

    return (
        <div className="relative w-full h-screen overflow-hidden px-6 py-8">
            {/* Logo: centralizada no mobile, canto direito com respiro no desktop */}
            <div className="absolute top-0 w-full flex justify-center md:justify-end p-4 md:pr-10 z-10">
                <Image
                    src="/logo-petdex.svg"
                    alt="Logo PetDex"
                    width={140}
                    height={140}
                    className="w-[120px] md:w-[180px]"
                />
            </div>



            {/* Gato no canto superior esquerdo */}
            <div className="absolute top-0 left-0 p-2 opacity-20 z-0">
                <Image
                    src="/gato-dex.svg"
                    alt="Gato"
                    width={180}
                    height={180}
                    className="w-[120px] md:w-[280px]" // menor no mobile
                />
            </div>

            {/* Cachorro centralizado na lateral direita */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-20 z-0 pr-2">
                <Image
                    src="/cao-dex.svg"
                    alt="Cachorro"
                    width={240}
                    height={240}
                    className="w-[160px] md:w-[340px]" // menor no mobile
                />
            </div>

            {/* Pata no canto inferior esquerdo */}
            <div className="absolute bottom-0 left-0 p-2 opacity-20 z-0">
                <Image
                    src="/pata-dex.svg"
                    alt="Pata"
                    width={200}
                    height={200}
                    className="w-[120px] md:w-[260px]" // menor no mobile
                />
            </div>

            {/* Conteúdo principal */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center mt-8 md:mt-0">
                {/* Cabeçalho */}
                <div className="space-y-4 max-w-3xl mb-12 px-2 md:px-0">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-orange)]">
                        Boas-vindas a PetDex!
                    </h1>
                    <p className="text-base md:text-lg font-semibold text-gray-700 leading-snug">
                        Nesta plataforma, você poderá visualizar em<br className="hidden md:block" />
                        tempo real os dados da coleira inteligente do seu<br className="hidden md:block" />
                        pet, incluindo localização, frequência cardíaca e<br className="hidden md:block" />
                        outras informações vitais.
                    </p>
                </div>

                {/* Container principal */}
                <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-4xl px-4">
                    {/* Seção do pet */}
                    <div className="flex items-start gap-4 md:gap-6 lg:w-[45%]">
                        <Image
                            src="/uno.png"
                            width={100}
                            height={100}
                            alt="Uno"
                            className="w-[100px] md:w-[140px] rounded-full flex-shrink-0 border-4 border-[var(--color-orange)] shadow-md"
                        />
                        <div className="text-left pt-2">
                            <div className="flex items-center mb-2">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mr-3">Uno</h2>
                                <FontAwesomeIcon icon={faMars} className="text-blue-500 h-4 md:h-5" />
                            </div>
                            <p className="text-gray-600 text-sm md:text-base mb-3">Sem raça definida</p>
                            <div className="flex gap-4 text-gray-800 text-sm md:text-base whitespace-nowrap">
                                <span>10 anos</span>
                                <span>28kg</span>
                                <span>Porte Grande</span>
                            </div>
                        </div>
                    </div>

                    {/* Seção de texto e botão */}
                    <div className="lg:w-[55%] flex flex-col pl-0 md:pl-4">
                        <p className="text-sm md:text-lg text-gray-700 text-left mb-6 md:mb-8 ml-2">
                            Para esta demonstração, vamos acompanhar o nosso companheiro de testes: Uno, um pet muito especial que representa todos os animais que queremos proteger.
                        </p>

                        <div className="w-[200px] mt-4 mx-auto">
                            <Button
                                onClick={() => router.push("/home")}
                                variant="primary"
                                size="large"
                                className="w-full py-3 text-base md:py-4 md:text-lg font-semibold"
                            >
                                Continuar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
