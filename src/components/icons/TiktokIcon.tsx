import type { SVGProps } from 'react'

/**
 * Ícone TikTok (estilo outline, compatível com Lucide).
 * Baseado no símbolo oficial do TikTok.
 */
export function TiktokIcon({ size = 24, strokeWidth = 2, ...props }: SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-hidden
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V2a5 5 0 0 0 5 5" />
    </svg>
  )
}
