export default function Board({matrice,onClick,celleTris,gameOver}){

    let table = [];
    let color = "white";

    for(let i=0;i<3;i++){
        let row = [];
        for(let j=0;j<3;j++){
            let id = i*3+j;
            if(gameOver){
                let cellaTris = celleTris.find((cella)=> cella[0] === i && cella[1] === j);
                if(cellaTris !== undefined){
                    row.push(coloraCella(i,j,id));    
                }
                else{
                    row.push(cellaNormale(i,j,id));
                }
            }
            else{
                row.push(cellaNormale(i,j,id));
            }
            
            
            
        }
        table.push(<tr key={i}>{row}</tr>);
    }

    function coloraCella(i,j,id){
        return <td key={id} 
            style={{
                width:"150px",
                height:"150px",
                border:"1px solid black",
                backgroundColor:"yellow",
                textAlign:"center"
            }}
            onClick={()=> onClick(i,j)}>{matrice[i][j]}</td>;
    }

    function cellaNormale(i,j,id){
        return <td key={id} 
            style={{
                width:"150px",
                height:"150px",
                border:"1px solid black",
                textAlign:"center"
            }}
            onClick={()=> onClick(i,j)}>{matrice[i][j]}</td>;
    }

    return(
        <table>
            <tbody>
                {table}
            </tbody>
        </table>
    )

}