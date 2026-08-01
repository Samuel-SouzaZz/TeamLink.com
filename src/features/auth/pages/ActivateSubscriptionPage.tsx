import { Link, useSearchParams } from 'react-router-dom'
import { Check, ShieldCheck } from 'lucide-react'
import styled from 'styled-components'

import { Button, Card } from '../../../components/portal'
import { formatPrice } from '../../../lib/datetime'
import { demoPlans } from '../../../lib/demo-data'
import { AuthScreen } from './AuthScreen'

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const PlanName = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
`

const Price = styled.p`
  margin: 4px 0 0;
  font-family: ${({ theme }) => theme.typography.fontHeading};
  font-size: ${({ theme }) => theme.typography.size['2xl']};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.accent};

  span {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.size.sm};
    font-weight: ${({ theme }) => theme.typography.weight.normal};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const Description = styled.p`
  margin: 8px 0 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Steps = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  counter-reset: step;
`

const Step = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};

  &::before {
    counter-increment: step;
    content: counter(step);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: rgba(180, 255, 80, 0.14);
    border: 1px solid rgba(180, 255, 80, 0.35);
    color: ${({ theme }) => theme.colors.accent};
    font-size: 0.75rem;
    font-weight: ${({ theme }) => theme.typography.weight.semibold};
  }
`

const SecurityNote = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const Benefits = styled.ul`
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Benefit = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const BENEFITS = [
  'Duas aulas por semana, terças e quintas às 19h',
  'Turma exclusivamente feminina',
  'Agendamento e histórico pelo portal',
]

/**
 * Ativação da assinatura.
 *
 * O botão de pagamento está desabilitado de propósito: a integração com o
 * PagBank só entra quando houver credenciais, ambiente de sandbox e aprovação.
 * O fluxo previsto está documentado em `docs/payment-integration.md`.
 */
export default function ActivateSubscriptionPage() {
  const [searchParams] = useSearchParams()
  const inviteToken = searchParams.get('convite')
  const plan = demoPlans[0]

  return (
    <AuthScreen
      title="Ativar assinatura"
      subtitle="Confirme seu plano para liberar o acesso ao portal."
    >
      <Stack>
        {!inviteToken && (
          <Card>
            <SecurityNote>
              <ShieldCheck size={18} aria-hidden />
              <span>
                Não há cadastro aberto. O acesso é liberado por convite da Karol — se você ainda
                não recebeu o seu, fale com ela pelo WhatsApp.
              </span>
            </SecurityNote>
          </Card>
        )}

        <Card>
          <PlanName>{plan.name}</PlanName>
          <Price>
            {formatPrice(plan.priceCents)} <span>/ mês</span>
          </Price>
          {plan.description && <Description>{plan.description}</Description>}
          <Benefits>
            {BENEFITS.map((benefit) => (
              <Benefit key={benefit}>
                <Check size={15} aria-hidden />
                <span>{benefit}</span>
              </Benefit>
            ))}
          </Benefits>
        </Card>

        <Card>
          <Steps>
            <Step>Você é direcionada ao ambiente seguro do PagBank.</Step>
            <Step>O pagamento é confirmado diretamente com eles.</Step>
            <Step>Recebemos a confirmação e ativamos sua assinatura.</Step>
            <Step>Você recebe um e-mail para criar sua senha e entrar.</Step>
          </Steps>
        </Card>

        <Button type="button" $block disabled>
          Pagamento em breve
        </Button>

        <SecurityNote>
          <ShieldCheck size={18} aria-hidden />
          <span>
            Nenhum dado de cartão passa por este site. O pagamento acontece inteiramente no
            ambiente do PagBank.
          </span>
        </SecurityNote>

        <SecurityNote>
          <span>
            Já tem conta? <Link to="/login">Entrar</Link>
          </span>
        </SecurityNote>
      </Stack>
    </AuthScreen>
  )
}
