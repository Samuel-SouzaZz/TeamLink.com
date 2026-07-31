/**
 * Converte um hex do tema em `rgba()`.
 *
 * Sombras e bordas do site são derivadas das cores da marca. Escrevê-las como
 * rgba literal faz com que elas deixem de acompanhar o tema silenciosamente
 * quando a cor muda — por isso elas passam por aqui.
 */
export function alpha(hex: string, opacity: number) {
  const value = hex.replace('#', '')
  const full =
    value.length === 3
      ? value
          .split('')
          .map((c) => c + c)
          .join('')
      : value

  const int = Number.parseInt(full, 16)
  const r = (int >> 16) & 255
  const g = (int >> 8) & 255
  const b = int & 255

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
