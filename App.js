import './App.css';

import React from 'react';

import Header from './components/Tris/Header';
import Board from './components/Tris/Board';
import Risultati from './components/Tris/Risultati';
//Applicazione che implementa il gioco del tris
function App() {
  
  const [numeroMosseEffettuate, setNumeroMosseEffettuate] = React.useState(0);
  const [turnoGiocatore,setTurnoGiocatore] = React.useState(1);
  const [gameOver,setGameOver] = React.useState(false);
  const [celleTris,setCelleTris] = React.useState([]);
  const [punteggio,setPunteggio] = React.useState([0,0]);
  //Inizializza la matrice di gioco con celle vuote (0)
  const [matriceGioco, setMatriceGioco] = React.useState([
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ]);
  //Oppure 
  //const [matriceGioco, setMatriceGioco] = React.useState(Array(3).fill(Array(3).fill(0)));
  const onClick = (i,j) => {
    
    let matrice = [...matriceGioco];
    if(matrice[i][j] !== 0 || gameOver){
      alert("Mossa non valida");
      return;
    }

    let value = turnoGiocatore === 1 ? "X" : "O";
    matrice[i][j] = value;

    //La funzione checkTris() restituisce un array di due elementi
    //Il primo elemento è un booleano che indica se c'è un tris
    //Il secondo elemento è un array di celle che compongono il tris
    let [tris,celleTris] = checkTris();
    if(tris){
      setCelleTris(celleTris);
      alert("Ha vinto il giocatore " + turnoGiocatore);
      let punteggioAggiornato = [...punteggio];
      punteggioAggiornato[turnoGiocatore-1] += 1;
      setPunteggio(punteggioAggiornato);
      setGameOver(true);
      
    }

    let numeroMosse = numeroMosseEffettuate;
    if(numeroMosse === 9 && !tris){
      console.log("Pareggio");
      alert("Pareggio");
      setGameOver(true);
    }

    setMatriceGioco(matrice);
    setNumeroMosseEffettuate(numeroMosse+1);
    setTurnoGiocatore(turnoGiocatore === 1 ? 2 : 1);

  }

  function checkTris(){

      let celleDaColorare = [];
      //Controllo righe
      for(let i=0;i<3;i++){
        if(matriceGioco[i][0] !== 0 && matriceGioco[i][0] === matriceGioco[i][1] && matriceGioco[i][1] === matriceGioco[i][2]){
          celleDaColorare.push([i,0]);
          celleDaColorare.push([i,1]);
          celleDaColorare.push([i,2]);
          
          return [true,celleDaColorare];
        }
      }
      
      //Controllo colonne
      for(let i=0;i<3;i++){
        if(matriceGioco[0][i] !== 0 && matriceGioco[0][i] === matriceGioco[1][i] && matriceGioco[1][i] === matriceGioco[2][i]){
          celleDaColorare.push([0,i]);
          celleDaColorare.push([1,i]);
          celleDaColorare.push([2,i]);

          return [true,celleDaColorare];
        }
      }

      //Controllo diagonali
      if(matriceGioco[0][0] !== 0 && matriceGioco[0][0] === matriceGioco[1][1] && matriceGioco[1][1] === matriceGioco[2][2]){
        
        celleDaColorare.push([0,0]);
        celleDaColorare.push([1,1]);
        celleDaColorare.push([2,2]);
        
        return [true,celleDaColorare];
      }

      if(matriceGioco[0][2] !== 0 && matriceGioco[0][2] === matriceGioco[1][1] && matriceGioco[1][1] === matriceGioco[2][0]){
        celleDaColorare.push([0,2]);
        celleDaColorare.push([1,1]);
        celleDaColorare.push([2,0]);
        
        return [true,celleDaColorare];
      }

      return [false,null];
  }

  function reset(){
    setNumeroMosseEffettuate(0);
    setTurnoGiocatore(1);
    setGameOver(false);
    setCelleTris([]);
    setMatriceGioco([
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ]);
  }
  
  if(gameOver){
    //Ripristina lo stato iniziale
    return(
      <>
        <Header turno={turnoGiocatore} numMosse={numeroMosseEffettuate}/>
        
        <button onClick={reset}>Rigioca</button>
        
        <Board matrice={matriceGioco} onClick={onClick} celleTris={celleTris} gameOver={gameOver}/> 
        <Risultati punteggio={punteggio}/>
      </>
    );

  }
  
  return(
    <>
      <Header turno={turnoGiocatore} numMosse={numeroMosseEffettuate}/>
      <Board matrice={matriceGioco} onClick={onClick} celleTris={celleTris} gameOver={gameOver}/> 
      <Risultati punteggio={punteggio}/>
    </>
  );

}

export default App;
