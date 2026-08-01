import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabaseEnv } from './env'

let client: SupabaseClient | null = null

/**
 * Cliente Supabase do navegador, criado sob demanda.
 *
 * É criado sob demanda (e não no topo do módulo) para que o site institucional
 * continue funcionando sem nenhuma variável de ambiente configurada: quem não
 * entra no portal nunca chama esta função.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY (veja .env.example).',
    )
  }

  client ??= createClient(supabaseEnv.url, supabaseEnv.publishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  })

  return client
}
