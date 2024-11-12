import React, { useState, useRef } from "react";



const Buttons = () => {
    const [displayButtons, setButtons] = useState('');
    const [result, setResult] = useState('');
    const [answerForm, setAnswerForm] = useState(false);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(10);
    const [feedback,setFeedback] = useState('')
    const [animateEqual, setAnimateEqual] = useState(false)
    const answerRef = useRef(null); 
    
    const displayHandle = (e) => {
        const buttonValue = e.target.innerText;
        if (['+', '/', '-', '*', '='].includes(buttonValue)) {
            setButtons(prevValue => prevValue + ' ' + buttonValue + ' ');
        } else {
            setButtons(prevValue => prevValue + buttonValue);
        }
    };

    const handleResult = () => {
        const numbers = displayButtons.trim().split(' ');
        let num1 = Number(numbers[0]);
        let operator = numbers[1];
        let num2 = Number(numbers[2]);

        let finresult;
        if (operator === '+') {
            finresult = num1 + num2;
        } else if (operator === '-') {
            finresult = num1 - num2;
        } else if (operator === '*') {
            finresult = num1 * num2;
        } else if (operator === '/') {
            finresult = num2 !== 0 ? num1 / num2 : 'Error';
        } else {
            finresult = 'Invalid Input';
        }

        setResult(finresult.toString());
        console.log(finresult)
        setAnswerForm(true);  // Display the answer form
        setAnimateEqual(true); 
        setButtons('')
    };

    const handleCleaning = () => {
        setButtons('');
        setResult('');
        setAnswerForm(false);
        setFeedback('')
        setAnimateEqual(false)
    };

  

    const handleAnswer = () => {
        const userAnswer = answerRef.current.value; //  value directly from ref
        if (userAnswer === result) {
            setScore(prevScore => prevScore + 1);
           }
           if (userAnswer === result) {

            setFeedback('You doing great Agata!')
        } else {

         setFeedback(`The answer is ${result}`)

        }

        if(score === 10) {

         setFeedback("The game is finished!! Great Job!!")
        
         }

        setAnswerForm(false);  
        console.log(userAnswer)
    };


    return (
        <div className='bigBoxs'>
            <span className="result"> Score is: {score}/{attempts}</span>
       
           
            <h1 className = 'feedBack'> {feedback}</h1>
            <h1 className = 'displayButtons'>{displayButtons}</h1>

            {answerForm && (
                <>
                    <input
                        type="text"
                        ref={answerRef} // Attach ref to input
                        className="resultInput"
                        placeholder="Write your answer"
                        value = {displayButtons}
                        readOnly
                    />
                    <button onClick={handleAnswer}>Accept</button>
                </>
            )}

            <div className='buttonContainer'>
                <button className={`button1 ${animateEqual ? "animate-diagonal-right" : ""}`} onClick={displayHandle}>1</button>
                <button className={`button2 ${animateEqual ? "animate-vertical" : ""}`} onClick={displayHandle}>2</button>
                <button className={`button3 ${animateEqual ? "animate-circle" : ""}`} onClick={displayHandle}>3</button>
           </div>
           <div className='secondbuttonContainer'>
                <button className={`button4 ${animateEqual ? "animate-horizontal" : ""}`} onClick={displayHandle}>4</button>
                <button className={`button5 ${animateEqual ? "animate-circle" : ""}`} onClick={displayHandle}>5</button>
                <button className={`button6 ${animateEqual ? "animate-diagonal-right" : ""}`} onClick={displayHandle}>6</button>
           </div>

          <div className='thirdbuttonContainer'>
               <button className={`button4 ${animateEqual ? "animate-circle" : ""}`} onClick={displayHandle}>7</button>
               <button className={`button5 ${animateEqual ? "animate-diagonal-left" : ""}`} onClick={displayHandle}>8</button>
               <button className={`button6 ${animateEqual ? "animate-spiral" : ""}`} onClick={displayHandle}>9</button>
               <button className={`button6 ${animateEqual ? "animate-horizontal" : ""}`} onClick={displayHandle}>0</button>
</div>


            <div className='functions'>
                <button  onClick={displayHandle} className='add'>+</button>
                <button  onClick={displayHandle} className='subtract'>-</button>
                <button  onClick={displayHandle} className='multiply'>*</button>
                <button  onClick={displayHandle} className='divide'>/</button>
            </div>
            <div className='equal'>
                <button onClick={handleResult} className= {`equal ${animateEqual ? "colorchange" : ""}`}>=</button>
                <button onClick={handleCleaning} className='clear'>Clear</button>
            </div>
        </div>
    );
};

export default Buttons;
