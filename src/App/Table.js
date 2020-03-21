import React, { Component } from 'react'

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

const Tabelbody = props => {
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

const Table = (props) => {
    const { characterData, removeCharacter } = props
    return (
        <table className="table table-striped table-bordered">
            <TableHeader />
            <Tabelbody characterData={characterData} removeCharacter={removeCharacter} />
        </table>
    );
}




    
   



export default Table