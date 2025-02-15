function atualizaContador(){
    contadorSpan1 = document.getElementById('contadorSpan1');
    contadorSpan2 = document.getElementById('contadorSpan2');
    contadorSpan3 = document.getElementById('contadorSpan3');

    contadorSpan1.textContent = arrayOfCoringa[pIdCoringa1].QtdAtivacoes;
    contadorSpan2.textContent = arrayOfCoringa[pIdCoringa2].QtdAtivacoes; 
    contadorSpan3.textContent = arrayOfCoringa[pIdCoringa3].QtdAtivacoes;  
}

function addPontos(pImagem) {
    arrayOfCoringa[pImagem.value].QtdAtivacoes++; 
    
    pImagem.style.border = "4px solid red";

    atualizaContador();

    CalculaPontuacao(); 
}

function CalculaPontuacao(){
    const vCoringa1 = { valor: arrayOfCoringa[pIdCoringa1].ValorBase, 
            QtdAtivacoes: arrayOfCoringa[pIdCoringa1].QtdAtivacoes, 
            operadorEhMult: arrayOfCoringa[pIdCoringa1].EhMult};
    const vCoringa2 = { valor: arrayOfCoringa[pIdCoringa2].ValorBase, 
            QtdAtivacoes: arrayOfCoringa[pIdCoringa2].QtdAtivacoes,
            operadorEhMult: arrayOfCoringa[pIdCoringa2].EhMult};
    const vCoringa3 = { valor: arrayOfCoringa[pIdCoringa3].ValorBase, 
        QtdAtivacoes: arrayOfCoringa[pIdCoringa3].QtdAtivacoes,
        operadorEhMult: arrayOfCoringa[pIdCoringa3].EhMult};        

    const vCoringas = [vCoringa1, vCoringa2, vCoringa3];

    var vTotal = parseFloat(document.querySelector('input[name="hand"]:checked').value);

    vCoringas.sort((a, b) => {
    if (a.operadorEhMult == b.operadorEhMult) {
        return 0;
    } else if (a.operadorEhMult) {
        return 1;
    } else {
        return -1;
    }
    });

    vCoringas.forEach(vCoringa => {
    if (vCoringa.operadorEhMult){
        if (vCoringa.QtdAtivacoes > 0){
            vTotal *= vCoringa.valor * vCoringa.QtdAtivacoes;
        }       
    } else {
        vTotal += vCoringa.valor * vCoringa.QtdAtivacoes;          
    }
    }); 

    if(jogador1Selecionado) {
        document.getElementById("valorEntrada").value =  vTotal;
    } else {
        document.getElementById("valorEntrada2").value = vTotal;
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
    document.getElementById("valorSoma").value = '❂ ' + 0;
   } else {
       document.getElementById("valorSoma2").value = '❂ ' + 0;
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
    document.getElementById("coringaFrame3").style.border = ""; 
    arrayOfCoringa[pIdCoringa1].QtdAtivacoes = 0;
    arrayOfCoringa[pIdCoringa2].QtdAtivacoes = 0;
    arrayOfCoringa[pIdCoringa3].QtdAtivacoes = 0;
    contadorSpan1.textContent = 0;
    contadorSpan2.textContent = 0; 
    contadorSpan3.textContent = 0; 

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
            total = parseFloat(document.getElementById("valorSoma").value.substring(2));
            total = total + entrada;
            document.getElementById("valorSoma").value = "❂ " + total;
        } else {
            total = parseFloat(document.getElementById("valorSoma2").value.substring(2));
            total = total + entrada;
            document.getElementById("valorSoma2").value = "❂ " + total;
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
    indicadorMult1.textContent = pOperacao + arrayOfCoringa[pIdCoringa1].ValorBase + "❂";

    indicadorMult2 = document.getElementById('indicadorMult2');
    if (arrayOfCoringa[pIdCoringa2].EhMult) {
        pOperacao = "X";
    } else {
        pOperacao = "+";    
    }
    indicadorMult2.textContent = pOperacao + arrayOfCoringa[pIdCoringa2].ValorBase + "❂";

    indicadorMult3 = document.getElementById('indicadorMult3');
    if (arrayOfCoringa[pIdCoringa3].EhMult) {
        pOperacao = "X";
    } else {
        pOperacao = "+";    
    }
    indicadorMult3.textContent = pOperacao + arrayOfCoringa[pIdCoringa3].ValorBase + "❂";
}



function SortCoringas(pCoringa1, pCoringa2, pCoringa3) {  
    pasta = 'https://viniciusbemfica.github.io/Cartas/';

    // Número total de imagens disponíveis na pasta
    const totalImagens = arrayOfCoringa.length - 1;

    // Lista de índices de imagens disponíveis
    let indicesDisponiveis = Array.from({ length: totalImagens }, (_, i) => i + 1);

    // Gerar dois números aleatórios entre 1 e o total de imagens
    var random1 = getRandomIndex(indicesDisponiveis);
    var random2 = getRandomIndex(indicesDisponiveis);
    var random3 = getRandomIndex(indicesDisponiveis);

    if (pCoringa1 !== ''){
        random1 = pCoringa1;   
        random2 = pCoringa2;  
        random3 = pCoringa3;   
    }

    pIdCoringa1 = random1;
    pIdCoringa2 = random2;
    pIdCoringa3 = random3;

    // Criar o caminho para as imagens aleatórias
    const caminhoImagem1 = `${pasta}${pIdCoringa1}.jpg`;
    const caminhoImagem2 = `${pasta}${pIdCoringa2}.jpg`;
    const caminhoImagem3 = `${pasta}${pIdCoringa3}.jpg`;

    // Atualizar as imagens no HTML
    document.getElementById('imagem1').src = caminhoImagem1;
    document.getElementById('imagem2').src = caminhoImagem2;
    document.getElementById('imagem3').src = caminhoImagem3;

    // document.getElementById("imagem1").value = pIdCoringa1;
    // document.getElementById("imagem2").value = pIdCoringa2;
    document.getElementById("coringaFrame1").value = pIdCoringa1;
    document.getElementById("coringaFrame2").value = pIdCoringa2;
    document.getElementById("coringaFrame3").value = pIdCoringa3;

    document.getElementById("coringaFrame1").style.backgroundColor = arrayOfCoringa[pIdCoringa1].Tipo;
    document.getElementById("coringaFrame2").style.backgroundColor = arrayOfCoringa[pIdCoringa2].Tipo;
    document.getElementById("coringaFrame3").style.backgroundColor = arrayOfCoringa[pIdCoringa3].Tipo;

    document.getElementById("editCoringa1").setAttribute("placeholder", pIdCoringa1);
    document.getElementById("editCoringa2").setAttribute("placeholder", pIdCoringa2);
    document.getElementById("editCoringa3").setAttribute("placeholder", pIdCoringa3);

    ResetaCoringas();
    atualizaIndicadorMult();
    atualizaContador(); 
    AtualizaTopDaMesa();
 
    EscondeIndicadorCoringaPoder();


    document.getElementById("InforNomeCoringa1").textContent = arrayOfCoringa[pIdCoringa1].Nome;
    document.getElementById("InforNomeCoringa2").textContent = arrayOfCoringa[pIdCoringa2].Nome;
    document.getElementById("InforNomeCoringa3").textContent = arrayOfCoringa[pIdCoringa3].Nome;
    document.getElementById("InforCoringa1").textContent = arrayOfCoringa[pIdCoringa1].Descricao;
    document.getElementById("InforCoringa2").textContent = arrayOfCoringa[pIdCoringa2].Descricao;  
    document.getElementById("InforCoringa3").textContent = arrayOfCoringa[pIdCoringa3].Descricao;
}

function EscondeIndicadorCoringaPoder(){
    document.getElementById('indicadorMult1').style.display = "block";
    document.getElementById('contadorSpan1').style.display = "block";
    document.getElementById('indicadorMult2').style.display = "block";
    document.getElementById('contadorSpan2').style.display = "block";
    document.getElementById('indicadorMult3').style.display = "block";
    document.getElementById('contadorSpan3').style.display = "block";

    if (arrayOfCoringa[pIdCoringa1].Tipo == vTiposCoringa.Poder){
        document.getElementById('indicadorMult1').style.display = "none";    
        document.getElementById('contadorSpan1').style.display = "none"; 
    }    
    if (arrayOfCoringa[pIdCoringa2].Tipo == vTiposCoringa.Poder){
        document.getElementById('indicadorMult2').style.display = "none";    
        document.getElementById('contadorSpan2').style.display = "none"; 
    }  
    if (arrayOfCoringa[pIdCoringa3].Tipo == vTiposCoringa.Poder){
        document.getElementById('indicadorMult3').style.display = "none";    
        document.getElementById('contadorSpan3').style.display = "none"; 
    }  
}



function AtualizaTopDaMesa(){
    var vMaxMesa = '';
    var vTexto = '';
    var vCookieString = getCookie("CookieLog"); 
    var {maiorPontuacao, vTotalLinhasMesa, vUltimaPontuacao} = {maiorPontuacao:0, vTotalLinhasMesa:0, vUltimaPontuacao:0}
    
    if (vCookieString != null){
        var {maiorPontuacao, vTotalLinhasMesa, vUltimaPontuacao} = MaiorPontuacaoETotalJogos(vCookieString, pIdCoringa1, pIdCoringa2, pIdCoringa3);
    }

    vMaxMesa = document.getElementById("maxPontosMesa").value;

    vTexto = '🏆: ' + maiorPontuacao + ' / Max: ' + vMaxMesa + ' / J: ' + vTotalLinhasMesa ;
    document.getElementById("TopDaMesa").textContent = vTexto;
}

function AtualizaCookie() { 

    var resposta = confirm("O Jogo finalizou e deseja guardar a pontuação no Log?");
    
    if (!resposta) {
        return;
    }
       
    var vCookieString = getCookie("CookieLog");   
        
    if (vCookieString != "" && vCookieString !== null) {     
        vCookieString = CookieAtualizaLog(vCookieString); 
        setCookie("CookieLog", vCookieString, 30);      
    } else { 
        alert("Gerou novo Cookie")
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
    var vPontosJ1 = 0;
    var vPontosJ2 = 0;

    vAdicionarNoLog =  '\n' + 'C1|' + pIdCoringa1 + '|C2|' + pIdCoringa2 + '|C3|' + pIdCoringa3 + '|';  

    vPontosJ1 = parseFloat(document.getElementById("valorSoma").value.substring(2));
    vPontosJ2 = parseFloat(document.getElementById("valorSoma2").value.substring(2));

    if (vPontosJ1> vPontosJ2){
        vAdicionarNoLog += 'J1|' + vPontosJ1;
    } else if (vPontosJ2 > vPontosJ1) {
        vAdicionarNoLog += 'J2|' + vPontosJ2;       
    } else {
        vAdicionarNoLog += 'EMP|' + vPontosJ1;    
    }

    vLogNovo = pLogAntes + vAdicionarNoLog + ';';

    return vLogNovo;
}

function ExibeCookie(){
    var vCookieString = getCookie("CookieLog"); 

    var {maiorPontuacao} = MaiorPontuacaoETotalJogos(vCookieString, pIdCoringa1, pIdCoringa2, pIdCoringa3);

    // vMelhorDaMesa = "Mesas Jogadas com esses Coringas: " + vTotalLinhasMesa + '\n' +
    //                 "Maior Pontuação: " + maiorPontuacao + '\n' +
    //                 "Maior Pontuação Geral: " + vMaiorPontuacaoGeral + '\n' +
    //                 "Total Mesas Jogadas: " + vTotalLinhas;

    // alert(vMelhorDaMesa);
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

document.addEventListener("DOMContentLoaded", function() {
    var vButtonRow = document.querySelectorAll('.button-row');
    vButtonRow.forEach(function(vButtonRow) {
        vButtonRow.addEventListener("dblclick", function(event) {
            event.stopPropagation(); // Stop event propagation
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var vButtonRow = document.querySelectorAll('.pokerHand');
    vButtonRow.forEach(function(vButtonRow) {
        vButtonRow.addEventListener("dblclick", function(event) {
            event.stopPropagation(); // Stop event propagation
        });
    });
});


function MaiorPontuacaoETotalJogos(vCookieString, pIdCoringa1, pIdCoringa2, pIdCoringa3) {
    // Divide o texto em linhas
    var linhas = vCookieString.split(";");
    var vTotalLinhas = linhas.length;
    var vTotalLinhasMesa = 0;
    var vUltimaPontuacao = 0;

    // Inicializa a variável para armazenar a maior pontuação e o jogador correspondente
    var maiorPontuacao = 0;

    // Itera sobre cada linha
    for (var i = 1; i < linhas.length - 1; i++) {
        // Divide a linha em elementos separados
        var elementos = linhas[i].split("|");

        // Inicializa as variáveis para armazenar as pontuações dos Coringas e o jogador correspondente
        var pontuacao = 0;

        
        if ([elementos[1], elementos[3], elementos[5]].some(el => el == pIdCoringa1)) {
            if ([elementos[1], elementos[3], elementos[5]].some(el => el == pIdCoringa2)) {
                if ([elementos[1], elementos[3], elementos[5]].some(el => el == pIdCoringa3)) {
                    pontuacao = parseInt(elementos[7], 10);
                    vTotalLinhasMesa++;
                }
            }
        }

        // Verifica se há uma pontuação válida para ambos os Coringas
        if (pontuacao > maiorPontuacao) {
            maiorPontuacao = pontuacao;
        } 
    }

    // Retorna um objeto contendo a maior pontuação e o jogador correspondente
    return {maiorPontuacao: maiorPontuacao, vTotalLinhasMesa: vTotalLinhasMesa, vUltimaPontuacao: pontuacao};
}

function escondeCoringa(pSection){
    var resposta = confirm("Deseja esconder esse coringa?");
    
    if (!resposta) {
        return;
    }
    
    pSection.style.display = "none";
}

function openBox() {
    var box = document.getElementById("box");
    box.style.display = "block";

    document.getElementById('valorEntrada').readOnly = !document.getElementById('valorEntrada').readOnly;
    document.getElementById('valorEntrada2').readOnly = !document.getElementById('valorEntrada2').readOnly;
}
  
function closeBox() {
    var box = document.getElementById("box");
    box.style.display = "none";

    AtualizaTopDaMesa();
}

function setaCoringas(){
    pIdCoringa1 = document.getElementById('editCoringa1').value;
    pIdCoringa2 = document.getElementById('editCoringa2').value;
    pIdCoringa3 = document.getElementById('editCoringa3').value;

    SortCoringas(pIdCoringa1, pIdCoringa2, pIdCoringa3);

    closeBox();
}

function openModal() {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImg");
    var imgSrc = `https://viniciusbemfica.github.io/PokerHands.jpg`; // Replace "your_image_url.jpg" with the URL of your image
    modal.style.display = "block";
    modalImg.src = imgSrc;
}
  
  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }


function exibirImagemClipboard() {   
    // Verifica se a área de transferência contém uma imagem
    if (!navigator.clipboard) {
    alert("Seu navegador não suporta a API da área de transferência.");
    return;
    }
    
    navigator.clipboard.read().then(data => {
    // Verifica se a área de transferência contém dados de imagem
    for (const item of data) {
        if (item.types.includes('image/png') || item.types.includes('image/jpeg')) {
        item.getType('image/png').then(blob => {
            const imgUrl = URL.createObjectURL(blob);
            const imgElement = document.createElement('img');
            imgElement.src = imgUrl;

            var modal = document.getElementById("myModal");
            modal.style.display = "block";

            document.getElementById('modalImg').src = imgUrl;
            
        }).catch(error => {
            console.error('Erro ao ler imagem da área de transferência:', error);
        });
        break; // Para após encontrar a primeira imagem
        }
    }
    }).catch(error => {
    console.error('Erro ao ler dados da área de transferência:', error);
    });
}
