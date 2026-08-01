import { useState, type FormEvent } from 'react'
import { Lock } from 'lucide-react'
import styled from 'styled-components'

import {
  Button,
  Card,
  CardLabel,
  Field,
  PageHeading,
  PortalPage,
  SubscriptionStatusPill,
} from '../../../components/portal'
import { formatLongDate } from '../../../lib/datetime'
import {
  demoCurrentStudent,
  findPlan,
  findSubscriptionByStudent,
} from '../../../lib/demo-data'
import { useAuth } from '../../auth/AuthContext'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`

const ReadOnlyRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  font-size: ${({ theme }) => theme.typography.size.sm};

  &:last-child {
    border-bottom: none;
  }
`

const RowLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`

const RowValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  text-align: right;
`

const Note = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 8px 0 0;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`

const Saved = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.success};
`

/**
 * Perfil da aluna.
 *
 * Só os campos de contato são editáveis. Status de assinatura e plano aparecem
 * como leitura: alterá-los é decisão da Karol e do provedor de pagamento, e o
 * RLS recusa qualquer tentativa de escrita nesses campos vinda da aluna.
 */
export default function StudentProfilePage() {
  const { signOut } = useAuth()
  const student = demoCurrentStudent
  const subscription = findSubscriptionByStudent(student.id)
  const plan = subscription ? findPlan(subscription.planId) : null

  const [fullName, setFullName] = useState(student.fullName)
  const [phone, setPhone] = useState(student.phone ?? '')
  const [saved, setSaved] = useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <PortalPage>
      <PageHeading title="Perfil" subtitle="Seus dados de contato." />

      <Card>
        <Form onSubmit={handleSubmit} noValidate>
          <Field
            label="Nome completo"
            name="fullName"
            autoComplete="name"
            required
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value)
              setSaved(false)
            }}
          />
          <Field
            label="Telefone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value)
              setSaved(false)
            }}
            placeholder="(32) 90000-0000"
          />
          <Field
            label="E-mail"
            name="email"
            type="email"
            value={student.email}
            readOnly
            disabled
            hint="Para trocar o e-mail de acesso, fale com a Karol."
          />
          {saved && <Saved role="status">Alterações salvas.</Saved>}
          <Button type="submit" $block>
            Salvar alterações
          </Button>
        </Form>
      </Card>

      <Card>
        <Head>
          <CardLabel>Assinatura</CardLabel>
          {subscription && <SubscriptionStatusPill status={subscription.status} />}
        </Head>
        <ReadOnlyRow>
          <RowLabel>Plano</RowLabel>
          <RowValue>{plan?.name ?? '—'}</RowValue>
        </ReadOnlyRow>
        <ReadOnlyRow>
          <RowLabel>Aluna desde</RowLabel>
          <RowValue>{formatLongDate(student.joinedAt)}</RowValue>
        </ReadOnlyRow>
        {subscription?.currentPeriodEnd && (
          <ReadOnlyRow>
            <RowLabel>Período atual até</RowLabel>
            <RowValue>{formatLongDate(subscription.currentPeriodEnd)}</RowValue>
          </ReadOnlyRow>
        )}
        <Note>
          <Lock size={14} aria-hidden />
          <span>
            O status da assinatura é atualizado apenas pela confirmação de pagamento. Nem você
            nem o aplicativo conseguem alterá-lo.
          </span>
        </Note>
      </Card>

      <Button type="button" $variant="ghost" $block onClick={signOut}>
        Sair da conta
      </Button>
    </PortalPage>
  )
}
