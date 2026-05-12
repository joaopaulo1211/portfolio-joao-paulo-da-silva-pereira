🤖 Classificador de Distância com IA — Teachable Machine
📝 Descrição do Projeto
Este projeto consiste em um modelo de visão computacional treinado para classificar se um objeto está perto ou longe da câmera em tempo real. O objetivo principal é demonstrar na prática o uso de machine learning acessível, sem necessidade de código, para resolver um problema de classificação visual.
Desenvolvido como parte da disciplina de Engenharia de Prompt e Aplicações em IA, o modelo foi treinado diretamente no navegador utilizando a plataforma Google Teachable Machine, com imagens capturadas via webcam em dois cenários distintos: a garrafa posicionada perto e longe da câmera.
Figura 1: Modelo em produção classificando a garrafa como "longe" — 77% sem gás (longe) vs 23% com gás (perto).
🚀 Tecnologias Utilizadas

Plataforma: Google Teachable Machine
Tipo de modelo: Image Classification (visão computacional)
Input: Webcam em tempo real
Classes treinadas: Garrafa com gás (perto) · Garrafa sem gás (longe)
Hospedagem: teachablemachine.withgoogle.com/models/PlAZeLclF_/

📊 Resultados e Aprendizados
O modelo demonstrou alta precisão na distinção entre os dois cenários treinados.

99% de confiança ao classificar a garrafa posicionada perto da câmera.
77% de confiança ao classificar a garrafa posicionada longe da câmera, com 23% de incerteza — mostrando que distâncias intermediárias geram ambiguidade no modelo.
Aprendizado principal: A qualidade e variedade das amostras de treino impactam diretamente a confiança do modelo — quanto mais variações de ângulo e iluminação, mais robusto o resultado.

Figura 2: Modelo classificando a garrafa como "perto" com 99% de confiança.
🔧 Como Executar

Acesse o modelo publicado: clique aqui.
Permita o acesso à webcam no navegador.
Posicione um objeto perto ou longe da câmera e observe a classificação em tempo real.

Figura 3: Representação visual do pipeline — webcam → modelo treinado → classificação em tempo real.
