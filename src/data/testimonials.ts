/**
 * Depoimentos — dados estáticos para a seção de depoimentos na página Sobre.
 * Troque textos e adicione/remova itens conforme depoimentos reais.
 */

export interface Testimonial {
  id: string
  name: string
  since: string
  text: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria S.',
    since: '2022',
    text: 'A turma feminina mudou minha vida. Encontrei força, disciplina e uma equipe incrível. A Karol é uma professora que inspira todo mundo.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Ana P.',
    since: '2023',
    text: 'Comecei do zero e em poucos meses já senti a evolução. Ambiente acolhedor e seguro para mulheres. Recomendo demais!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Juliana R.',
    since: '2021',
    text: 'Treino há anos e a energia da turma é única. Foco em técnica e respeito. Melhor decisão que tomei para minha saúde e autoconfiança.',
    rating: 5,
  },
]
