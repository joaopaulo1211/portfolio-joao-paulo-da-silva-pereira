# InspecionAI - Auditoria Remota Inteligente

## Visão Geral

**InspecionAI** é um aplicativo móvel profissional desenvolvido para facilitar auditorias e inspeções técnicas remotas através de videoconferência integrada. O aplicativo resolve um problema crítico em organizações que dependem de auditorias de segurança, conformidade e qualidade: a necessidade de deslocamento de auditores seniores para locais geograficamente distantes. Com o InspecionAI, equipes de auditoria podem conduzir inspeções em tempo real via vídeo, reduzindo custos operacionais, aumentando a frequência de auditorias e melhorando a qualidade do processo.

### Proposta de Valor

O InspecionAI elimina barreiras geográficas e temporais nas operações de auditoria através de:

- **Videoconferência Integrada**: Suporte nativo para Jitsi Meet, permitindo chamadas de vídeo instantâneas sem necessidade de aplicativos adicionais.
- **Usabilidade Profissional**: Interface minimalista e intuitiva, otimizada para ambientes desafiadores como canteiros de obras e salas de servidores.
- **Alto Contraste Visual**: Paleta de cores em azul escuro e branco garante legibilidade em ambientes externos com alta luminosidade.
- **Fluxo Simplificado**: O usuário insere um código de inspeção e entra instantaneamente na videoconferência, sem configurações complexas.
- **Escalabilidade**: Arquitetura baseada em React Native permite deployment em iOS e Android com base de código única.

## Tecnologias

O InspecionAI foi desenvolvido utilizando as seguintes tecnologias:

| Tecnologia | Versão | Propósito |
|------------|--------|----------|
| **React Native** | 0.81.5 | Framework para desenvolvimento mobile cross-platform |
| **Expo** | 54.0.29 | Plataforma de desenvolvimento e distribuição para React Native |
| **TypeScript** | 5.9 | Linguagem tipada para maior segurança e manutenibilidade |
| **Jitsi Meet** | Pública | SDK de videoconferência integrado via WebView |
| **NativeWind** | 4.2.1 | Tailwind CSS para React Native, permitindo styling consistente |
| **Expo Router** | 6.0.19 | Roteamento baseado em arquivo para navegação |
| **React Query** | 5.90.12 | Gerenciamento de estado e sincronização de dados |
| **Manus AI** | - | Plataforma de desenvolvimento e deployment |

### Arquitetura

O projeto segue uma arquitetura modular com separação clara de responsabilidades:

```
inspecionai-mobile/
├── app/                          # Rotas e telas principais
│   ├── _layout.tsx              # Layout raiz com providers
│   ├── (tabs)/                  # Telas com tab bar
│   │   ├── _layout.tsx          # Configuração de tabs
│   │   └── index.tsx            # Tela de entrada (home)
│   └── conference.tsx           # Tela de videoconferência
├── components/                   # Componentes reutilizáveis
│   ├── ui/                      # Componentes de UI
│   │   ├── primary-button.tsx   # Botão primário
│   │   ├── inspection-code-input.tsx  # Campo de entrada
│   │   ├── status-indicator.tsx # Indicador de status
│   │   └── icon-symbol.tsx      # Mapeamento de ícones
│   ├── jitsi-meet-view.tsx      # Componente Jitsi Meet
│   └── screen-container.tsx     # Wrapper com SafeArea
├── lib/                          # Lógica compartilhada
│   ├── video-conference-context.tsx  # Contexto de conferência
│   ├── theme-provider.tsx       # Provider de tema
│   └── utils.ts                 # Funções utilitárias
├── hooks/                        # Custom hooks
│   ├── use-colors.ts            # Hook para cores do tema
│   └── use-color-scheme.ts      # Hook para modo claro/escuro
├── constants/                    # Constantes da aplicação
│   └── theme.ts                 # Configuração de cores
├── assets/                       # Recursos estáticos
│   └── images/                  # Ícones e imagens
├── theme.config.js              # Configuração de paleta Tailwind
├── tailwind.config.js           # Configuração Tailwind CSS
├── app.config.ts                # Configuração Expo
└── package.json                 # Dependências do projeto
```

## Instalação e Configuração

### Pré-requisitos

Antes de iniciar, certifique-se de que os seguintes requisitos estão instalados:

- **Node.js**: Versão 18 ou superior
- **pnpm**: Gerenciador de pacotes (versão 9.12.0 ou superior)
- **Expo CLI**: Instalado globalmente (`npm install -g expo-cli`)
- **Git**: Para controle de versão

### Passo a Passo

#### 1. Clonar o Repositório

```bash
git clone <repository-url>
cd inspecionai-mobile
```

#### 2. Instalar Dependências

```bash
pnpm install
```

#### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (se necessário):

```env
EXPO_PUBLIC_API_URL=http://127.0.0.1:3000
```

#### 4. Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

O servidor Metro Bundler iniciará e exibirá um QR code. Você pode:

- **Escanear o QR code** com o Expo Go (disponível em iOS App Store e Google Play)
- **Abrir em navegador web**: O aplicativo será servido em `http://localhost:8081`
- **Iniciar em Android**: Execute `pnpm android`
- **Iniciar em iOS**: Execute `pnpm ios` (apenas em macOS)

#### 5. Verificar a Saúde do Projeto

```bash
pnpm check
```

Comando verifica tipos TypeScript e identifica erros de compilação.

## Uso do Aplicativo

### Fluxo Principal: Iniciar uma Inspeção

1. **Abrir o Aplicativo**: Inicie o InspecionAI no seu dispositivo.

2. **Tela de Entrada**: Você verá a tela principal com:
   - Logo do InspecionAI (ícone em azul escuro)
   - Título "InspecionAI" e subtítulo "Auditoria Remota Inteligente"
   - Indicador de status (mostrando "Pronto para usar")
   - Campo de entrada para "Código de Inspeção"
   - Botão "Entrar na Videoconferência"

3. **Inserir Código de Inspeção**: Digite o código único fornecido pelo coordenador de auditoria (exemplo: `AUDIT-2024-001`).

4. **Iniciar Videoconferência**: Toque no botão "Entrar na Videoconferência". O aplicativo:
   - Valida o código de inspeção
   - Abre a tela de videoconferência em fullscreen
   - Conecta automaticamente ao Jitsi Meet usando o código como nome da sala

5. **Participar da Inspeção**: Durante a videoconferência você pode:
   - Ativar/desativar câmera e microfone
   - Compartilhar tela (se suportado)
   - Usar chat para comunicação textual
   - Gravar a sessão (se habilitado)

6. **Sair da Conferência**: Toque no botão de saída (X) no canto inferior direito para encerrar a chamada e retornar à tela de entrada.

## Estrutura de Design

### Paleta de Cores

A paleta de cores foi cuidadosamente selecionada para garantir profissionalismo e legibilidade em ambientes desafiadores:

| Elemento | Cor | Hex | Uso |
|----------|-----|-----|-----|
| Primária | Azul Escuro | #001F3F | Botões principais, headers |
| Secundária | Azul Claro | #0074D9 | Links, ações secundárias |
| Fundo | Branco | #FFFFFF | Background principal |
| Fundo Escuro | Cinza Escuro | #1A1A1A | Background em modo dark |
| Texto | Preto/Branco | #000000/#FFFFFF | Texto principal |
| Texto Secundário | Cinza | #666666 | Texto secundário |
| Sucesso | Verde | #2ECC40 | Status positivo |
| Erro | Vermelho | #FF4136 | Status negativo |

### Componentes Principais

O aplicativo utiliza componentes reutilizáveis para manter consistência visual:

- **PrimaryButton**: Botão de ação principal com feedback visual (escala ao pressionar)
- **InspectionCodeInput**: Campo de entrada estilizado com validação
- **StatusIndicator**: Indicador de status de conexão (online/offline/conectando)
- **ScreenContainer**: Wrapper que garante SafeArea e background correto
- **JitsiMeetView**: Componente que integra Jitsi Meet via WebView

## Integração Jitsi Meet

### Como Funciona

O InspecionAI integra o Jitsi Meet, uma solução de videoconferência open-source, através de um componente WebView que carrega a interface web do Jitsi. O fluxo é:

1. **Usuário insere código de inspeção** (ex: `AUDIT-2024-001`)
2. **Aplicativo navega para tela de conferência** passando o código como parâmetro
3. **JitsiMeetView renderiza WebView** com HTML que carrega a API externa do Jitsi
4. **Jitsi Meet inicializa** usando o código como nome da sala
5. **Usuário participa da videoconferência** com câmera, microfone e compartilhamento de tela

### Configurações do Jitsi Meet

O aplicativo configura o Jitsi Meet com as seguintes opções:

```javascript
{
  startWithAudioMuted: false,      // Áudio ativado por padrão
  startWithVideoMuted: false,      // Vídeo ativado por padrão
  disableSimulcast: false,         // Permite múltiplas qualidades
  enableLobbyMode: false,          // Sem sala de espera
  enableWelcomePage: false,        // Pula página de boas-vindas
  enableClosePage: false,          // Sem página de encerramento
}
```

### Instância Pública do Jitsi

O aplicativo utiliza a instância pública do Jitsi Meet (`meet.jit.si`), que não requer autenticação ou configuração de servidor. Isso permite deployment imediato sem infraestrutura adicional.

## Desenvolvimento

### Adicionar Novas Telas

Para adicionar uma nova tela ao aplicativo:

1. **Criar arquivo de tela** em `app/` ou `app/(tabs)/`:
   ```tsx
   import { ScreenContainer } from "@/components/screen-container";
   
   export default function MyScreen() {
     return (
       <ScreenContainer className="p-6">
         {/* Conteúdo da tela */}
       </ScreenContainer>
     );
   }
   ```

2. **Adicionar rota** em `app/_layout.tsx`:
   ```tsx
   <Stack.Screen name="my-screen" />
   ```

3. **Navegar para a tela**:
   ```tsx
   import { useRouter } from "expo-router";
   
   const router = useRouter();
   router.push("/my-screen");
   ```

### Adicionar Novos Componentes

Componentes devem ser criados em `components/` e seguir a estrutura:

```tsx
import { View, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  const colors = useColors();
  
  return (
    <View className="p-4">
      <Text style={{ color: colors.foreground }}>{title}</Text>
    </View>
  );
}
```

### Modificar Tema

O tema é definido em `theme.config.js`. Para modificar cores:

```javascript
const themeColors = {
  primary: { light: '#001F3F', dark: '#001F3F' },
  background: { light: '#FFFFFF', dark: '#1A1A1A' },
  // ... outras cores
};
```

As cores são automaticamente disponibilizadas via hook `useColors()` e Tailwind CSS.

## Build e Distribuição

### Gerar APK (Android)

```bash
eas build --platform android
```

### Gerar IPA (iOS)

```bash
eas build --platform ios
```

### Publicar no Expo

```bash
eas submit --platform android
eas submit --platform ios
```

**Nota**: Estes comandos requerem configuração de conta Expo e certificados de assinatura.

## Preview e Testes

### QR Code para Expo Go

Ao executar `pnpm dev`, um QR code será exibido no terminal. Escaneie-o com o Expo Go para testar o aplicativo em seu dispositivo.

**URL de Preview**: [Será exibida durante o desenvolvimento]

### Testes Manuais Recomendados

- [ ] Inserir código de inspeção válido e iniciar conferência
- [ ] Testar entrada/saída de videoconferência
- [ ] Verificar indicador de status em diferentes estados
- [ ] Testar modo claro e escuro
- [ ] Validar responsividade em diferentes tamanhos de tela
- [ ] Testar permissões de câmera e microfone

## Troubleshooting

### Jitsi Meet não carrega

**Problema**: A tela de videoconferência fica em branco.

**Solução**:
1. Verifique conexão de internet
2. Certifique-se de que `meet.jit.si` está acessível
3. Verifique console de erros (F12 em web)
4. Reinicie o aplicativo

### Câmera/Microfone não funcionam

**Problema**: Permissões de câmera ou microfone não são solicitadas.

**Solução**:
1. Verifique permissões no `app.config.ts`
2. Reinicie o aplicativo
3. Verifique configurações de permissões do dispositivo

### Erro de compilação TypeScript

**Problema**: Erros ao executar `pnpm check`.

**Solução**:
```bash
pnpm check
# Verifique os erros reportados e corrija os tipos
```

## Roadmap Futuro

Melhorias planejadas para versões futuras:

- [ ] Autenticação de usuários com OAuth
- [ ] Histórico de inspeções com armazenamento em nuvem
- [ ] Anotações e marcações durante videoconferência
- [ ] Integração com sistemas de CRM e ERP
- [ ] Suporte para múltiplas câmeras simultâneas
- [ ] Análise de vídeo com IA para detecção de anomalias
- [ ] Modo offline com sincronização posterior
- [ ] Integração com sistemas de notificação push

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Suporte

Para suporte técnico, dúvidas ou reportar bugs:

- **Email**: support@inspecionai.com
- **Issues**: [GitHub Issues]
- **Documentação**: [Wiki do Projeto]

## Créditos

**InspecionAI** foi desenvolvido por **Manus AI** com foco em facilitar auditorias e inspeções técnicas remotas através de tecnologia moderna e design profissional.

### Tecnologias Utilizadas

- [React Native](https://reactnative.dev/) - Framework mobile
- [Expo](https://expo.dev/) - Plataforma de desenvolvimento
- [Jitsi Meet](https://jitsi.org/jitsi-meet/) - Videoconferência
- [NativeWind](https://www.nativewind.dev/) - Styling com Tailwind
- [TypeScript](https://www.typescriptlang.org/) - Linguagem tipada

---

**Versão**: 1.0.0  
**Data de Lançamento**: Maio de 2026  
**Desenvolvido por**: Manus AI

Link : https://manus.im/app-preview/bJRUQzJ77qqQWkRMs4sFEp?sessionId=2yTrQWoWkLSyHbNCVgCIDx
