function atualizaContador(){
    contadorSpan1 = document.getElementById('contadorSpan1');
    contadorSpan2 = document.getElementById('contadorSpan2');

    contadorSpan1.textContent = arrayOfCoringa[pIdCoringa1].QtdAtivacoes;
    contadorSpan2.textContent = arrayOfCoringa[pIdCoringa2].QtdAtivacoes;   
}

function addPontos(pImagem) {
    arrayOfCoringa[pImagem.value].QtdAtivacoes++; 
    
    pImagem.style.border = "4px solid red";

    atualizaContador();

    CalculaPontuacao(); 
}

function CalculaPontuacao(){
    totalCalculo = 1;

    totalCalculo = parseFloat(document.querySelector('input[name="hand"]:checked').value);
        
    //Dois coringas são de somar
    if ((arrayOfCoringa[pIdCoringa1].EhMult == false) && (arrayOfCoringa[pIdCoringa2].EhMult == false)){
        totalCalculo += arrayOfCoringa[pIdCoringa1].ValorBase * arrayOfCoringa[pIdCoringa1].QtdAtivacoes;
        totalCalculo += arrayOfCoringa[pIdCoringa2].ValorBase * arrayOfCoringa[pIdCoringa2].QtdAtivacoes;
    } 
    //Primeiro coringa é soma, segundo é mult
    else if ((arrayOfCoringa[pIdCoringa1].EhMult == false) && (arrayOfCoringa[pIdCoringa2].EhMult == true)){
        totalCalculo += arrayOfCoringa[pIdCoringa1].ValorBase * arrayOfCoringa[pIdCoringa1].QtdAtivacoes;
        if (arrayOfCoringa[pIdCoringa2].QtdAtivacoes > 0){
            totalCalculo = totalCalculo * arrayOfCoringa[pIdCoringa2].ValorBase * arrayOfCoringa[pIdCoringa2].QtdAtivacoes;
        }
    }   
    //Segunda coringa é soma, primeiro é mult
    else if ((arrayOfCoringa[pIdCoringa2].EhMult == false) && (arrayOfCoringa[pIdCoringa1].EhMult == true)){
        totalCalculo += arrayOfCoringa[pIdCoringa2].ValorBase * arrayOfCoringa[pIdCoringa2].QtdAtivacoes;
        if (arrayOfCoringa[pIdCoringa1].QtdAtivacoes > 0){
            totalCalculo = totalCalculo * arrayOfCoringa[pIdCoringa1].ValorBase * arrayOfCoringa[pIdCoringa1].QtdAtivacoes;
        }
    }   
    //Dois coringas são mult
    else if ((arrayOfCoringa[pIdCoringa2].EhMult == true) && (arrayOfCoringa[pIdCoringa1].EhMult == true)){
        if (arrayOfCoringa[pIdCoringa1].QtdAtivacoes > 0){
            totalCalculo = totalCalculo * arrayOfCoringa[pIdCoringa1].ValorBase * arrayOfCoringa[pIdCoringa1].QtdAtivacoes;
        }

        if (arrayOfCoringa[pIdCoringa2].QtdAtivacoes > 0){
            totalCalculo = totalCalculo * arrayOfCoringa[pIdCoringa2].ValorBase * arrayOfCoringa[pIdCoringa2].QtdAtivacoes;
        }
    }  


    if(jogador1Selecionado) {
        document.getElementById("valorEntrada").value = totalCalculo;
    } else {
        document.getElementById("valorEntrada2").value = totalCalculo;
    }  
}

function setJogador(pJog){
   jogador1Selecionado = pJog;
   
   PintaEditJogadorSelcionado(pJog);
}

function adicionarNumero(numero) {
    
    if(jogador1Selecionado) {
     document.getElementById("valorEntrada").value += numero;
    } else {
    document.getElementById("valorEntrada2").value += numero;
    }
}


function excluir (){
    ResetaCoringas();

  if(jogador1Selecionado) {
    document.getElementById("valorSoma").value = 0;
   } else {
       document.getElementById("valorSoma2").value = 0;
   }
}

function excluir2 (){
    ResetaCoringas();
    
   if (jogador1Selecionado) {
      document.getElementById("valorEntrada").value = ""; 
      
   } else {
        document.getElementById("valorEntrada2").value = "";
   }
}

function ResetaCoringas(){
    document.getElementById("coringaFrame1").style.border = ""; 
    document.getElementById("coringaFrame2").style.border = ""; 
    arrayOfCoringa[pIdCoringa1].QtdAtivacoes = 0;
    arrayOfCoringa[pIdCoringa2].QtdAtivacoes = 0;
    contadorSpan1.textContent = 0;
    contadorSpan2.textContent = 0; 

    document.getElementById("valorEntrada").value = ""; 
    document.getElementById("valorEntrada2").value = ""; 
}

function adicionar() {
    var total = 0;

    if (jogador1Selecionado){
        var entrada = parseFloat(document.getElementById("valorEntrada").value);
    } else {
        var entrada = parseFloat(document.getElementById("valorEntrada2").value);
    }
    
    if (!isNaN(entrada)) {
        if(jogador1Selecionado){
            total = parseFloat(document.getElementById("valorSoma").value);
        total = total + entrada;
            document.getElementById("valorSoma").value = total;
        } else {
            total = parseFloat(document.getElementById("valorSoma2").value);
            total = total + entrada;
            document.getElementById("valorSoma2").value = total;
        }
       
        document.getElementById("valorEntrada").value = "";
        document.getElementById("valorEntrada2").value = "";

        ResetaCoringas();
    } else {
        alert("Por favor, digite um número válido.");
    }
}

function cancelar() {
    document.getElementById("valorEntrada").value = 0;
}

function getRandomIndex(indices) {
    const randomIndex = Math.floor(Math.random() * indices.length);
    return indices.splice(randomIndex, 1)[0];
}

function atualizaIndicadorMult(){
    indicadorMult1 = document.getElementById('indicadorMult1');
    if (arrayOfCoringa[pIdCoringa1].EhMult) {
        pOperacao = "X";
    } else {
        pOperacao = "+";    
    }
    indicadorMult1.textContent = pOperacao + " " + arrayOfCoringa[pIdCoringa1].ValorBase;

    indicadorMult2 = document.getElementById('indicadorMult2');
    if (arrayOfCoringa[pIdCoringa2].EhMult) {
        pOperacao = "X";
    } else {
        pOperacao = "+";    
    }
    indicadorMult2.textContent = pOperacao + " " + arrayOfCoringa[pIdCoringa2].ValorBase;
}

function SortCoringas() {   
    pasta = 'https://viniciusbemfica.github.io/Cartas/';

    // Número total de imagens disponíveis na pasta
    const totalImagens = 12;

    // Lista de índices de imagens disponíveis
    let indicesDisponiveis = Array.from({ length: totalImagens }, (_, i) => i + 1);

    // Gerar dois números aleatórios entre 1 e o total de imagens
    const random1 = getRandomIndex(indicesDisponiveis);
    const random2 = getRandomIndex(indicesDisponiveis);

    pIdCoringa1 = random1;
    pIdCoringa2 = random2;

    // Criar o caminho para as imagens aleatórias
    const caminhoImagem1 = `${pasta}${random1}.jpg`;
    const caminhoImagem2 = `${pasta}${random2}.jpg`;

    // Atualizar as imagens no HTML
    document.getElementById('imagem1').src = caminhoImagem1;
    document.getElementById('imagem2').src = caminhoImagem2;

    // document.getElementById("imagem1").value = pIdCoringa1;
    // document.getElementById("imagem2").value = pIdCoringa2;
    document.getElementById("coringaFrame1").value = pIdCoringa1;
    document.getElementById("coringaFrame2").value = pIdCoringa2;

    ResetaCoringas();
    atualizaIndicadorMult();
    atualizaContador(); 
    AtualizaTopDaMesa();
    AtualizaInfosConringas();   
}

function AtualizaInfosConringas(){   
    document.getElementById("InforNomeCoringa1").textContent = arrayOfCoringa[pIdCoringa1].Nome;
    document.getElementById("InforNomeCoringa2").textContent = arrayOfCoringa[pIdCoringa2].Nome;
    document.getElementById("InforCoringa1").textContent = arrayOfCoringa[pIdCoringa1].Descricao;
    document.getElementById("InforCoringa2").textContent = arrayOfCoringa[pIdCoringa2].Descricao;   
}

function AtualizaTopDaMesa(){
    var vTexto = '';
    var vCookieString = getCookie("CookieLog"); 
    var {maiorPontuacao, vTotalLinhasMesa} = MaiorPontuacaoETotalJogos(vCookieString, pIdCoringa1, pIdCoringa2);

    vTexto = 'Top da Mesa: ' + maiorPontuacao + ' / Jogos: ' + vTotalLinhasMesa;
    document.getElementById("TopDaMesa").textContent = vTexto;
    
}

function AtualizaCookie() { 
    var vCookieString = getCookie("CookieLog");   
        
    if (vCookieString != "" && vCookieString !== null) {     
        vCookieString = CookieAtualizaLog(vCookieString); 
        setCookie("CookieLog", vCookieString, 30);      
    } else { 
        setCookie("CookieLog", "Inicio;", 30); 
    }    

    AtualizaTopDaMesa();
} 

function getCookie(c_name) {
    return localStorage.getItem(c_name);
}

function setCookie(c_name, value, expiredays) {
    return localStorage.setItem(c_name, value);
}

function CookieAtualizaLog(pLogAntes){     
    vAdicionarNoLog =  '\n' + 'C1|' + pIdCoringa1 + '|C2|' + pIdCoringa2 + '|';  

    if (document.getElementById("valorSoma").value > document.getElementById("valorSoma2").value){
        vAdicionarNoLog += 'J1|' + document.getElementById("valorSoma").value;
    } else if (document.getElementById("valorSoma2").value > document.getElementById("valorSoma").value) {
        vAdicionarNoLog += 'J2|' + document.getElementById("valorSoma2").value;       
    } else {
        vAdicionarNoLog += 'EMP|' + document.getElementById("valorSoma").value;    
    }

    vLogNovo = pLogAntes + vAdicionarNoLog + ';';

    return vLogNovo;
}

function ExibeCookie(){
    var vCookieString = getCookie("CookieLog"); 

    var {maiorPontuacao, vTotalLinhasMesa, vTotalLinhas, vMaiorPontuacaoGeral} = MaiorPontuacaoETotalJogos(vCookieString, pIdCoringa1, pIdCoringa2);

    vMelhorDaMesa = "Mesas Jogadas com esses Coringas: " + vTotalLinhasMesa + '\n' +
                    "Maior Pontuação: " + maiorPontuacao + '\n' +
                    "Maior Pontuação Geral: " + vMaiorPontuacaoGeral + '\n' +
                    "Total Mesas Jogadas: " + vTotalLinhas;

    alert(vMelhorDaMesa);
}

function PintaEditJogadorSelcionado(pJogador){
    if (pJogador == 1){
        document.getElementById("valorEntrada").style.border = "4px solid red";
        document.getElementById("valorEntrada2").style.border = "";
    } else {
        document.getElementById("valorEntrada2").style.border = "4px solid red";
        document.getElementById("valorEntrada").style.border = "";
    }  
}

function openFullscreen() {  
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari e Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }   
}


function MaiorPontuacaoETotalJogos(vCookieString, pIdCoringa1, pIdCoringa2) {
    // Divide o texto em linhas
    var linhas = vCookieString.split(";");
    var vTotalLinhas = linhas.length;
    var vTotalLinhasMesa = 0;

    // Inicializa a variável para armazenar a maior pontuação e o jogador correspondente
    var maiorPontuacao = 0;
    var vMaiorPontuacaoGeral =0;

    // Itera sobre cada linha
    for (var i = 0; i < linhas.length; i++) {
        // Divide a linha em elementos separados
        var elementos = linhas[i].split("|");

        // Inicializa as variáveis para armazenar as pontuações dos Coringas e o jogador correspondente
        var pontuacao = 0;

        // Itera sobre os elementos para encontrar as pontuações dos Coringas e o jogador correspondente
        
        if ((elementos[1] == pIdCoringa1) && (elementos[3] == pIdCoringa2) || (elementos[1] == pIdCoringa2) && (elementos[3] == pIdCoringa1)) {
            pontuacao = parseInt(elementos[5], 10);
            vTotalLinhasMesa++;
        }  
        
        // Verifica se há uma pontuação válida para ambos os Coringas
        if (pontuacao > maiorPontuacao) {
            maiorPontuacao = pontuacao;
        } 

        vPontuacaoGeral = parseInt(elementos[5], 10);
        if (vPontuacaoGeral > vMaiorPontuacaoGeral) {
            vMaiorPontuacaoGeral = vPontuacaoGeral;
        } 
    }

    
    // Retorna um objeto contendo a maior pontuação e o jogador correspondente
    return {maiorPontuacao: maiorPontuacao, vTotalLinhasMesa: vTotalLinhasMesa, vTotalLinhas: vTotalLinhas, vMaiorPontuacaoGeral: vMaiorPontuacaoGeral};
}