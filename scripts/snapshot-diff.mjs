/**
 * Compara dois snapshots gerados por scripts/snapshot.mjs.
 *
 * Os nomes de classe do styled-components mudam a cada execução, então a
 * comparação não pode ser textual. O que este script faz:
 *
 *   1. parseia o CSS em regras (respeitando @media aninhado);
 *   2. indexa cada regra pelas classes que ela referencia;
 *   3. percorre o DOM e troca o atributo class de cada elemento pelo conjunto
 *      de regras que efetivamente se aplicam a ele;
 *   4. normaliza nomes de @keyframes pelo conteúdo, não pelo nome.
 *
 * O resultado é um documento canônico: se dois snapshots produzirem o mesmo
 * documento, a árvore renderizada e o estilo efetivo de cada nó são idênticos.
 *
 * Uso: node scripts/snapshot-diff.mjs <antes> <depois>
 */
import fs from 'node:fs'
import crypto from 'node:crypto'

const AT_NESTED = /^@(media|supports|layer|container|-moz-document)/

function parseRules(css, context = '') {
  const rules = []
  let i = 0
  while (i < css.length) {
    const open = css.indexOf('{', i)
    if (open === -1) break
    const prelude = css.slice(i, open).trim()

    let depth = 0
    let close = open
    for (; close < css.length; close++) {
      if (css[close] === '{') depth++
      else if (css[close] === '}' && --depth === 0) break
    }
    const body = css.slice(open + 1, close)

    if (AT_NESTED.test(prelude)) {
      rules.push(...parseRules(body, context ? `${context} && ${prelude}` : prelude))
    } else {
      rules.push({ context, selector: prelude, decls: body.trim() })
    }
    i = close + 1
  }
  return rules
}

const sha = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8)

// `0.20` e `0.2` são o mesmo valor CSS; sem isso o diff acusa ruído.
const trimZeros = (s) => s.replace(/(\d)\.(\d*?)0+(?=\D|$)/g, (m, i, d) => (d ? `${i}.${d}` : i))
const tidy = (s) => trimZeros(s.replace(/\s+/g, ' ')).trim()

function canonicalize(snapshot) {
  const [dom, rawCss = ''] = snapshot.split('/* ===== CSS ===== */')
  // styled-components intercala marcadores /*!sc*/ entre as regras
  const css = rawCss.replace(/\/\*[\s\S]*?\*\//g, '')
  const rules = parseRules(css)

  // @keyframes: o nome é gerado, então identificamos pelo conteúdo.
  const keyframeAlias = new Map()
  for (const rule of rules) {
    const kf = rule.selector.match(/^@(?:-\w+-)?keyframes\s+(\S+)/)
    if (kf) keyframeAlias.set(kf[1], `kf_${sha(tidy(rule.decls))}`)
  }

  const deAnimate = (s) => {
    let out = s
    for (const [name, alias] of keyframeAlias) {
      out = out.replaceAll(name, alias)
    }
    return out
  }
  // classes viram '.C': o que importa é a forma do seletor, não o nome gerado
  const deClass = (s) => s.replace(/\.-?[_a-zA-Z][\w-]*/g, '.C')

  const byClass = new Map()
  const globals = []

  for (const rule of rules) {
    const decls = tidy(deAnimate(rule.decls))
    if (!decls) continue // .sc-xxxx{} vazio: só o componentId

    const classes = [...rule.selector.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1])
    const text = `${rule.context} | ${deClass(deAnimate(rule.selector))} | ${decls}`

    if (classes.length === 0) {
      globals.push(text)
      continue
    }
    for (const cls of new Set(classes)) {
      if (!byClass.has(cls)) byClass.set(cls, [])
      byClass.get(cls).push(text)
    }
  }

  // Troca o class="..." de cada elemento pelas regras que se aplicam a ele.
  const resolved = dom.replace(/class="([^"]*)"/g, (_, list) => {
    const applied = list
      .split(/\s+/)
      .filter(Boolean)
      .flatMap((cls) => byClass.get(cls) ?? [])
    return `styles="${[...new Set(applied)].sort().join(' ;; ')}"`
  })

  return { resolved, globals: globals.sort(), ruleCount: rules.length }
}

const [beforePath, afterPath] = process.argv.slice(2)
const before = canonicalize(fs.readFileSync(beforePath, 'utf8'))
const after = canonicalize(fs.readFileSync(afterPath, 'utf8'))

let failures = 0

if (before.resolved === after.resolved) {
  console.log('DOM + estilo efetivo por elemento: IDENTICO')
} else {
  failures++
  console.log('DOM + estilo efetivo por elemento: DIFERE')
  const a = before.resolved
  const b = after.resolved
  let i = 0
  while (i < Math.min(a.length, b.length) && a[i] === b[i]) i++
  console.log('\n  contexto: ...' + a.slice(Math.max(0, i - 200), i))
  console.log('\n  ANTES  >>> ' + a.slice(i, i + 500))
  console.log('\n  DEPOIS >>> ' + b.slice(i, i + 500))
}

if (before.globals.join('\n') === after.globals.join('\n')) {
  console.log('Regras globais (sem classe): IDENTICO')
} else {
  failures++
  console.log('Regras globais (sem classe): DIFERE')
  const onlyBefore = before.globals.filter((g) => !after.globals.includes(g))
  const onlyAfter = after.globals.filter((g) => !before.globals.includes(g))
  for (const g of onlyBefore) console.log('  - ' + g)
  for (const g of onlyAfter) console.log('  + ' + g)
}

console.log(`\nregras CSS: antes=${before.ruleCount} depois=${after.ruleCount}`)
process.exit(failures ? 1 : 0)
