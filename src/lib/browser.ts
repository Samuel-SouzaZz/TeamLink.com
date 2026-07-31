/** Abre um link externo em nova aba sem dar acesso ao `window.opener`. */
export function openExternal(href: string) {
  window.open(href, '_blank', 'noopener,noreferrer')
}

/** Rola suavemente até a seção. Aceita tanto `agenda` quanto `#agenda`. */
export function scrollToId(id: string) {
  document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
}
