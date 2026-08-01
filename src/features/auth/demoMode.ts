import { isSupabaseConfigured } from '../../lib/supabase/env'

/**
 * Modo demonstração: permite navegar pelas telas antes de existir um projeto
 * Supabase.
 *
 * `import.meta.env.DEV` é substituído literalmente por `false` no build de
 * produção, então a condição vira constante e todo o caminho de demonstração é
 * eliminado do bundle publicado. Não existe como entrar sem autenticação real
 * no site no ar.
 */
export const DEMO_MODE = import.meta.env.DEV && !isSupabaseConfigured
