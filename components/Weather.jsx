import Image from 'next/image';
import React from 'react';

const Weather = ({ data }) => {

  const sunrise = horarios(data.sys.sunrise, false); 
  const sunset = horarios(data.sys.sunset, false); 

  return (
    <div className='relative flex flex-col justify-between  min-w-[50%] max-w-[60%] w-full h-[90vh] m-auto p-4 text-gray-200 z-10'>
      {/* Top */}
      <div>
        <div className='relative flex justify-between pt-2'>
          <div className='flex flex-col items-center'>
            <Image
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt='/'
              width='100'
              height='100'
            />
            <p className='text-2xl'>{data.weather[0].description}</p>
          </div>
          <p className='text-9xl'>{data.main.temp.toFixed(1)}&#176;</p>
        </div>
        <div className='flex flex-col items-end justify-start'>
          <p className='text-2xl'>Máx: {data.main.temp_max.toFixed(1)}&#176;</p>
          <p className='text-2xl'>Mín: {data.main.temp_min.toFixed(1)}&#176;</p>
        </div>
      </div>
      {/* Bottom */}

      <div className='bg-black/50 relative p-8 rounded-md '>
        <p className='text-2xl text-center pb-6'>Tempo em {data.name} {data.sys.country}</p>
        <div className='flex flex-wrap justify-evenly text-center w-full  text-cyan-200'>
          <div>
            <p className='font-bold text-2xl'>{data.main.feels_like.toFixed(1)}&#176;</p>
            <p className='text-xl'>Sensação</p>
          </div>
          <div>
            <p className='font-bold text-2xl'>{data.main.humidity}%</p>
            <p className='text-xl'>Umidade</p>
          </div>
          <div>
            <p className='font-bold text-2xl'>{data.wind.deg.toFixed(0)}&#176; {(data.wind.speed * 3.6).toFixed(0)} km/h </p>
            <p className='text-xl'>Vento</p>
          </div>
        </div>
        <div className='relative w-full flex justify-evenly text-yellow-200' >
          <div>
            <p className='font-bold text-2xl'>{sunrise} </p>
            <p className='text-xl'>Nascer do Sol</p>
          </div>
          <div>
            <p className='font-bold text-2xl'>{sunset} </p>
            <p className='text-xl'>Pôr do Sol</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Weather;

function horarios(data, showDate) {
  const unixTimestamp = data; 

  // Converter o Unix timestamp para milissegundos multiplicando por 1000
  const timestampInMilliseconds = unixTimestamp * 1000;

  // Criar uma instância de Date a partir do carimbo de data/hora em milissegundos
  const dataHora = new Date(timestampInMilliseconds);

  // Extrair as partes da data/hora
  const ano = dataHora.getFullYear();
  const mes = dataHora.getMonth() + 1; // Os meses são indexados de 0 a 11
  const dia = dataHora.getDate();
  const horas = dataHora.getHours();
  const minutos = dataHora.getMinutes();

  // Formatar as partes da data/hora
  const dataHoraFormatada = showDate ? `${dia}/${mes}/${ano} ${horas}:${minutos}` : `${horas}:${minutos}`;

  return dataHoraFormatada;
}

