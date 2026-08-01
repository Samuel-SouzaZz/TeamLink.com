# Checklist do projeto Supabase hospedado

## Leia isto antes de qualquer outra coisa

**`supabase/config.toml` configura a instância local. Ele não tem efeito nenhum
sobre o projeto hospedado.**

Isso vale para tudo o que está lá: `enable_signup = false`, as URLs de
redirecionamento, a validade do token, o Auth Hook. No projeto remoto essas
opções vivem no painel e em variáveis do ambiente, e o arquivo versionado não as
alcança.

Consequência prática: ler `enable_signup = false` no repositório e concluir que
o projeto está protegido é o erro mais fácil de cometer aqui. Um projeto
Supabase recém-criado aceita cadastro público por padrão. Se ninguém desmarcar
isso no painel, qualquer pessoa cria conta no portal da Karol — e o trigger
`handle_new_user` a receberá como aluna.

A verificação é no painel, projeto por projeto, e o resultado não é dedutível do
código.

## Antes de criar o projeto

- [ ] Decidir os nomes dos dois projetos: um de desenvolvimento e um de
      produção. Nunca um só. Os testes pgTAP criam e alteram dados, e as
      migrations precisam ser aplicadas em algum lugar descartável antes.
- [ ] Na tela de criação, **desmarcar "Automatically expose new tables"** (ou o
      equivalente vigente). É o comportamento que a migration
      `20260731090500_grants_and_privileges.sql` assume, e ela o reforça por SQL
      de todo jeito — mas começar já com o padrão certo evita uma janela em que
      as tabelas nascem expostas.
- [ ] Guardar a senha do banco em gerenciador de senhas, não em arquivo.

## Autenticação

- [ ] **Cadastro público desabilitado.** Authentication → Sign In / Providers →
      Email: desligar "Enable email signup". Sem isso não existe convite: existe
      cadastro aberto.
- [ ] "Enable anonymous sign-ins" desligado.
- [ ] **Site URL** apontando para o domínio real (`https://karolteamlink.com.br`),
      não para `localhost`.
- [ ] **Redirect URLs** contendo exatamente os caminhos usados: `/login`,
      `/ativar`, e a rota de recuperação de senha. Nada de curinga amplo — uma
      redirect URL permissiva permite que o token de sessão seja entregue num
      domínio de terceiro.
- [ ] Confirmação de e-mail ativada.
- [ ] Validade do token de acesso e rotação do refresh token conferidas.
- [ ] Política de senha e limites de tentativa (rate limits) revisados.
      Authentication → Rate Limits: os padrões são generosos para uma base do
      tamanho desta.

## Auth Hook

- [ ] **`custom_access_token_hook` habilitado** em Authentication → Hooks,
      apontando para `public.custom_access_token_hook`.
- [ ] Conferir, com uma sessão real, que o token emitido traz o claim
      `user_role`. Sem o hook ativo, o claim não existe, `is_admin()` devolve
      falso para todo mundo e a Karol não consegue usar o painel — o portal
      recusa o acesso em vez de adivinhar, mas a causa não é óbvia na tela.
- [ ] Conferir que `supabase_auth_admin` tem `select` em `public.user_roles`.
      A migration `20260731090500` concede isso; se o hook falhar com erro de
      permissão, é aqui que se olha.

## Chaves

- [ ] **Publishable key** (`sb_publishable_...`) na variável
      `VITE_SUPABASE_PUBLISHABLE_KEY` do build. É a única chave que pode estar
      no navegador.
- [ ] **Secret key** (`sb_secret_...`) somente como secret de Edge Function
      (`supabase secrets set`). Ela ignora RLS por completo.
- [ ] Conferir que nenhuma variável `VITE_*` contém segredo. Tudo com esse
      prefixo é copiado literalmente para dentro do JavaScript entregue ao
      navegador. `src/lib/supabase/env.ts` recusa iniciar se a chave do cliente
      tiver prefixo `sb_secret_`, mas essa barreira só pega esse erro
      específico.
- [ ] Token do PagBank apenas como secret de Edge Function. Ele autentica a API
      **e** valida a assinatura do webhook (ver
      [`payment-integration.md`](payment-integration.md)).

## E-mail

- [ ] **Custom SMTP configurado antes de enviar qualquer convite real.** O SMTP
      embutido do Supabase é limitado a poucos e-mails por hora e destinado a
      teste. Um convite que não chega deixa a aluna com assinatura paga e sem
      conta — o `account_invitation_jobs` guarda o job para nova tentativa, mas
      não conserta um remetente que não entrega.
- [ ] Template de convite revisado: remetente reconhecível, texto em português,
      link apontando para `/ativar`.
- [ ] Template de recuperação de senha revisado.
- [ ] Validade dos links de convite e de recuperação conferida. O link é
      credencial; validade longa é exposição longa.
- [ ] Envio testado para um endereço real antes do primeiro convite de aluna.

## Banco

- [ ] Migrations aplicadas **primeiro no projeto de desenvolvimento**, na ordem,
      e conferidas antes de tocar produção.
- [ ] Testes pgTAP executados no projeto de desenvolvimento ou na instância
      local. **Nunca em produção**: eles criam e alteram dados.
- [ ] Depois de aplicar as migrations, conferir no painel que `public.user_roles`
      não aparece como acessível a `anon` nem a `authenticated`.
- [ ] Conferir que as tabelas de `internal` não estão listadas em Settings →
      API → Exposed schemas. O schema não deve constar ali.
- [ ] **Security Advisor** executado, sem alerta pendente. Ele pega RLS
      desligado e função `security definer` com `search_path` mutável — as duas
      coisas que este projeto declara ter resolvido.
- [ ] **Performance Advisor** executado. Ele aponta chave estrangeira sem índice
      e política RLS que reavalia função por linha.
- [ ] Backup automático conferido, e a retenção anotada.

## Operação

- [ ] Nenhum segredo em log. Em particular: o token de ativação nunca deve
      aparecer em log de Edge Function, e a mensagem de erro do PagBank não deve
      ser copiada para `payment_events.last_error_code` — a coluna guarda código
      curto e estável, e o limite de 64 caracteres existe para desencorajar o
      contrário.
- [ ] Nenhum segredo em arquivo versionado. Conferir com
      `git log -p -- .env*` antes do primeiro deploy.
- [ ] Sandbox do PagBank separado da produção, com credenciais distintas e
      `PAGBANK_ENV` explícito.
- [ ] Webhook do PagBank apontando para a Edge Function do ambiente correto.
      Apontar a sandbox para a produção mistura assinatura de teste com
      cobrança real.

## Depois de mudar o papel de alguém

Promover ou rebaixar alguém em `public.user_roles` **não afeta a sessão já
aberta**. O token é uma fotografia do momento em que foi emitido: o
`custom_access_token_hook` roda na emissão, não a cada requisição.

Então, ao promover a Karol ou ao remover o acesso administrativo de alguém:

- [ ] Encerrar as sessões daquela pessoa (Authentication → Users → a conta →
      revogar sessões), ou aguardar a expiração do token de acesso.
- [ ] Confirmar, depois de novo login, que o claim `user_role` mudou.

O caso que importa é o segundo: **rebaixar alguém sem revogar a sessão deixa o
acesso administrativo válido até o token expirar.** Para conceder privilégio, a
espera é só inconveniente; para retirar, é uma janela real.

## O que este checklist não cobre

- Procedimento de anonimização para pedido de exclusão (LGPD). Não existe ainda,
  e está registrado como pendência em [`decisions.md`](decisions.md).
- Integração real com o PagBank. Nada foi implementado; o que existe é
  arquitetura e contrato em [`payment-integration.md`](payment-integration.md).
- Publicação do front-end. O processo atual da Hostinger usa o `dist/`
  versionado, e nada nesta etapa alterou esse diretório.
