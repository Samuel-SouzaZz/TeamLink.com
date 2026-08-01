# Decisões

Registro do que foi decidido e por quê. Serve para que a próxima pessoa (ou eu,
daqui a três meses) não desfaça uma escolha sem saber o que ela sustentava.

---

## 1. O portal inteiro é carregado sob demanda

**Contexto.** O site institucional já tinha passado por um trabalho de
performance: fontes locais, CSS crítico embutido, imagens em AVIF/WebP, divisão
manual de chunks.

**Decisão.** Só `/` é síncrono. Login, portal da aluna e painel da Karol estão
atrás de `lazy()`, e `supabase-js` entra junto com eles.

**Por quê.** A maioria absoluta das visitas é de gente que chegou por um link e
quer ver os horários. Colocar um sistema de agendamento no bundle inicial faria
essas pessoas pagarem o download de algo que nunca vão abrir.

**Detalhe que quase passou batido.** A primeira versão envolvia a aplicação
inteira em `<AuthProvider>`, dentro do `App`. Como o provider importa
`getSupabaseClient`, isso arrastava os 215 kB do `supabase-js` para o chunk
inicial — o `lazy()` das telas não adiantava nada. A correção foi criar
`AuthBoundary`, uma rota sem caminho próprio, também carregada com `lazy()`, que
agrupa tudo que precisa de sessão. O chunk inicial caiu de 578 kB para 268 kB.

**Custo medido e aceito.** O runtime do React Router pesa ~94 kB (32 kB
comprimido) e é inevitável para quem abre `/`, já que é ele que decide o que
renderizar. Comparado ao que está publicado hoje, é o único acréscimo real ao
site institucional. O render da home continua idêntico byte a byte — verificado
com `npm run visual:check`.

---

## 2. Papel no JWT, não em `user_metadata`

**Decisão.** O papel vive em `public.user_roles`, tabela que ninguém autenticado
lê, e chega ao token pelo `custom_access_token_hook`.

**Por quê.** `user_metadata` é editável pela própria pessoa com
`supabase.auth.updateUser()`. Autorizar por ele significaria que qualquer aluna
vira administradora sozinha.

**Consequência.** O papel só muda no próximo token. Depois de promover alguém, é
preciso renovar a sessão.

**Proteção contra regressão.** `src/features/auth/claims.test.ts` falha se
alguém passar a aceitar papel vindo de metadata.

---

## 3. Nenhuma política de `DELETE`, em nenhuma tabela

**Decisão.** Sem política de `DELETE`, o comando é recusado — inclusive para a
Karol.

**Por quê.** A alternativa seria confiar que ninguém escreve `.delete()` no
front-end. Isso é disciplina, e disciplina falha. Sem política, apagar é
impossível pela API, e o histórico fica preservado por construção.

**Como apagar de verdade, se um dia for necessário.** Acesso direto ao banco com
a secret key, deliberado e registrado. Não deve haver caminho fácil.

---

## 4. Reservar é chamada de função, não `insert`

**Decisão.** `book_appointment()` faz `select ... for update` no horário, checa
assinatura e capacidade, insere e incrementa o contador — tudo numa transação.
`appointments` não tem política de `INSERT` para alunas.

**Por quê.** Duas alunas tocando "reservar" ao mesmo tempo na última vaga leriam
`booked_count = 11` e ambas gravariam 12. Validação no React não vê a outra
requisição. A trava de linha serializa as duas.

**Camada extra.** A constraint `booked_count <= capacity` e o índice único
parcial `appointments_one_active_per_slot_idx` seguram mesmo se a função tiver
bug.

---

## 5. Recorte por coluna com `GRANT`, não com RLS

**Decisão.** `revoke update on students from authenticated` seguido de
`grant update (full_name, phone)`.

**Por quê.** RLS avalia a linha inteira; ele não distingue "atualizou o
telefone" de "atualizou o telefone e o status". Sem o recorte por coluna, a
aluna poderia se desarquivar junto com uma edição legítima.

---

## 6. Anotações privadas em tabela separada

**Decisão.** `private_notes` em vez de uma coluna em `students`.

**Por quê.** Separar torna o vazamento acidental impossível: um `select *` em
`students` não pode trazer o que não está lá. Com coluna, bastaria um endpoint
distraído.

---

## 7. Avaliações ficaram de fora

**Decisão.** Nenhuma coluna, nenhuma tabela, nenhum campo. A ficha da aluna
mostra "Em breve".

**Por quê.** Medidas corporais e dados de saúde são categoria especial de dado
pessoal. Modelar isso corretamente exige decidir antes quem pode ler, por quanto
tempo fica guardado e como é obtido o consentimento. Criar as colunas "para
depois" convidaria alguém a começar a preenchê-las sem essas respostas.

---

## 8. Modo demonstração eliminado do build de produção

**Decisão.** `DEMO_MODE = import.meta.env.DEV && !isSupabaseConfigured`.

**Por quê.** As telas precisavam ser navegáveis antes de existir um projeto
Supabase, mas um atalho de "entrar como administradora" no site publicado seria
uma porta destrancada. O Vite substitui `import.meta.env.DEV` por `false` no
build de produção, a condição vira constante e o empacotador remove o caminho
inteiro. Não é uma verificação em tempo de execução que alguém possa contornar
— o código não está lá.

---

## 9. Logo: mesma arte, reamostrada

**Contexto.** A especificação indicava
`src/assets/brand/karol-cascelli-logo.png`, caminho que não existia. A arte
estava em `src/assets/logo/logo.png` — um PNG de 1024×1024 com **1,86 MB**, e
nem sequer versionado no git.

**Decisão.** Gerar `src/assets/brand/karol-cascelli-logo.png` a partir da mesma
arte, reamostrada para 320×320 com transparência preservada: **139 KB**, 93% a
menos. O original continua no repositório como mestre, sem ser importado por
ninguém.

**Por quê.** 1,86 MB numa tela de login aberta no 4G é meio segundo de tela
preta, e o maior uso do emblema é 96 px — que em tela de densidade tripla pede
288 px. 320 px cobre com folga. Não é outra logo: é o mesmo arquivo, no tamanho
em que é exibido, exatamente como o site já faz com as fotos em AVIF/WebP.

**Pendência.** Se a arte correta for outra, basta substituir o arquivo.
`src/components/portal/Logo.tsx` é o único ponto de importação em todo o
portal.

---

## 10. Testes de autorização em pgTAP, não em mock

**Decisão.** As garantias de acesso são testadas em SQL, contra um Postgres com
as políticas aplicadas. O Vitest cobre só a lógica pura do cliente.

**Por quê.** Mock não exercita RLS. Um teste que simula "aluna não vê outra
aluna" no JavaScript testa o mock, não a política — e passaria mesmo se a
política tivesse sido apagada.

**Custo aceito.** `npm run db:test` exige Docker e a Supabase CLI, então não roda
em qualquer máquina nem em CI sem preparo. Vale: é a única forma honesta de
verificar essas garantias.

---

## 11. `dist/` versionado é um risco a resolver

**Contexto.** O `dist/` está no controle de versão porque o deploy da Hostinger
sai dele. Isso significa que rodar `npm run build` e commitar equivale a
publicar.

**Decisão nesta fase.** O build foi executado para validar a compilação, mas o
`dist/` **não foi commitado** e o trabalho está numa branch separada. Nada
chegou em produção.

**Recomendação.** Tirar o `dist/` do repositório e publicar por CI. Enquanto ele
estiver versionado, qualquer commit de rotina pode virar um deploy acidental.

---

# Auditoria de segurança — 01/08/2026

As decisões a seguir vêm da revisão feita antes da criação do primeiro projeto
Supabase. Duas delas corrigem furos reais no desenho anterior, e estão marcadas
como correção.

---

## 12. Vínculo por e-mail removido — **correção**

**O que existia.** `handle_new_user` procurava em `students` uma linha com o
mesmo e-mail da conta recém-criada e gravava `profile_id` nela.

**O furo.** Isso transformava o campo `email` de `auth.users` numa credencial.
Quem controla a criação da conta escolhe o e-mail, e quem escolhe o e-mail
escolheria de qual cadastro assumir o controle — com histórico, anotações
privadas e assinatura paga de outra pessoa. Bastava uma conta criada com o
endereço certo.

O `update ... where profile_id is null` agravava: se o cadastro já estivesse
vinculado, a operação afetava zero linhas e a conta nascia sem erro nenhum, sem
sinal de que algo tinha sido tentado.

**Decisão.** O trigger continua criando `profiles` e o papel inicial, e não
escolhe mais aluna nenhuma. O vínculo virou `internal.link_student_account`,
chamada pelo servidor com o `student_id` **que originou o convite** — não com um
resultado de busca.

A função falha explicitamente se o cadastro já tiver conta, recusa vincular uma
conta a um segundo cadastro, exige a identidade do processo autorizado e registra
tudo em `audit_logs`.

**O que continua comparando e-mail.** A função confere que o e-mail da conta
corresponde ao do cadastro, mas como **asserção**: se o servidor apontar a conta
errada, a operação para. É a rede que pega o erro dele, não o mecanismo de
vínculo. A distinção importa — a comparação não decide nada, apenas recusa
prosseguir quando a decisão já tomada está incoerente.

---

## 13. Conflito de chave única não é "já processado" — **correção**

**O que existia.** A reentrega de um webhook falhava na inserção por causa de
`unique (provider, provider_event_id)`, e a Edge Function trataria isso como
"evento já processado".

**O furo.** O evento pode ter sido inserido e a execução morrer antes de tocar a
assinatura: timeout na consulta ao provedor, deploy no meio, limite de tempo da
função. A linha existe, a assinatura não foi ativada, e a aluna pagou. Na
reentrega, o desenho antigo responderia "já processado" e não faria nada — a
assinatura ficaria pendente para sempre, e o sintoma apareceria como reclamação
da aluna, não como erro em log.

**Decisão.** `payment_events` ganhou máquina de estados: `processing_status`,
`attempt_count`, `last_error_code`, `processing_started_at`, `processed_at`,
`next_retry_at`. A chave única continua garantindo uma linha por evento; quem
responde se há trabalho a fazer é o estado.

Duas constraints impedem estado que mente: `processed` sem `processed_at`, e
qualquer outro estado com `processed_at` preenchido.

`processing_started_at` também funciona como lease de cinco minutos, o que evita
dois workers tratando a mesma cobrança sem precisar de tabela de lock.

**Custo aceito.** O fluxo do webhook passou de "insere e trata conflito" para sete
passos com estado explícito. É mais código para escrever e mais para errar. A
troca vale porque o modo de falha do desenho antigo era silencioso, e o deste é
uma linha em `failed` com `next_retry_at` — visível e reprocessável.

---

## 14. Convite de ativação como token opaco

**Contexto.** A aluna abre `/ativar` **antes de ter conta**. Não há sessão, não há
`auth.uid()`, não há papel. Tudo o que o navegador enviar nesse momento é palpite
do cliente, incluindo o e-mail.

**Decisão.** `internal.student_activation_tokens`, com 256 bits de
`gen_random_bytes(32)` em base64url. A tabela guarda `sha256` do token, nunca o
token. Validade, uso único, revogação, contagem de tentativas, e um convite ativo
por cadastro.

**Por que o hash e não o token.** Um dump do banco — backup, acesso de leitura
concedido por engano, exportação para depurar — não permite ativar conta nenhuma.
O custo é não poder reenviar o mesmo convite: se a aluna perder o e-mail, a Karol
revoga e emite outro. Achamos que perder essa conveniência vale o que se ganha.

**Um ativo por cadastro, e não um por cadastro e plano.** Mais restritivo do que
a especificação pedia. O motivo é que dois convites válidos com planos diferentes
tornariam ambíguo qual plano a aluna contratou — e essa ambiguidade seria
resolvida por qual link ela clicou primeiro, o que não é uma regra de negócio.

**A mensagem de recusa é sempre a mesma.** O banco distingue `not_found`,
`expired`, `revoked` e `already_used`; a aluna recebe um texto único. Diferenciar
"não encontrado" de "já usado" transformaria a tela num verificador de tokens, e
distinguir "expirado" de "revogado" contaria à pessoa errada que a Karol cancelou
aquele convite de propósito. `src/types/activation.test.ts` falha se alguém passar
o motivo para a mensagem.

---

## 15. Convite em fila, separado da ativação da assinatura

**Decisão.** `internal.account_invitation_jobs`, gravada na mesma transação que
ativa a assinatura, consumida depois por um worker.

**Por quê.** Ativar a assinatura é transacional no nosso banco; enviar e-mail
depende de um serviço externo que pode estar fora do ar. Juntar as duas obrigaria
a escolher entre desfazer um pagamento confirmado ou arriscar cobrar duas vezes.

Com o outbox, a falha no envio deixa uma linha em `failed` com
`next_attempt_at` — e a assinatura, que foi paga, permanece ativa. Um índice único
parcial garante que a aluna nunca tenha dois convites em voo, mesmo com o webhook
reentregue várias vezes.

---

## 16. Schema `internal` em vez de mais GRANTs

**Decisão.** Convites e fila em um schema que não consta em `[api] schemas`. O
acesso do servidor é por funções `public.srv_*` com `EXECUTE` exclusivo de
`service_role`.

**Por quê.** A alternativa era deixar as tabelas em `public` e confiar em
`revoke`. Funciona, mas depende de o `revoke` estar certo hoje e continuar certo
depois de cada migration. Fora da lista de schemas expostos, o PostgREST não
alcança as tabelas nem com a secret key — a proteção passa a ser de configuração,
não de lembrança.

**`user_roles` ficou em `public`.** Ela é uma tabela restrita no schema `public`,
protegida por `GRANT` e RLS — descrevê-la como "tabela em schema privado", como a
documentação fazia antes, era impreciso. Mover para `internal` seria possível, mas
o Auth Hook roda como `supabase_auth_admin` e a compatibilidade com schema
alternativo não foi verificada aqui. Como o par `GRANT` + RLS já a torna
inalcançável, seria custo sem ganho e sem cobertura de teste.

---

## 17. `service_role` sem privilégio em tabela

**Decisão.** `service_role` não tem `SELECT`, `INSERT` nem `UPDATE` em nenhuma
tabela de `public`, e não tem `usage` em `internal`. Tudo o que o servidor faz
passa por uma função `srv_*` nomeada.

**Por quê.** `service_role` ignora RLS por definição. Com privilégio direto em
tabela, o que sobra como proteção é a boa intenção de quem escreve a Edge
Function — e uma consulta distraída lá vale mais que todas as políticas daqui.
Com o contrato `srv_*`, o que o servidor pode fazer é uma lista que dá para ler
de uma vez.

**Custo aceito, e é real.** Toda Edge Function futura precisa de uma função
`srv_*` ou de um `GRANT` explícito. Um `supabase.from('students').select()` com a
secret key vai falhar, e quem escrever isso vai levar um tempo para entender por
quê. Contamos com [`supabase/functions/README.md`](../supabase/functions/README.md)
e este parágrafo para encurtar esse tempo. A saída fácil — conceder o privilégio —
desfaz a decisão; a correta é acrescentar a função.

---

## 18. Escrita administrativa por função, não por GRANT ampliado

**Decisão.** A única escrita direta que qualquer cliente tem é a aluna
atualizando o próprio nome e telefone. A Karol escreve por `admin_create_student`,
`admin_update_student`, `admin_book_appointment`, `archive_student`,
`reactivate_student` e `reconcile_slot_counts`.

**Por quê.** É consequência inevitável da decisão 5. O recorte por coluna vale
para o **papel** `authenticated`, e a Karol é `authenticated` — não existe papel
de banco separado para ela. Ampliar o `GRANT` para que ela edite `email` e
`status` daria o mesmo privilégio à aluna, e o `with check (profile_id =
auth.uid())` da política dela não impediria nada, porque a linha é dela.

**Consequência que vale destacar.** `schedule_slots.booked_count` não tem `UPDATE`
para ninguém, nem para a Karol. Um contador que o cliente pode escrever é um
contador que pode ser posto abaixo do real para liberar vaga numa turma cheia.
`reconcile_slot_counts()` é o único caminho para corrigi-lo, e ela **recalcula** a
partir dos agendamentos ativos em vez de aceitar um número vindo de fora.

**O mesmo raciocínio em `appointments`.** `status` é concedido para a Karol marcar
presença; `cancelled_at` não. Como a constraint exige os dois juntos, cancelar por
`UPDATE` direto falha — e o caminho obrigatório passa a ser `cancel_appointment`,
que devolve a vaga.

---

## 19. Um papel por pessoa

**Decisão.** `user_roles` tem `user_id` como chave primária, no lugar de
`unique (user_id, role)`.

**Por quê.** Com o par, a mesma conta poderia ter as duas linhas, e o
`custom_access_token_hook` tinha um `limit 1` para lidar com isso. Ou seja: uma
decisão de autorização sendo tomada por ordem de inserção. Com a chave primária, a
consulta devolve uma linha ou nenhuma.

Na mesma revisão, o `limit 1` de `current_student_id()` também saiu. Como
`students.profile_id` é único, não há como haver duas linhas — e se houver, a
função precisa falhar em vez de decidir silenciosamente a qual cadastro a conta
pertence.

---

## 20. Nenhum `on delete set null`

**Decisão.** Todas as chaves estrangeiras são `restrict`. Antes,
`students.profile_id` era `on delete set null` e `profiles.id` era
`on delete cascade`.

**Por quê.** `set null` desfaria o vínculo em silêncio, e um cadastro com
`profile_id` nulo volta a ser candidato a um convite novo. O descuido de apagar um
perfil viraria uma brecha para assumir o cadastro. Com `restrict`, apagar exige
lidar com o vínculo primeiro — que é exatamente a decisão que não queremos que
aconteça sem alguém tomar.

---

## 21. GRANTs declarados, e padrão futuro fechado

**Contexto.** Até 2026 o Supabase concedia `select, insert, update, delete` a
`anon`, `authenticated` e `service_role` em toda tabela criada em `public`.
Projetos criados a partir de 30/05/2026 não fazem mais isso, e projetos
existentes recebem a mudança em 30/10/2026
([changelog 45329](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically),
consultado em 01/08/2026).

**Decisão.** `20260731090500_grants_and_privileges.sql` revoga tudo e concede o
mínimo, item por item, e usa `alter default privileges` para que objetos futuros
nasçam sem privilégio.

**Por quê.** O efeito de não declarar é ruim nas duas direções: numa base com o
padrão antigo, expõe o que não devia; numa base nova, **quebra o portal** — a Data
API responde como se a tabela não existisse. Revogar antes de conceder faz o mesmo
arquivo produzir o mesmo estado nos dois cenários.

**Efeito colateral que apareceu nos testes.** Como o `execute` padrão de funções
novas em `public` foi revogado, o pgTAP — criado dentro da transação de teste,
depois da migration — deixaria `anon` e `authenticated` sem poder chamar
`throws_ok`. Os arquivos de teste concedem isso explicitamente, descobrindo o
schema da extensão em tempo de execução. Vale registrar porque o sintoma
(privilégio faltando na ferramenta) não se parece com a causa.

---

## 22. PagBank: Checkout Recorrente hospedado

**Decisão.** `POST /checkouts` com o objeto `recurrence_plan`, redirecionando a
aluna para o `href` do item `rel: "PAY"`.

**Confirmado na documentação oficial em 01/08/2026**, não presumido. As URLs
consultadas estão em
[`payment-integration.md`](payment-integration.md#documentação-consultada).

**Por quê essa e não as outras três.** Link de Pagamento Recorrente também é
hospedado, mas o botão vem do painel e o vínculo entre a adesão e o cadastro da
aluna dependeria de configuração manual, fora do controle do código. A API direta
de Assinaturas e a tokenização de cartão exigem que o cartão passe pela nossa
infraestrutura. O Checkout Recorrente é o único que combina cartão fora do nosso
alcance **com** criação por código — o que permite carregar o `reference_id` que
amarra o pagamento ao `student_id` do convite.

**Duas coisas que a documentação corrigiu no nosso desenho.** A idempotência usa
o header `x-idempotency-key`, e a validação do webhook é
`SHA-256("{token_da_conta}-{corpo_bruto}")` comparada ao header
`x-authenticity-token`.

**Risco aceito.** Não existe segredo de webhook separado no PagBank: a assinatura
é calculada com o token da conta, o mesmo que autentica a API. O `.env.example`
listava um `PAGBANK_WEBHOOK_SECRET` que não corresponde à API real, e isso foi
corrigido. A consequência operacional fica: rotacionar o token invalida a
autenticação e a validação de webhook ao mesmo tempo, então a rotação precisa ser
coordenada. Não há como contornar do nosso lado.

---

## 23. `config.toml` não é prova de nada remoto

**Decisão.** [`deployment-checklist.md`](deployment-checklist.md), com a
advertência em primeiro lugar.

**Por quê.** `enable_signup = false` está versionado, é fácil de encontrar e não
tem efeito nenhum sobre o projeto hospedado — onde o padrão é aceitar cadastro
público. A leitura errada é natural: o arquivo diz exatamente o que queremos que
seja verdade. Se ninguém desmarcar a opção no painel, qualquer pessoa cria conta
no portal e o trigger a recebe como aluna.

O checklist também registra que **mudança de papel exige renovar ou revogar a
sessão**. O caso que importa é rebaixar alguém: sem revogar, o acesso
administrativo continua válido até o token expirar.

---

## Pendências registradas

| Assunto | Situação |
| --- | --- |
| Procedimento de anonimização (LGPD) | Não existe. Precisa de decisão de negócio antes da técnica — ver [`security.md`](security.md). |
| Integração PagBank | Só arquitetura e contrato. Depende de credenciais e sandbox. |
| Módulo de avaliações | Adiado por envolver dado de saúde. |
| Consultas reais ao Supabase | Telas ainda usam `src/lib/demo-data.ts`. |
| Edge Functions | Só o contrato, em `supabase/functions/README.md`. |
| Testes pgTAP executados | **Escritos, não executados.** Docker e Supabase CLI não estão instalados nesta máquina. Ver [`README.md`](../README.md#testes). |
| Rotação do token PagBank | Segredo único para API e webhook. Ver decisão 22. |
| `dist/` versionado | Ver decisão 11. |
