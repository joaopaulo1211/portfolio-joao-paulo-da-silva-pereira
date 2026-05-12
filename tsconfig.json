🔳 QRCODE CHANGE
📝 Descrição do Projeto
Este projeto consiste em um gerador profissional de QR codes com backgrounds estéticos gerados por inteligência artificial. O objetivo principal é permitir que o usuário crie QR codes altamente personalizados a partir de um prompt de "vibe", definindo cores, estilo visual (quadrados ou pontos), tamanho, nível de correção de erro e logo central.
Desenvolvido com React 19 + TypeScript + Vite, o sistema integra a API Gemini AI para geração de imagens de fundo e o Firebase (Auth + Firestore) para autenticação de usuários e armazenamento do histórico de QR codes gerados. O projeto está hospedado no Google AI Studio.
Figura 1: Dashboard principal do sistema exibindo o gerador de QR codes com background gerado por IA.
🚀 Tecnologias Utilizadas

Linguagem: TypeScript 5.8
Bibliotecas: React 19, qrcode.react, @google/genai, Firebase 12, lucide-react, motion, Tailwind CSS 4
Ferramentas: Vite 6, Google AI Studio, Firebase Auth, Firestore

📊 Resultados e Aprendizados
O projeto entrega uma experiência completa de criação, personalização e gerenciamento de QR codes com IA integrada.

Geração de backgrounds com IA: O usuário descreve uma "vibe" em texto e a API Gemini gera uma imagem de fundo personalizada para o QR code em tempo real.
Personalização completa: Configuração de cores (fgColor, bgColor), tamanho em pixels, nível de correção de erro (L/M/Q/H), estilo visual (squares/dots), margem e logo central.
Histórico autenticado: QR codes salvos ficam armazenados no Firestore vinculados à conta do usuário via Firebase Auth, com suporte a deleção e recuperação.

Figura 2: Painel de design com opções de personalização e prévia em tempo real do QR code.
🔧 Como Executar

Clone o repositório.
Instale as dependências: npm install.
Configure a variável GEMINI_API_KEY no arquivo .env.local.
Execute o comando: npm run dev.

Figura 3: Fluxo do pipeline — entrada de texto e vibe → Gemini AI gera background → QR code renderizado e salvo no Firestore.
