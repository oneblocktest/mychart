import React from 'react'

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>coin</th>
                <th>value</th>
                <th>price</th>
                <th>valuedata</th>

            </tr>
        </thead>
    )
}

const Tablebody = props => {
    const itemss = props.characterData.map((items, index) => {
        return (
            <tr className="able-danger" key={index}>
                <td>{items.coin}</td>
                <td> {items.value}</td>
                <td>{items.price}</td>
                <td>{items.valuedata}</td>

                <td>
                    <button onClick={() => props.removeCharacter(index)}>Delete</button>
                </td>
            </tr>

        )
    })

    return <tbody>{itemss}</tbody>
}

const Tableend = props=>{
       let Total=0
       const getdata=props.characterData
       for(var i=0;i<getdata.length;i++){
           Total=Total+getdata[i]["valuedata"]
       }
       return (
        <tr className="able-danger">
           <td>Total</td>
           <td>-</td>
           <td>-</td>
           <td>{Total}</td>
           <td>{Total*7.2}</td>
           </tr>
       )
}

const Table = (props) => {
    const { characterData, removeCharacter } = props
    return (
        <table className="table table-striped table-bordered">
            <TableHeader />
            <Tablebody characterData={characterData} removeCharacter={removeCharacter} />
            <Tableend characterData={characterData} />
        </table>
    );
}




    
   



export default Table