(function () {
  "use strict";

  // スタート初期画面
  const front = document.getElementById('front');
  const start = document.getElementById('start');
  const end = document.getElementById('end');
  const btnN = document.getElementById("btnN");
  const btnD = document.getElementById("btnD");
  const btnS = document.getElementById("btnS");




  const questionNumber1 = document.getElementById("question-number1");
  const questionNumber2 = document.getElementById("question-number2");
  const correctBox = document.getElementById("correct-box");
  const cn = document.getElementById("cn");
  const input = document.getElementById("answer-input");
  const userScore = document.getElementById("userScore");
  const congrats = document.getElementById("congrats");

  let isAnswered;
  let answer;
  let userAns;
  let currentNum = 0;
  let score = 0;
  let a;
  let b;

  // 配列を入れるはこ
  const array = [
    // {num1 : 1 , num2 : 1 },
    // {num1 : 2 , num2 : 1 },
    // {num1 : 2 , num2 : 2 },
    // {num1 : 3 , num2 : 1 },
    // {num1 : 3 , num2 : 3 },
    // {num1 : 4 , num2 : 1 },
    // {num1 : 4 , num2 : 2 },
    // {num1 : 4 , num2 : 4 },
    // {num1 : 5 , num2 : 1 },
    // {num1 : 5 , num2 : 5 },
    // {num1 : 6 , num2 : 1 },
    // {num1 : 6 , num2 : 2 },
    // {num1 : 6 , num2 : 3 },
    // {num1 : 6 , num2 : 6 },
    // {num1 : 7 , num2 : 1 },
    // {num1 : 7 , num2 : 7 },
    // {num1 : 8 , num2 : 1 },
    // {num1 : 8 , num2 : 2 },
    // {num1 : 8 , num2 : 4 },
    // {num1 : 8 , num2 : 8 },
    // {num1 : 9 , num2 : 1 },
    // {num1 : 9 , num2 : 9 },
  ];

  // スタート画面のクリックイベントの関数
  btnS.addEventListener('click',()=>{
    front.classList.add('hide');
    start.classList.remove('hide');
    btnS.classList.add("hide");
    btnD.classList.remove("hide");
    game();
    
  });

  function game(){
    // ----------------正誤判定------------------
    function checkAnswer(answer, userAns) {
      if (isAnswered) {
        return;
      }
      isAnswered = true;
  
      if (userAns == answer) {
        correctBox.classList.remove("incorrect-answer");
        correctBox.classList.add("correct-answer");
        correctBox.textContent = "正解!";
        score++;
      } else {
        correctBox.classList.remove("correct-answer");
        correctBox.classList.add("incorrect-answer");
        correctBox.textContent = `ハズレ　正解は${answer}`;
      }
      btnD.classList.add("hide");
      btnN.classList.remove("hide");
  
    }
  
    // 問題作成
    function makeNumber(){
      for(let i = 0; i<10; i++){
        a = Math.floor(Math.random()*9)+1;
        b = Math.floor(Math.random()*9)+1;
        // answer = Math.floor(Math.random()*10);
        array.push( {num1 : a , num2 : b } );
      }
    }
    if(array == false ){
      makeNumber();
      console.log(array);
    }else{
      return;
    }
  
    // リセット関数----------------------------------------------
    function reset() {
      questionNumber1.textContent = "";
      questionNumber2.textContent = "";
      correctBox.textContent = "";
      f.inputnumber.value = "";
      
    }
  
    // 問題画面の問題セットの関数--------------------------------
    function drillSet() {
      reset();
      isAnswered = false;
  
      // ボタンの描画
      btnN.classList.add("hide");
      btnD.classList.remove("hide");
  
      // 問目数表示
      cn.textContent = currentNum+1;
  
      
      // answer = array[currentNum].num1 / array[currentNum].num2;
      if(array[currentNum].num2 <= array[currentNum].num1 ){
        questionNumber1.textContent = array[currentNum].num1 * array[currentNum].num2;
        questionNumber2.textContent = array[currentNum].num1;
        answer = array[currentNum].num2 ;
        // コメント
        console.log(array[currentNum].num1*array[currentNum].num2);
        console.log(array[currentNum].num1);
        console.log('答',array[currentNum].num2);
      }else{
        questionNumber1.textContent = array[currentNum].num2 * array[currentNum].num1;
        questionNumber2.textContent = array[currentNum].num2 ;
        answer = array[currentNum].num1 ;
        // コメント
        console.log(array[currentNum].num2*array[currentNum].num1);
        console.log(array[currentNum].num2);
        console.log('Chenge答',array[currentNum].num1);
      }

      
      
      
      // 入力値を変数に代入する
      input.addEventListener("change", inputSave);
      function inputSave(e) {
        userAns = e.target.value;
        // 正誤判定のためのクリックイベント
        btnD.addEventListener("click", () => {
          checkAnswer(answer, userAns);
        });
      }
  
      if( currentNum === array.length -1){
        f.btnN.value = "結　果";
        result();
      }
    }
  
  
    drillSet();
  
    function result(){
      btnN.addEventListener("click", () => {
        start.classList.add('hide');
        end.classList.remove('hide');
        userScore.textContent = `${score}問/${array.length}問`;
        if( score === array.length ){
          congrats.classList.remove('hide');
        }
        f.btnN.value = "もう一回";
        btnN.addEventListener("click", () => {
          reset();
          // array.splice(0,10);
          location.reload();
        });
      });
    }
  
    
    
    // 正誤判定後の次の問題への行き方
    btnN.addEventListener("click", () => {
      btnD.classList.add("hide");
      btnN.classList.remove("hide");
      if(currentNum === array.length -1){

      }else{
        currentNum++;
        drillSet();
      }
    });
  }

})();
