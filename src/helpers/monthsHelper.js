export const MONTHS_PT = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
]

// mes_por_extenso/YYYY -> ex.: "setembro/2025"
export const formatMonthLabel = (year, month) => {
    if (!year || !month || !MONTHS_PT[month - 1]) return ''
    return `${MONTHS_PT[month - 1]}/${year}`
}
