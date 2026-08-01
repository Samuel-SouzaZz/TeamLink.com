/**
 * Leitura das variáveis de ambiente do Supabase.
 *
 * Só a publishable key (`sb_publishable_...`) pode chegar ao navegador. A
 * secret key vive exclusivamente nas Edge Functions — se algum dia aparecer
 * uma `VITE_*_SECRET*` aqui, é bug de segurança, não configuração.
 */

const url = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ?? ''

/** `true` quando as duas variáveis estão presentes e o cliente pode ser criado. */
export const isSupabaseConfigured = url.length > 0 && publishableKey.length > 0

export const supabaseEnv = { url, publishableKey } as const

/**
 * Barreira contra vazamento acidental: uma chave secreta tem prefixo
 * `sb_secret_` e jamais deve ser publicada num bundle de navegador.
 */
if (publishableKey.startsWith('sb_secret_')) {
  throw new Error(
    'VITE_SUPABASE_PUBLISHABLE_KEY contém uma secret key (sb_secret_...). ' +
      'Use a publishable key (sb_publishable_...); a secret só pode ser usada no servidor.',
  )
}
