import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "Latitude e longitude são obrigatórias na requisição." }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("ERRO GRAVE: A variável de ambiente Maps_API_KEY não está configurada.");
    return NextResponse.json({ error: "Erro de configuração no servidor." }, { status: 500 });
  }

  const googleApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=pt-BR`;

  try {
    const response = await fetch(googleApiUrl);
    const data = await response.json();

    if (data.status !== "OK" || !data.results.length) {
      return NextResponse.json({ error: "Endereço não encontrado para estas coordenadas." }, { status: 404 });
    }

    const address = data.results[0].formatted_address;
    return NextResponse.json({ address });

  } catch (err) {
    console.error("Erro de comunicação com a API do Google:", err);
    return NextResponse.json({ error: "Falha ao comunicar com o serviço de geolocalização." }, { status: 502 });
  }
}