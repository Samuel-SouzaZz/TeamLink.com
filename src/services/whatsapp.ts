/**
 * Services layer — Funções puras (sem dependência de React).
 * Abre WhatsApp com mensagem pré-preenchida.
 */

/**
 * Abre o WhatsApp (wa.me) com a mensagem opcional.
 * @param waMeUrl - URL completa do wa.me (ex: https://wa.me/5511999999999)
 * @param message - Texto da mensagem (será codificado em URL)
 */
export function openWhatsApp(waMeUrl: string, message?: string): void {
  const url = message
    ? `${waMeUrl}?${new URLSearchParams({ text: message }).toString()}`
    : waMeUrl
  window.open(url, '_blank', 'noopener,noreferrer')
}
