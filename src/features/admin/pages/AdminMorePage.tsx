import { Link } from 'react-router-dom'
import {
  ChevronRight,
  ClipboardList,
  ExternalLink,
  ListChecks,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import styled from 'styled-components'

import {
  Button,
  Card,
  CardLabel,
  PageHeading,
  PortalPage,
  StatusPill,
} from '../../../components/portal'
import { useAuth } from '../../auth/AuthContext'

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`

const Item = styled.li`
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  &:last-child {
    border-bottom: none;
  }
`

const itemStyles = `
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 48px;
  padding: 12px 0;
  text-align: left;
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
`

const RowLink = styled(Link)`
  ${itemStyles}
  color: ${({ theme }) => theme.colors.text};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: -2px;
  }
`

const RowStatic = styled.div`
  ${itemStyles}
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: default;
`

const Label = styled.span`
  flex: 1;
  min-width: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
`

const Muted = styled.p`
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`

export default function AdminMorePage() {
  const { user, signOut } = useAuth()

  return (
    <PortalPage>
      <PageHeading title="Mais" subtitle={user?.email ?? undefined} />

      <Card>
        <CardLabel>Gestão</CardLabel>
        <List>
          <Item>
            <RowLink to="/admin/alunas">
              <ClipboardList size={18} aria-hidden />
              <Label>Cadastro de alunas</Label>
              <ChevronRight size={16} aria-hidden />
            </RowLink>
          </Item>
          <Item>
            <RowLink to="/admin/planos">
              <ListChecks size={18} aria-hidden />
              <Label>Planos e assinaturas</Label>
              <ChevronRight size={16} aria-hidden />
            </RowLink>
          </Item>
        </List>
      </Card>

      <Card>
        <CardLabel>Em breve</CardLabel>
        <List>
          <Item>
            <RowStatic>
              <ShieldCheck size={18} aria-hidden />
              <Label>Avaliações físicas</Label>
              <StatusPill tone="neutral">Em breve</StatusPill>
            </RowStatic>
          </Item>
          <Item>
            <RowStatic>
              <ListChecks size={18} aria-hidden />
              <Label>Relatórios de frequência</Label>
              <StatusPill tone="neutral">Em breve</StatusPill>
            </RowStatic>
          </Item>
        </List>
        <Muted>
          Estes módulos dependem de decisões sobre dados sensíveis e retenção, documentadas em
          docs/decisions.md.
        </Muted>
      </Card>

      <Card>
        <CardLabel>Site</CardLabel>
        <List>
          <Item>
            <RowLink to="/">
              <ExternalLink size={18} aria-hidden />
              <Label>Abrir site institucional</Label>
              <ChevronRight size={16} aria-hidden />
            </RowLink>
          </Item>
        </List>
      </Card>

      <Button type="button" $variant="ghost" $block onClick={signOut}>
        <LogOut size={18} aria-hidden />
        Sair da conta
      </Button>
    </PortalPage>
  )
}
