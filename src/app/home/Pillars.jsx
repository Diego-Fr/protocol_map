import { ShieldCheck, Activity, AlertTriangle } from 'lucide-react'

export default function Pillars() {
  const items = [
    {
      icon: <Activity className="w-10 h-10 text-blue-600" />,
      title: 'Monitoramento e Alertas',
      desc: 'Sistema contínuo de vigilância e emissão de avisos com base em dados atualizados e confiáveis.',
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
      title: 'Fundamentação Técnica',
      desc: 'Baseado em critérios científicos, indicadores ambientais e protocolos oficiais consolidados.',
    },
    {
      icon: <AlertTriangle className="w-10 h-10 text-yellow-600" />,
      title: 'Medidas de Contingência',
      desc: 'Ações planejadas e coordenadas para mitigação rápida de impactos e apoio à tomada de decisão.',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">
          PILARES DO PROTOCOLO
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-white rounded-2xl shadow p-8 hover:shadow-lg transition"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}