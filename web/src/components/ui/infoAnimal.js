"use client"

import { useEffect, useState } from "react"
import { getAnimalInfo, getLatestBatimentos } from "@/utils/api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMars, faVenus, faHeartPulse } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"

export default function InfoAnimal({ id }) {
  const [animal, setAnimal] = useState(null)
  const [batimento, setBatimento] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingBatimento, setLoadingBatimento] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setError(new Error("ID do animal não fornecido"))
      setLoading(false)
      setLoadingBatimento(false)
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getAnimalInfo(id)
        setAnimal(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    const fetchBatimento = async () => {
      try {
        setLoadingBatimento(true)
        const data = await getLatestBatimentos(id)
        // Ajuste aqui conforme o nome do campo no retorno da API:
        // Supondo que o batimento está em data.valorBatimento, troque se for diferente
        setBatimento(data?.valorBatimento ?? data?.batimento ?? null)
      } catch (err) {
        console.error("Erro ao buscar batimento:", err)
        setBatimento(null)
      } finally {
        setLoadingBatimento(false)
      }
    }

    fetchData()
    fetchBatimento()
  }, [id])

  if (loading) return (
    <div className="flex justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  )

  if (error) return (
    <div className="bg-red-50 p-4 rounded-lg">
      <p className="text-red-600 font-bold">Erro ao carregar</p>
      <p className="text-sm">{error.message}</p>
    </div>
  )

  return (
    <div className="flex items-center gap-4">
      <Image
        src={animal?.avatar || "/uno.png"}
        alt={animal?.nome || "Animal"}
        width={80}
        height={80}
        className="rounded-full border-4 border-orange-300"
      />
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">{animal?.nome}</h2>
          {animal?.sexo && (
            <FontAwesomeIcon
              icon={animal.sexo === 'M' ? faMars : faVenus}
              className={animal.sexo === 'M' ? 'text-blue-500' : 'text-pink-500'}
            />
          )}
        </div>
        <p className="text-sm">Espécie: {animal?.especieNome || 'Não informado'}</p>

        {/* Exibindo batimento */}
        <div className="mt-2 flex items-center gap-2 text-3xl font-bold text-red-500">
          <FontAwesomeIcon icon={faHeartPulse} />
          <span>
            {loadingBatimento ? "..." : batimento ?? "--"}
          </span>
          <span className="text-xl font-normal ml-1">BPM</span>
        </div>
      </div>
    </div>
  )
}
