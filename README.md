<p align="center">
    <img src="Calculator.gif">
</p>

<h1 align="center">Calculadora Javascript</h1>

<p align="center">Implementação de conceitos básicos de programação</p>

### Função de incorporação de variáveis e atribuir os dados pegos aos display (function displayNum( ) )

``` js
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
```

### Limpar dados e atribuição dos eventos de click na tela

``` js

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
```

Autor: *Matheus Santos Lima*
<p align="center">
<img src="https://instagram.fmao1-1.fna.fbcdn.net/v/t51.2885-19/s320x320/105976708_319086272426818_3941262161040549344_n.jpg?_nc_ht=instagram.fmao1-1.fna.fbcdn.net&_nc_ohc=RZSNgZqHVYkAX8fCyYN&oh=d0487d9e0038bd367c169fd3057d4002&oe=5F2CFAD3">
</p>
