import styled from 'styled-components'

import {
  Button,
  Card,
  CardLabel,
  PageHeading,
  PortalPage,
  StatusPill,
  SubscriptionStatusPill,
} from '../../../components/portal'
import { formatPrice } from '../../../lib/datetime'
import { demoPlans, demoSubscriptions, findPlan, findStudent } from '../../../lib/demo-data'

const Head = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`

const PlanName = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
`

const Price = styled.p`
  margin: 4px 0 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.xl};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.accent};

  span {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 0.75rem;
    font-weight: ${({ theme }) => theme.typography.weight.normal};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const Description = styled.p`
  margin: 8px 0 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Row = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  &:last-child {
    border-bottom: none;
  }
`

const Name = styled.span`
  flex: 1;
  min-width: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const PlanLabel = styled.span`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const Note = styled.p`
  margin: 12px 0 0;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`

export default function PlansPage() {
  const activeCount = demoSubscriptions.filter((s) => s.status === 'active').length

  return (
    <PortalPage>
      <PageHeading title="Planos" subtitle="Valores e situação das assinaturas." />

      {demoPlans.map((plan) => (
        <Card key={plan.id}>
          <Head>
            <div>
              <PlanName>{plan.name}</PlanName>
              <Price>
                {formatPrice(plan.priceCents)} <span>/ mês</span>
              </Price>
            </div>
            <StatusPill tone={plan.active ? 'success' : 'neutral'}>
              {plan.active ? 'Ativo' : 'Inativo'}
            </StatusPill>
          </Head>
          {plan.description && <Description>{plan.description}</Description>}
        </Card>
      ))}

      <Card>
        <CardLabel>Assinaturas ({activeCount} ativa(s))</CardLabel>
        <List>
          {demoSubscriptions.map((subscription) => {
            const student = findStudent(subscription.studentId)
            const plan = findPlan(subscription.planId)
            return (
              <Row key={subscription.id}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Name>{student?.fullName ?? 'Aluna'}</Name>
                  <br />
                  <PlanLabel>{plan?.name ?? '—'}</PlanLabel>
                </div>
                <SubscriptionStatusPill status={subscription.status} />
              </Row>
            )
          })}
        </List>
        <Note>
          O status muda apenas pela confirmação do provedor de pagamento. Não há confirmação
          manual pela interface — isso evita marcar como paga uma assinatura que não foi.
        </Note>
      </Card>

      <Button type="button" $variant="ghost" $block disabled>
        Editar planos (em breve)
      </Button>
    </PortalPage>
  )
}
