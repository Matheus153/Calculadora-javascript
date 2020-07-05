/*
TODO: Limite de entrada de numeros!
    Impedir de ser introduzido várias vezes
    Limpar estrutura
*/

(function() {
  "use strict";

  // Atalhos para conseguir elementos
  var el = function (element) {

    if (element.charAt(0) === "#") { // Se passou por um ID

      return document.querySelector(element)
      // retorna um único elemento
    }

    return document.querySelectorAll(element)
    // Caso contrário, retorna um nódulo
  }

  /*
  ! Variáveis
  */
  var viewer = el("#viewer"), /* Tela da calculadora onde
o resultado é mostrado */
    equals = el("#equals"), // Botão de igualdade 
    nums = el(".num"), // Lista de numeros
    ops = el(".ops"), // Lista de operadores 
    theNum = "", // corrente de numeros 
    oldNum = "", // primeiro numero
    resultNum, // resultado 
    operator; // Cabeça da operação

  /*
   ! Quando: O número é clicado. Selecione o número atual
  */
  var setNum = function () {
    if (resultNum) {
      theNum = this.getAttribute("data-num")
      resultNum = "";
    }
    else { // do contrário adiciona digito ao numero anterior  
      theNum += this.getAttribute("data-num")
    }

    viewer.innerHTML = theNum; // Mostra a corrente de numeros
  };

  /* 
    ! Quando um operador é clicado
    * Passa o oldNum and salvar o operador
  */
  var moveNum = function() {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", ""); // reseta o resultado em attr
  }

  /*
    ! Quando: Sinal de igualdade é clicado. Calcular o resultado
  */
  var displayNum = function () {

    // Converter string em numeros
    oldNum = parseFloat(oldNum)
    theNum = parseFloat(theNum)

    // Operações
    switch (operator) {
      case "mais":
        resultNum = oldNum + theNum;
        break;

      case "menos":
        resultNum = oldNum - theNum;
        break;

      case "vezes":
        resultNum = oldNum * theNum;
        break;

      case "dividido por":
        resultNum = oldNum / theNum;
        break;

      /* Se igual for pressionado sem um operador,
       mantenha o número e continue */
      default:
        resultNum = theNum;
    }

    // Se retorna um valor vazio ou infinito
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) { // Se o resultado não é um numero
        resultNum = "You broken it!"
      }
      else { // Se o resultado é infinito
        resultNum = "Look what you've done"
        el('#calculator').classList.add("broken") // Calculadora quebrada

        el('#reset').classList.add("show")
      }
    }

    // Mostra resultado, finalmente!
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    // Resetar o oldNum e manter o resultado
    oldNum = 0;
    theNum = resultNum

  }

  var clearAll = function () {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum)
  }

  /*
  * Evento de click
  */
   // Add click event to numbers
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  // Adicionar evento de click para operadores
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  // Adicionar evento de click para o sinal de igualdade
  equals.onclick = displayNum;

  // Adicionar evento de click para o botão de limpar
  el("#clear").onclick = clearAll;

  // Adicionar evento de click para resetar botão
  el("#reset").onclick = function() {
    window.location = window.location;
  }

}());