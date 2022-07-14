let randomNumber = 0
let displayIndex = 1
const words = ["YSK", "GPI", "ATC", "GDO", "SURE", "MEIGNHTSO"]
const checkWords = ["SKY", "PIG", "CAT", "DOG", "USER", "SOMETHING"]
const retryButton = document.querySelector(".retry")
const playButton = document.querySelector(".play")

const makeBox = (n) => {
    const inputBox = document.querySelector(".word-input-blocks")
    const outputBox = document.querySelector(".word-display-blocks")
    
    for(let i=0; i<n; i++){
        let div = document.createElement("div")
        div.classList += "block"

        inputBox.appendChild(div)
        
        let div2 = document.createElement("div")
        div2.classList += "block"

        outputBox.appendChild(div2)
    }
}

const displayWord = (n, word) => {
    for(let i=0; i<n; i++){
        let inputBox = document.querySelector(`.word-input-blocks > .block:nth-child(${i+1})`)
        inputBox.textContent = word.slice(i, i+1)
    }
}

const chooseWord = () => {
    randomNumber = Math.floor(Math.random() * words.length)
    let word = words[randomNumber]

    return word
}

const startGame = () => {
    let word = chooseWord()
    makeBox(word.length)
    displayWord(word.length, word)
}

const retry = () => {
    let word = words[randomNumber]
    const inputBox = document.querySelector(".word-input-blocks")
    const outputBox = document.querySelector(".word-display-blocks")
    while(inputBox.firstChild)
        inputBox.removeChild(inputBox.firstChild)
    while(outputBox.firstChild)
        outputBox.removeChild(outputBox.firstChild)
    makeBox(word.length)
    displayWord(word.length, word)
    displayIndex = 1
    addingListeners()

    retryButton.classList.toggle("hide")
}

const play = () => {
    window.location.reload()
}

const gameFinish = () => {
    let wonOrLose = 0
    let word = checkWords[randomNumber]
    for(let i=0; i<word.length; i++){
        let inputDiv = document.querySelector(`.word-display-blocks > .block:nth-child(${i+1})`)
        let inputWord = inputDiv.textContent
        let realWord = word.slice(i, i+1)
        if (inputWord === realWord){
            inputDiv.classList += " pass"
        } else {
            inputDiv.classList += " fail"
            wonOrLose++
        }
    }
    if(wonOrLose!=0)
        retryButton.classList.toggle("hide")
    else 
        playButton.classList.toggle("hide")
    
}

const addingListeners = () => {
    const list = document.querySelectorAll(".word-input-blocks > .block")

    for(let i=0; i<list.length; i++) {
        let ele = document.querySelector(`.word-input-blocks > .block:nth-child(${i+1})`)
        ele.addEventListener("click", () => {
            let ele2 = document.querySelector(`.word-display-blocks > .block:nth-child(${displayIndex})`)
            ele2.textContent = ele.textContent
            displayIndex++
            if (displayIndex>list.length)
                gameFinish()
        })
    }

    retryButton.addEventListener("click", retry)
    playButton.addEventListener("click", play)
}

startGame()
addingListeners()