'use client'
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Como vou saber se o volume da minha outorga foi reduzido?",
      answer:
        "A Declaração de Escassez Hídrica não reduz automaticamente o volume de outorgas. Se forem adotadas medidas de contingência que impactem o seu uso da água, você será comunicado pela SP-ÁGUAS de forma individual, com todas as informações sobre o que muda, o prazo e as orientações necessárias.",
    },
    {
      question: "O que é uma subUGRHI?",
      answer:
        "É uma subunidade de gerenciamento de recursos hídricos, ou seja, uma divisão dentro de cada bacia hidrográfica do Estado. Essa divisão permite que a SP-ÁGUAS monitore e avalie a disponibilidade de água de forma mais precisa e regionalizada, considerando as características locais de cada área.",
    },
    {
      question: "O que é a Declaração de Escassez Hídrica?",
      answer:
        "É um ato administrativo da SP-ÁGUAS que reconhece uma situação crítica de disponibilidade de água em determinada região. A declaração serve para orientar a adoção de medidas de contingência, como manobras operacionais, priorização de usos ou restrições temporárias, sempre proporcionais à gravidade da situação.",
    },
    {
      question: "Vi no mapa que minha região está no Estágio 3 ou 4. A declaração é automática nesses casos?",
      answer:
        "Não. Mesmo que os indicadores mostrem criticidade em alguma subUGRHI, a declaração depende de uma avaliação técnica e institucional detalhada e de Deliberação da SP-ÁGUAS. Isso garante que medidas de contingência sejam adotadas quando realmente necessárias, com base em dados e análise das condições locais.",
    },
    {
      question: "Vi no mapa que foi declarada escassez na minha região. O que isso significa?",
      answer:
        "O mapa mostra o diagnóstico técnico atualizado sobre a disponibilidade hídrica em cada sub-UGRHI, indicando as regiões com declaração de escassez vigente. Estar em escassez não significa automaticamente que haverá restrições para todos os usuários da região. As medidas de contingência só são aplicadas após decisão formal da SP-ÁGUAS, e os usuários afetados são comunicados quando houver qualquer alteração nas condições de uso da água.",
    },
    {
      question: "O que é o Experimento Regulatório da SP-ÁGUAS?",
      answer:
        "É uma forma de testar e aprimorar o Protocolo de Escassez Hídrica na prática, em um ambiente real e supervisionado. A SP-ÁGUAS utiliza o experimento para avaliar como os indicadores e fluxos institucionais funcionam em diferentes cenários, permitindo ajustes e melhorias contínuas antes da consolidação definitiva da metodologia.",
    },
    {
      question: "Por que a SP-ÁGUAS adotou um experimento?",
      answer:
        "Porque o experimento traz mais segurança, transparência, previsibilidade e aprendizado. Ele permite que a Agência teste soluções em campo, identifique o que funciona melhor e baseie as futuras decisões em evidências concretas, adaptadas às realidades de cada região do Estado.",
    },
    {
      question: "O que muda para os usuários da água?",
      answer:
        "O Protocolo de Escassez Hídrica já está em vigor e orienta as ações da SP-ÁGUAS durante situações de escassez. Por estar sendo aplicado no formato de Experimento Regulatório, ele será acompanhado de perto e ajustado ao longo do tempo, sempre com base em dados reais e evidências técnicas. Isso garante que as regras e medidas adotadas se tornem cada vez mais precisas, equilibradas e adequadas à realidade de cada região. Se houver medidas de contingência que afetem o uso da água, os usuários serão comunicados pela SP-ÁGUAS.",
    },

    
  ];


  
  return (
    <section id="faq" className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          PERGUNTAS FREQUENTES
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium focus:outline-none"
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-6  text-gray-600 text-sm leading-relaxed transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-80 opacity-100 pb-4"
                    : "max-h-0 opacity-0 overflow-hidden pb-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}