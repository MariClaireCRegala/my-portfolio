const agents = [
  { 
    "agent": "Jett",
    "clues": [
      "A wind-based agent.",
      "Speaks korean.",
      "Regarded to as having a toxic attitude towards other people."
    ]
  },
  {
    "agent": "Sova",
    "clues": [
      "He is a bow guy.",
      "Speaks Russian.",
      "He uplifts people's spirits."
    ]
  },
  {
    "agent": "Cypher",
    "clues": [
      "A guy with a detector hat.",
      "Doesn't like threatening people by using their children.",
      "He likes to take other people's stuff, like Breach's stuff."
    ]
  },
  {
    "agent": "Raze",
    "clues": [
      "A friendly rival of Killjoy.",
      "She uses a device that deploys a boom bot that automatically seeks out and damages enemies.",
      "She likes to make things go kaboom."
    ]
  },
  {
    "agent": "Omen",
    "clues": [
      "A disfigured man.",
      "A friend once to Viper.",
      "He can feel people from other dimensions."
    ]
  }
]

let randomAgent, attempts, currentClueIndex

function startGame() {
  const randomIndex = () => Math.floor(Math.random() * agents.length)

  randomAgent = agents[randomIndex()]

  document.getElementById('clues').innerHTML = "<p>Clues for the agent:</p>"
  randomAgent.clues.forEach(clue => {
    document.getElementById('clues').innerHTML += `<p>- ${clue}</p>`
  })

  currentClueIndex = 0
  displayClue(currentClueIndex)
  attempts = 3
  
  document.getElementById('restartBtn').style.display = 'none'
  document.getElementById('guess').disabled = false
}

function displayClue(index) {
  document.getElementById('clues').innerHTML = `<p>Clue: ${randomAgent.clues[index]}</p>`
}

function checkGuess() {
  const guess = document.getElementById('guess').value.trim().toLowerCase()

  if (attempts > 0) {
    if (guess === randomAgent.agent.toLowerCase()) {
      document.getElementById('clues').innerHTML += `<p>Congratulations! You correctly identified the agent (${randomAgent.agent}). You win!</p>`
      document.getElementById('guess').disabled = true
      document.getElementById('restartBtn').style.display = 'block'
      document.getElementById('submitBtn').disabled = true
    } else {
      attempts--
      document.getElementById('attempts').textContent = attempts
      if (attempts === 1) {
        document.getElementById('clues').innerHTML += `<p>You only have one attempt remaining`
      }
      if (attempts === 0) {
        document.getElementById('clues').innerHTML += `<p>You've run out of attempts. The correct agent was ${randomAgent.agent}. Please try again.</p>`
        document.getElementById('guess').disabled = true
        document.getElementById('restartBtn').style.display = 'block'
        document.getElementById('submitBtn').disabled = true
      } else {
        if (currentClueIndex < randomAgent.clues.length - 1) {
          currentClueIndex++
          const newClue = randomAgent.clues[currentClueIndex]
          document.getElementById('clues').innerHTML += `<p>Clue: ${newClue}</p>`
        } else {
          document.getElementById('clues').innerHTML += "<p>Incorrect guess. Try again!</p>"
        }
      }
    }
  } else {
    document.getElementById('submitBtn').disabled = true
  }
}

function restartGame() {
  document.getElementById('clues').innerHTML = ''
  document.getElementById('guess').value = ''
  document.getElementById('restartBtn').style.display = 'none'
  document.getElementById('attempts').textContent = 3
  document.getElementById('guess').disabled = false
  document.getElementById('submitBtn').disabled = false
  startGame()
}
startGame()