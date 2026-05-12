 Batalha de Modelos & Engenharia de Prompt (XML)
📝 Descrição do Projeto
Este projeto consiste na construção de um Prompt Estruturado em XML para gerar uma página HTML Single Page com CSS integrado, testado comparativamente em diferentes ferramentas de IA. O objetivo principal é avaliar a capacidade de cada modelo em interpretar e executar instruções técnicas estruturadas, analisando critérios como precisão, criatividade, erros de sintaxe e consumo de tokens.
Desenvolvido como parte da disciplina de Engenharia de Prompt e Aplicações em IA, o projeto submeteu o mesmo prompt XML a sete modelos — ChatGPT, Gemini, DeepSeek, Qwen, Grok, Maritaca e Claude — registrando os resultados em um quadro comparativo analítico.
Figura 1: Dashboard principal do sistema exibindo recomendações personalizadas.
🚀 Tecnologias Utilizadas

Linguagem: HTML5, CSS3
Ferramenta de Prompt: XML estruturado
Modelos Testados: ChatGPT, Gemini, DeepSeek, Qwen, Grok, Maritaca, Claude

📊 Resultados e Aprendizados
O projeto demonstrou diferenças significativas entre os modelos na interpretação de prompts estruturados em XML.

Claude superou todos os modelos em precisão, criatividade e completude do HTML gerado, sendo eleito o melhor para prototipagem e desenvolvimento front-end complexo.
Diferença de tokens: Claude gerou ~27.000 tokens contra uma média de 1.100 a 4.820 dos demais modelos — refletindo diretamente na riqueza do resultado.
Reflexão crítica: Embora Claude tenha inventado algumas informações, foi o único a produzir um site completo, informativo e sem erros de sintaxe identificáveis.

CritérioMelhor ModeloPior ModeloPrecisão do promptClaudeGrokPrecisão do HTMLClaudeGPT / Qwen / GrokCriatividadeClaudeGrokTokens geradosClaude (27.000)Maritaca (1.100)
Figura 2: Análise métrica do desempenho dos modelos.
🔧 Como Executar

Clone o repositório.
Copie o prompt XML disponível no arquivo prompt.xml.
Cole o prompt na ferramenta de IA desejada e compare os resultados.

Figura 3: Representação visual do pipeline de dados.
