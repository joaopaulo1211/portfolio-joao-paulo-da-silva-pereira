# Design do InspecionAI

## Visão Geral

InspecionAI é um aplicativo profissional de auditoria e inspeção técnica remota com foco em usabilidade em ambientes desafiadores (canteiros de obras, salas de servidores). O design segue princípios minimalistas com paleta de cores em azul escuro e branco para garantir alto contraste e legibilidade em ambientes externos.

## Paleta de Cores

| Elemento | Cor | Hex | Uso |
|----------|-----|-----|-----|
| Primária | Azul Escuro | #001F3F | Botões principais, headers, destaques |
| Secundária | Azul Claro | #0074D9 | Links, ações secundárias |
| Fundo | Branco | #FFFFFF | Background principal |
| Fundo Escuro | Cinza Escuro | #1A1A1A | Background em modo dark |
| Texto Primário | Preto | #000000 | Texto em fundo claro |
| Texto Secundário | Cinza Médio | #666666 | Texto secundário, labels |
| Borda | Cinza Claro | #E0E0E0 | Separadores, bordas |
| Sucesso | Verde | #2ECC40 | Status de conexão, confirmações |
| Erro | Vermelho | #FF4136 | Erros, desconexão |

## Screens

### 1. Home (Tela Principal)

**Objetivo:** Permitir que o usuário insira o código de inspeção e inicie uma videoconferência.

**Conteúdo:**
- Logo do InspecionAI (topo, centralizado)
- Título: "InspecionAI"
- Subtítulo: "Auditoria Remota Inteligente"
- Campo de texto: "Código de Inspeção" (placeholder: "Ex: AUDIT-2024-001")
- Botão primário: "Entrar na Videoconferência" (azul escuro, full-width)
- Rodapé: Versão do app e status de conectividade

**Layout:**
- Orientação: Portrait (9:16)
- Espaçamento: 24px padding horizontal
- Tipografia: Roboto ou Inter (sans-serif, legível)
- Botão: 56px altura, border-radius 12px

### 2. Video Conference (Tela de Videoconferência)

**Objetivo:** Exibir a videoconferência Jitsi Meet em fullscreen com controles básicos.

**Conteúdo:**
- Jitsi Meet WebView (fullscreen)
- Botão flutuante para sair da chamada (canto inferior direito)
- Indicador de status de conexão (topo)

**Layout:**
- Fullscreen com SafeArea respeitada
- Botão de saída com ícone (X ou seta para trás)

### 3. Settings (Tela de Configurações)

**Objetivo:** Permitir ajustes de permissões e preferências.

**Conteúdo:**
- Permissões de câmera e microfone
- Preferência de tema (claro/escuro)
- Informações do app (versão, desenvolvedor)

## Fluxos de Usuário

### Fluxo Principal: Iniciar Inspeção

1. Usuário abre o app → Home screen
2. Usuário insere o código de inspeção no campo de texto
3. Usuário toca no botão "Entrar na Videoconferência"
4. App valida o código (não vazio)
5. App abre a tela de videoconferência com Jitsi Meet
6. Usuário participa da chamada
7. Usuário toca no botão de saída para retornar à Home

### Fluxo Secundário: Gerenciar Permissões

1. Usuário abre Settings
2. Usuário ativa/desativa permissões de câmera e microfone
3. App solicita permissões nativas do SO
4. Usuário retorna à Home

## Tipografia

- **Título Principal:** 32px, bold, azul escuro
- **Subtítulo:** 16px, regular, cinza médio
- **Label de Campo:** 14px, medium, preto
- **Texto de Campo:** 16px, regular, preto
- **Botão:** 16px, semibold, branco
- **Texto Pequeno:** 12px, regular, cinza médio

## Componentes Reutilizáveis

1. **PrimaryButton** - Botão azul escuro com feedback visual
2. **TextInput** - Campo de entrada com label e validação
3. **StatusIndicator** - Indicador de conexão (online/offline)
4. **SafeAreaContainer** - Wrapper para SafeArea em todas as telas

## Princípios de Design

1. **Minimalismo:** Apenas elementos essenciais na tela
2. **Alto Contraste:** Azul escuro e branco garantem legibilidade em ambientes externos
3. **Feedback Visual:** Todos os botões têm estados (normal, pressed, disabled)
4. **Acessibilidade:** Tamanho mínimo de toque 48x48px, contraste WCAG AA
5. **Profissionalismo:** Design corporativo, sem elementos lúdicos
