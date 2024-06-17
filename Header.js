export default function Header({turno,numMosse}){

    let nomeGiocatore = turno === 1 ? "Giocatore 1" : "Giocatore 2";

    return(
        <div>
            <h1>Tris</h1>
            <p>Tocca al giocatore : {nomeGiocatore} </p>
            <p>Mosse effettuate : {numMosse} </p>

        </div>
    )

}


