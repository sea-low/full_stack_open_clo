import ByeByeBtn from "./ByeByeBtn"

const DisplayPeople = ({persons, deleteHandler}) => {
    return (   
    <div>
        <h2>Numbers</h2>
        {
            persons.map((x) => {
                if(x.invisible === false) {
                    return <ul key={x.id}> {x.name} {x.number} <ByeByeBtn onClick={() => deleteHandler(x)}/></ul>
                }
            })
        }
    </div>
    )
}
export default DisplayPeople