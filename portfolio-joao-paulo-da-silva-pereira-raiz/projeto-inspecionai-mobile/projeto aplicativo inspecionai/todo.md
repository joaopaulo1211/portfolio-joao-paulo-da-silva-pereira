# InspecionAI - TODO

## Features Principais

- [x] Tela de entrada com logo, campo de código de inspeção e botão de ação
- [x] Integração Jitsi Meet SDK
- [x] Fluxo de videoconferência (entrar/sair)
- [x] Paleta de cores azul escuro e branco
- [x] Design minimalista e responsivo
- [x] Permissões de câmera e microfone
- [ ] Tela de configurações (futuro)
- [x] Indicador de status de conexão
- [x] README profissional com instruções de instalação

## Design e UI

- [x] Implementar tema com cores personalizadas (azul escuro #001F3F, branco #FFFFFF)
- [x] Criar componente PrimaryButton
- [x] Criar componente InspectionCodeInput com validação
- [x] Criar componente StatusIndicator
- [x] Gerar logo do InspecionAI
- [x] Atualizar app.config.ts com branding

## Integração Jitsi Meet

- [x] Instalar dependência react-native-webview
- [x] Configurar permissões no app.config.ts
- [x] Implementar componente JitsiMeetView
- [x] Criar fluxo de navegação para videoconferência
- [x] Criar contexto VideoConferenceProvider

## Testes e Validação

- [ ] Testar fluxo de entrada de código
- [ ] Testar integração Jitsi Meet
- [ ] Testar permissões de câmera/microfone
- [ ] Validar design em diferentes tamanhos de tela
- [ ] Testar modo claro e escuro

## Documentação

- [x] Criar README.md profissional
- [x] Documentar estrutura do projeto
- [x] Adicionar instruções de instalação e build
- [x] Criar seção de preview com QR code
- [x] Criar ARCHITECTURE.md com documentação técnica

## Roadmap Futuro

- [ ] Autenticação de usuários com OAuth
- [ ] Histórico de inspeções com armazenamento em nuvem
- [ ] Anotações e marcações durante videoconferência
- [ ] Integração com sistemas de CRM e ERP
- [ ] Suporte para múltiplas câmeras simultâneas
- [ ] Análise de vídeo com IA para detecção de anomalias
- [ ] Modo offline com sincronização posterior
- [ ] Integração com sistemas de notificação push


## Bugs Reportados

- [x] Videoconferência não funciona em web (fallback incorreto)


## Distribuição e Deploy

- [x] Gerar APK para teste com outras pessoas (guia criado)
- [x] Criar link de compartilhamento público para QR code (documentado)
- [x] Documentar processo de compartilhamento (DISTRIBUIÇÃO.md)
