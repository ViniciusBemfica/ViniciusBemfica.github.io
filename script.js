

function atualizaContador(pImagem){
    contadorSpan1 = document.getElementById('contadorSpan1');
    contadorSpan2 = document.getElementById('contadorSpan2');

    contadorSpan1.textContent = arrayOfCoringa[pIdCoringa1].QtdAtivacoes;
    contadorSpan2.textContent = arrayOfCoringa[pIdCoringa2].QtdAtivacoes;   
}

function addPontos(pImagem) {
    arrayOfCoringa[pImagem.value].QtdAtivacoes++; 
    
    pImagem.style.border = "4px solid red";

    atualizaContador(pImagem);

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


    if(jogador1) {
        document.getElementById("valorEntrada").value = totalCalculo;
    } else {
        document.getElementById("valorEntrada2").value = totalCalculo;
    }  
}

function setJogador(pJog){
   jogador1 = pJog    
}

function adicionarNumero(numero) {
    
    if(jogador1) {
     document.getElementById("valorEntrada").value += numero;
    } else {
    document.getElementById("valorEntrada2").value += numero;
    }
}


function excluir (){
    ResetaCoringas();

  if(jogador1) {
    document.getElementById("valorSoma").value = 0;
   } else {
       document.getElementById("valorSoma2").value = 0;
   }
}

function excluir2 (){
    ResetaCoringas();
    
   if (jogador1) {
      document.getElementById("valorEntrada").value = ""; 
      
   } else {
        document.getElementById("valorEntrada2").value = "";
   }
}

function ResetaCoringas(){
    document.getElementById("imagem1").style.border = ""; 
    document.getElementById("imagem2").style.border = ""; 
    arrayOfCoringa[pIdCoringa1].QtdAtivacoes = 0;
    arrayOfCoringa[pIdCoringa2].QtdAtivacoes = 0;
    contadorSpan1.textContent = 0;
    contadorSpan2.textContent = 0; 

    document.getElementById("valorEntrada").value = ""; 
    document.getElementById("valorEntrada2").value = ""; 
}

function adicionar() {
    if (jogador1){
        var entrada = parseFloat(document.getElementById("valorEntrada").value);
    } else {
        var entrada = parseFloat(document.getElementById("valorEntrada2").value);
    }
    
    if (!isNaN(entrada)) {
        if(jogador1){
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

        AdicionaNoLog(jogador1, entrada);

        ResetaCoringas();
    } else {
        alert("Por favor, digite um número válido.");
    }
}

function cancelar() {
    document.getElementById("valorEntrada").value = 0;
}


function selecionarImagem2(idImagem) {
    var input = document.getElementById("selecionarImagemInput2");
    input.addEventListener("change", function() {
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(idImagem).src = e.target.result;
        }
        reader.readAsDataURL(file);
    });
    input.click();
}

function selecionarImagem3(idImagem) {
    var input = document.getElementById("selecionarImagemInput3");
    input.addEventListener("change", function() {
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(idImagem).src = e.target.result;
        }
        reader.readAsDataURL(file);
    });
    input.click();
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

function selecionarPasta() {
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

    document.getElementById("imagem1").value = pIdCoringa1;
    document.getElementById("imagem2").value = pIdCoringa2;

    ResetaCoringas();
    atualizaIndicadorMult();
    atualizaContador();
}

function infoCarta(pIdCoringa){
    alert(arrayOfCoringa[pIdCoringa].Descricao);
}

function AtualizaCookie() { 
    
    var vCookieString = getCookie("CookieLog");   
    
    if (vCookieString != "" && vCookieString !== null) {     
        vCookieString = CookieAtualizaLog(vCookieString); 
        setCookie("CookieLog", vCookieString, 30);      
    } else { 
        setCookie("CookieLog", "Inicio", 30); 
    }    
} 

function getCookie(c_name) {
    return localStorage.getItem(c_name);
}

function setCookie(c_name, value, expiredays) {
    return localStorage.setItem(c_name, value);
}

function CookieAtualizaLog(pLogAntes){     
    vAdicionarNoLog =  '\n' + 'C1|' + pIdCoringa1 + '|C2|' + pIdCoringa2;
    vAdicionarNoLog += '\n' + 'J1|' + vPontuacaoLogJ1;
    vAdicionarNoLog += '\n' + 'J2|' + vPontuacaoLogJ2;
    vLogNovo = pLogAntes + vAdicionarNoLog;

    return vLogNovo;
}

function ExibeCookie(){
    var vCookieString = getCookie("CookieLog"); 
    
    alert(vCookieString);   
}

function AdicionaNoLog(pJogador1, pPontuacao){
    if (pJogador1){
        vPontuacaoLogJ1 += pPontuacao + '|';
    } else {
        vPontuacaoLogJ2 += pPontuacao + '|';   
    }   
}