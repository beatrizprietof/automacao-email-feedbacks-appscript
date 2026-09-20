function enviarNotificacaoFeedbacks() {

  var planilha = SpreadsheetApp.getActiveSpreadsheet();

  var aba = planilha.getSheetByName("feedback consolidado");

  

  if (!aba) {

    Logger.log("Aba 'feedback consolidado' não encontrada.");

    return;

  }



  var urlPlanilha = planilha.getUrl() + "#gid=" + aba.getSheetId();

  // Link fixo do Formulário que você forneceu:

  var urlFormulario = "urlFormulario";

  

  var ultimaLinha = aba.getLastRow();

  if (ultimaLinha < 2) return;



  var dadosDatas = aba.getRange(2, 1, ultimaLinha - 1, 1).getValues();

  

  var datasValidas = [];

  for (var i = 0; i < dadosDatas.length; i++) {

    var valorCelula = dadosDatas[i][0];

    if (valorCelula !== "" && valorCelula !== null && valorCelula !== undefined) {

      var dataFormatada = Utilities.formatDate(new Date(valorCelula), "GMT-3", "dd/MM/yyyy");

      datasValidas.push(dataFormatada);

    }

  }



  if (datasValidas.length === 0) return;



  var ultimaDataCarga = datasValidas[datasValidas.length - 1];

  var novosCasos = datasValidas.filter(function(data) {

    return data === ultimaDataCarga;

  }).length;

  var totalAcumuladoReal = datasValidas.length;



  var dataHoje = Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy");



  // Configurações dos destinatários (Lembre-se de colocar os e-mails reais aqui)

  var meuEmailEmCopia = "seu-email@empresa.com.br"; 

  var emailsSupervisores = "supervisor1@empresa.com.br, supervisor2@empresa.com.br";

  

  var assunto = "📊 [Consolidado] Novos Feedbacks da Semana - " + dataHoje;

  

  // Layout da mensagem ATUALIZADO com dois botões

  var htmlBody = `

    <div style="font-family: Arial, sans-serif; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">

      <h2 style="color: #1a73e8; margin-top: 0;">Relatório de Feedbacks Consolidados</h2>

      <p style="font-size: 13px; color: #666666; margin-bottom: 20px;">Atualização automática em <strong>${dataHoje}</strong></p>

      

      <p>Olá, equipe!</p>

      <p>Os novos casos de feedback foram consolidados e já estão prontos para análise na aba <strong>feedback consolidado</strong>.</p>

      

      <div style="background-color: #f1f3f4; padding: 15px; border-radius: 6px; border-left: 4px solid #1a73e8; margin: 20px 0;">

        <p style="margin: 0; font-size: 14px; line-height: 1.5;">

          📌 <strong>Resumo da última carga (${ultimaDataCarga}):</strong><br>

          • <strong>Novos casos adicionados:</strong> ${novosCasos} casos<br>

          • <strong>Total geral acumulado:</strong> ${totalAcumuladoReal} registros

        </p>

      </div>



      <p>Acesse os links abaixo para visualizar a planilha e preencher o formulário:</p>

      

      <div style="text-align: center; margin: 30px 0;">

        <!-- Botão Planilha -->

        <a href="${urlPlanilha}" style="background-color: #1a73e8; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; margin-bottom: 10px; margin-right: 5px;">

          Abrir Aba de Feedbacks

        </a>

        

        <!-- Botão Formulário -->

        <a href="${urlFormulario}" style="background-color: #34a853; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; margin-bottom: 10px; margin-left: 5px;">

          Acessar Formulário

        </a>

      </div>



      <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;" />

      <p style="font-size: 11px; color: #888888; text-align: center;">Este e-mail é uma notificação automática do Google Sheets.</p>

    </div>

  `;



  var mensagemTexto = "Olá, equipe!\n\nOs novos feedbacks consolidados (" + ultimaDataCarga + ") já estão disponíveis na aba 'feedback consolidado'.\n\nNovos casos: " + novosCasos + "\nTotal acumulado: " + totalAcumuladoReal + "\n\nLink da Planilha: " + urlPlanilha + "\nLink do Formulário: " + urlFormulario;



  MailApp.sendEmail({

    to: emailsSupervisores,

    cc: meuEmailEmCopia,

    subject: assunto,

    body: mensagemTexto,

    htmlBody: htmlBody 

  });

} 

