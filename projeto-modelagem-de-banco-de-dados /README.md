# 💊 Canal de Pedidos de Farmácia — Sistema de Separação

## 📝 Descrição do Projeto
Este projeto consiste no levantamento e modelagem de um sistema focado no processo de separação e conferência de pedidos de delivery em farmácias. O objetivo principal é aumentar a precisão na coleta de produtos, acelerar a montagem dos pedidos e garantir que medicamentos controlados passem pela devida conferência farmacêutica antes de serem despachados.

Desenvolvido como parte da disciplina de **Banco de Dados (Sprint 1)**, o documento descreve o minimundo do sistema, definindo escopo, atores, processos e entidades que compõem o modelo de dados, com base em requisitos reais do setor farmacêutico — incluindo conformidade com legislação vigente (Portaria 344/98, RDC 44/2009, RDC 471/21, IN 360/25).

*Figura 1: Fluxo principal do sistema — do recebimento do pedido à liberação para entrega.*

## 🚀 Tecnologias Utilizadas
* **Disciplina:** Banco de Dados
* **Artefato:** Descrição do Minimundo (Versão 1.1)
* **Metodologia:** Sprint com entrega iterativa
* **Grupo:** Marcelo Fagundes, Gabriel Tino, João Paulo, Henry William, Ítalo Santos, Rodrigo Lemos

## 📊 Resultados e Aprendizados
O projeto definiu com clareza o escopo e as regras de negócio do sistema, resultando em um minimundo bem delimitado e rastreável.

* **7 processos mapeados:** Notificação → Atribuição → Coleta → Aprovação técnica → Liberação → Gestão de faltantes → Conclusão.
* **8 entidades identificadas:** Pedido, Cliente, Produto, Item Pedido, Colaborador, Posição/Estoque, Registro de Validação e Entrega.
* **Aprendizado principal:** A separação clara entre escopo incluso e excluso é essencial para evitar ambiguidades no modelo de dados — o sistema não cobre pagamento, rota de entrega nem inventário geral.

| Ator | Responsabilidade |
| :--- | :--- |
| Balconista | Separação, checagem por código de barras e embalagem |
| Farmacêutico | Validação de medicamentos controlados e receituários |

*Figura 2: Diagrama de atores e processos principais do sistema.*

## 🔧 Como Executar
1. Clone o repositório.
2. Acesse a documentação na pasta `/docs`.
3. Consulte o arquivo `minimundo_v1.1.pdf` para o levantamento completo de requisitos.

*Figura 3: Representação visual do pipeline de dados — pedido recebido → separação → validação → entrega.*

---
[Voltar ao início](https://github.com/joaopaulo1211)
