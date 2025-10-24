import Based from './Based'
import FAQ from './FAQ'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import Pillars from './Pillars'

export default function Page(){
    return (
        <>
            <Header/>
            <Hero></Hero>
            <section className="flex flex-row items-center justify-center pt-40 pb-30 bg-gray-100 px-6 w-full">
                <div className='container mx-auto text-center max-w-4xl'>
                    <h5 className="text-3xl font-bold  text-center mb-5">
                        O QUE É O PROTOCOLO? 
                    </h5>
                    <p className="text-lg text-center sm:text-justify">
                        O Protocolo de Escassez Hídrica é um instrumento regulatório estratégico desenvolvido pela SP-ÁGUAS para aprimorar o monitoramento das condições hidrológicas, o mapeamento de riscos e a implementação de medidas de contingência em situações críticas de disponibilidade hídrica no Estado de São Paulo. 

                        Esse instrumento de gestão inovador, inspirado em experiências internacionais, é baseado no monitoramento contínuo e alertas precoces, avaliação das vulnerabilidades das bacias hidrográficas e nas implementações de medidas de contingências. Seu objetivo principal é garantir água para todos os usuários, aumentar a segurança e resiliência hídrica do estado de São Paulo. 
                    </p>
                </div>
                
            </section>

            

            <Pillars></Pillars>

            <section className="flex flex-row items-center justify-center pt-30 pb-50 bg-gray-100 px-6 w-full gap-10">
                <div className='container mx-auto text-center max-w-4xl'>
                    <h2 className="text-3xl font-bold mb-4 text-center">
                        INDICADORES  
                    </h2>
                    <p className="text-lg text-center sm:text-justify">
                        A identificação e o acompanhamento da seca por meio de seus indicadores hidrometeorológicos como Índice de Precipitação Padronizado
                        (SPI), Índice de Precipitação e Evapotranspiração Padronizado (SPEI), Monitor de Secas da Agência
                        Nacional de Águas e Saneamento Básico (ANA), Índice da Diferença de Vegetação Normalizado
                        (NDVI) e os níveis dos reservatórios, permite avaliar a intensidade, duração e impactos da
                        escassez hídrica.
                    </p>
                </div>
                {/* <div className='w-1/3 text-center'>
                   
                </div> */}
            </section>

            <Based></Based>
            <FAQ></FAQ>
            <Footer></Footer>
            
        </>
        
    )
}