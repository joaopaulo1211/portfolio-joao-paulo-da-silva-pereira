# 💊 Canal de Pedidos de Farmácia: Sistema de Separação e Conferência

![GitHub language count](https://img.shields.io/github/languages/count/joaopaulo1211/portfolio-joao-paulo-da-silva-pereira?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-Sprint_1-blue?style=for-the-badge&logo=postgresql)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)

## 📝 Descrição do Projeto
Este projeto consiste no levantamento de requisitos e modelagem de um sistema especializado no processo de **separação (picking)** e **conferência** de pedidos de delivery farmacêutico. O foco central é a mitigação de erros humanos na coleta de medicamentos e a garantia de conformidade com as normas da ANVISA e legislações vigentes, como a **Portaria 344/98** e a **RDC 44/2009**.

O artefato principal é a **Descrição do Minimundo (Versão 1.1)**, desenvolvida para a disciplina de Banco de Dados, servindo como fundação lógica para a futura implementação de um esquema relacional robusto.



## 🛠️ Tecnologias e Metodologias
* **Disciplina:** Banco de Dados (Sprint 1).
* **Metodologia:** Desenvolvimento Ágil com entregas iterativas.
* **Artefatos:** Documentação de Minimundo e Levantamento Preliminar de Entidades.
* **Compliance Regulatória:** Modelagem orientada por regras de negócio rígidas para medicamentos controlados e intercambialidade.

## 📊 Estrutura do Sistema (Minimundo)
O escopo foi delimitado em 7 processos críticos para garantir a **rastreabilidade** e a **integridade dos dados**:

### Processos Mapeados:
* **Notificação e Atribuição:** Entrada do pedido no pipeline de separação com alerta visual em tempo real.
* **Coleta Guiada:** Indicação da localização física exata (corredor/prateleira) para reduzir o tempo de resposta.
* **Validação por Código de Barras:** Sistema de checagem obrigatória para garantir que o item separado corresponde ao pedido.
* **Fluxo de Aprovação Técnica:** Segregação automática de itens que exigem receita para análise e aprovação digital do farmacêutico.
* **Gestão de Itens Faltantes:** Função para seleção de itens alternativos e documentação de trocas.

### Matriz de Responsabilidades (Atores):
| Ator | Responsabilidade Principal |
| :--- | :--- |
| **Balconista** | Separação física, bipagem de produtos e embalagem final conforme checklist. |
| **Farmacêutico** | Auditoria técnica de receituários e liberação legal de substâncias controladas. |

## 🚀 Resultados e Aprendizados
* **Escopo Blindado:** A definição clara do que o sistema *não* faz (pagamentos, roteirização) permitiu focar na especialização da separação técnica.
* **Modelagem de Entidades:** Identificação de entidades fundamentais como **Registro de Validação**, que vincula profissional, produto e data para fins de auditoria técnica.
* **Mapeamento Logístico:** Integração da localização de estoque (corredor/seção) diretamente no fluxo de dados do pedido.

## 🔧 Como Consultar
1. Navegue até o diretório correspondente no repositório.
2. O documento de consolidação dos artefatos 01 e 02 (PDF) contém o levantamento completo de requisitos e entidades.

---
**Grupo de Desenvolvimento:** Marcelo Fagundes, Gabriel Tino, João Paulo, Henry William, Ítalo Santos, Rodrigo Lemos.

[⬅ Voltar ao Portfólio Principal](https://github.com/joaopaulo1211/portfolio-joao-paulo-da-silva-pereira)
