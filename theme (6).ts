# Guia de Distribuição - InspecionAI

Este documento fornece instruções detalhadas para gerar e distribuir o InspecionAI para que outras pessoas possam usar a videoconferência.

## Opção 1: Usar Expo Go (Teste Rápido - Mesma Rede)

### Para Você (Desenvolvedor)

1. **Inicie o servidor de desenvolvimento**:
   ```bash
   pnpm dev
   ```

2. **Escaneie o QR code** com Expo Go no seu dispositivo

3. **Compartilhe o QR code** com outras pessoas que estejam **na mesma rede Wi-Fi**

### Para Outras Pessoas

1. **Instale Expo Go** (gratuito):
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Escaneie o QR code** que você compartilhou

3. **Pronto!** O app abrirá automaticamente

**Limitação**: Funciona apenas enquanto o servidor de desenvolvimento estiver rodando e todos estiverem na mesma rede Wi-Fi.

---

## Opção 2: Gerar APK para Distribuição Real (Recomendado)

### Método A: Usando EAS Build (Recomendado - Automático)

EAS Build é o serviço oficial da Expo que compila seu app na nuvem.

#### Pré-requisitos

1. **Crie uma conta Expo** (gratuita):
   - Acesse https://expo.dev
   - Clique em "Sign Up"
   - Preencha seus dados

2. **Instale EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

3. **Faça login**:
   ```bash
   eas login
   ```
   - Insira seu email e senha da Expo

#### Gerar APK

1. **Execute o build**:
   ```bash
   eas build --platform android --release
   ```

2. **Aguarde a compilação** (leva ~10-15 minutos)

3. **Baixe o APK**:
   - Você receberá um link para baixar o APK
   - Ou acesse https://expo.dev/dashboard para ver seus builds

4. **Compartilhe o APK**:
   - Envie o arquivo `.apk` para outras pessoas
   - Elas podem instalar diretamente no Android

#### Instalar o APK

**Para os Usuários**:

1. **Ativar instalação de fontes desconhecidas** (Android):
   - Configurações → Segurança → Fontes desconhecidas → Ativar

2. **Baixar o APK** do link que você compartilhou

3. **Abrir o arquivo APK** para instalar

4. **Pronto!** O app estará instalado e pode ser usado offline

---

### Método B: Build Local (Avançado - Requer Android SDK)

Se você quiser compilar localmente sem usar EAS:

#### Pré-requisitos

- **Android Studio** instalado
- **Android SDK** configurado
- **Java Development Kit (JDK)** 11 ou superior

#### Passos

1. **Prepare o projeto**:
   ```bash
   cd /home/ubuntu/inspecionai-mobile
   pnpm install
   ```

2. **Gere o APK**:
   ```bash
   eas build --platform android --local
   ```

   Ou, se preferir usar Gradle diretamente:
   ```bash
   npx expo prebuild --platform android --clean
   cd android
   ./gradlew assembleRelease
   ```

3. **O APK será gerado em**:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

4. **Compartilhe o arquivo** com outras pessoas

---

## Opção 3: Publicar na Google Play Store

Para distribuição profissional e permanente:

### Pré-requisitos

1. **Conta Google Play Developer** ($25 - única vez)
2. **Keystore assinado** para o app
3. **Informações de privacidade e termos**

### Passos

1. **Configure a assinatura**:
   ```bash
   eas build --platform android --release
   ```

2. **Siga o assistente** do EAS para configurar assinatura

3. **Envie para Google Play**:
   ```bash
   eas submit --platform android --latest
   ```

4. **Aguarde aprovação** (geralmente 2-4 horas)

5. **Seu app estará disponível** para download na Google Play Store

---

## Compartilhando com Outras Pessoas

### Método 1: Link Direto (Mais Simples)

1. **Gere o APK** usando um dos métodos acima
2. **Faça upload** em um serviço de compartilhamento:
   - Google Drive
   - Dropbox
   - WeTransfer
   - GitHub Releases

3. **Compartilhe o link** com as pessoas

### Método 2: QR Code para APK

1. **Gere um QR code** do link do APK:
   - Use https://www.qr-code-generator.com/
   - Insira o URL do APK

2. **Imprima ou compartilhe** o QR code

3. **Outras pessoas escaneiam** e baixam automaticamente

### Método 3: Código de Inspeção Compartilhado

Após instalar o app, para participar de uma videoconferência:

1. **Você (Auditor)** insere um código de inspeção (ex: `AUDIT-2024-001`)
2. **Você compartilha o código** com os participantes
3. **Eles inserem o mesmo código** no app deles
4. **Todos entram na mesma conferência** automaticamente

---

## Testando a Videoconferência

### Teste Local (Mesma Rede)

1. **Abra o app em 2 dispositivos** (ou emulador + dispositivo real)
2. **Ambos inserem o mesmo código** (ex: `TEST-001`)
3. **Cliquem em "Entrar na Videoconferência"**
4. **Ambos devem ver a interface do Jitsi Meet**

### Teste Remoto (Diferentes Redes)

1. **Uma pessoa instala o APK** em outro dispositivo
2. **Ambas inserem o mesmo código**
3. **Ambas clicam em "Entrar na Videoconferência"**
4. **A videoconferência funciona** via internet pública

---

## Troubleshooting

### "Falha ao instalar APK"

**Problema**: Erro ao instalar o arquivo `.apk`

**Soluções**:
1. Verifique se "Fontes desconhecidas" está ativada
2. Tente baixar novamente o APK
3. Verifique espaço disponível no dispositivo

### "Videoconferência não funciona"

**Problema**: A tela de conferência fica em branco

**Soluções**:
1. Verifique conexão de internet
2. Tente novamente com outro código de inspeção
3. Reinicie o app

### "Câmera/Microfone não funcionam"

**Problema**: Permissões não são concedidas

**Soluções**:
1. Verifique permissões em Configurações → Apps → InspecionAI
2. Ative "Câmera" e "Microfone"
3. Reinicie o app

---

## Próximos Passos

Após distribuir o app, considere:

1. **Criar um servidor de validação** para códigos de inspeção
2. **Implementar histórico de conferências** com armazenamento em nuvem
3. **Adicionar autenticação de usuários** para rastrear auditores
4. **Configurar notificações push** para alertar sobre novas inspeções

---

## Suporte

Para dúvidas sobre distribuição:

- **Expo Docs**: https://docs.expo.dev/build/setup/
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **Google Play Console**: https://play.google.com/console

---

**Versão**: 1.0  
**Data**: Maio de 2026  
**Desenvolvido por**: Manus AI
