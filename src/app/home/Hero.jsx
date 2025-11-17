
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] });

import styles from './Hero.module.scss'

export default function Hero(){
    return (
        <section className={`flex relative flex-col items-center pb-30 pt-30 min-h-[calc(100vh-80px)] bg-gradient-to-br bg-white  px-2 w-full ${inter.className}`}>
            <div className='container mx-auto text-center pb-20'>
                <h1 className="text-5xl font-bold mb-10 text-center">
                    SEGURANÇA HÍDRICA PARA O ESTADO DE SÃO PAULO
                </h1>
                <p className="text-lg mb-10 text-center">
                    Acesse o mapa do Protocolo de Escassez Hídrica de São Paulo e confira o estágio de disponibilidade hídrica da sua região.<br/> O mapa é atualizado mensalmente e publicado até o quinto dia útil do mês com base nos dados consolidados do período anterior
                </p>
                <a
                    className="bg-blue-500 border-2 border-sky-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                    href='/protocolo'
                >
                    Acessar Mapa
                </a>
            </div>
            <div className={`container mx-auto max-w-4xl ${styles.imagesContainer}`}>
                <div className={`border-1 border-gray-200 shadow-lg ${styles.mapImage}`}>
                    <img src='/protocolo/images/protocol_map.png' />
                </div>
                <div className={`${styles.mobileImage}`}>
                    <img src='/protocolo/images/mobileframe-portrait3.png' />
                </div>
            </div>
            <div className={`absolute bottom-0 transform translate-y-1/2 p-4 bg-white rounded-2xl border-1 border-gray-100 shadow-lg flex items-center `}>
                <div className={``}>
                    <img src='/protocolo/images/logo.png' />
                </div>

            </div>
            <div className={`mt-2 text-sm sm:text-md`}>
                Mapa referente a <b>SETEMBRO</b> de <b>2025</b>
            </div>
        </section> 
    )
}