# Automação de Notificação Semanal de Feedbacks

> Solução serverless desenvolvida em Google Apps Script para leitura, consolidação e disparo automático de relatórios semanais de feedbacks com layout HTML responsivo e botões de ação (CTAs).

---

## Objetivo & Contexto de Negócio

* **Problema:** A consolidação e o acompanhamento do volume de feedbacks exigiam verificação manual constante da planilha. A ausência de um alerta ativo fazia com que novos casos acumulassem sem tratativa rápida pelas lideranças e supervisores.
* **Solução:** Criação de um **script automatizado acionado por gatilho temporal (Time-Driven Trigger)**. O script executa toda segunda-feira, analisa a aba de feedbacks consolidados, calcula o volume de novos registros da última carga em relação ao total acumulado e dispara um e-mail formatado em HTML diretamente para a supervisão com links diretos para a planilha e para o formulário de aplicação.

---

## Ferramentas

* **Linguagem & Backend:** [Google Apps Script](Code.gs) (JavaScript Server-Side)
* **Serviços Google:** `SpreadsheetApp`, `MailApp`, `Utilities` (Formatador de Datas)
* **Design de E-mail:** HTML5 inline CSS, UI Cards, Botões de Chamada para Ação (CTAs)
* **Automação:** Gatilhos acionados por tempo (*Time-Driven Triggers / Cron*)

---

## Demonstração Visual

### E-mail de Relatório Recebido na Caixa de Entrada
![Demonstrativo do E-mail Recebido](![E-mail de Relatório](emailimage.png))

---

## Arquitetura do Fluxo

```text
[ Gatilho Temporal (Time-Driven Trigger) - Toda Segunda-feira ]
                              │
                              ▼
        [ Google Apps Script: Leitura da Planilha ]
               ('feedback consolidado')
                              │
                              ▼
     [ Processamento e Filtro de Datas (GMT-3) ]
     • Identificação da última data de carga
     • Contagem de novos casos vs. total acumulado
                              │
                              ▼
        [ Montagem Dinâmica do Template HTML ]
                              │
                              ▼
  [ Disparo Automático de E-mail (MailApp.sendEmail) ]
      (Destinatários: Supervisão | CC: Gestão)
