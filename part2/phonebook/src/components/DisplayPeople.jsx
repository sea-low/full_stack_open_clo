const DisplayPeople = ({persons}) => (
    <div>
    <h2>Numbers</h2>
    {persons.map((x) => {
    if(x.invisible === false) {
    return <ul key={x.id}> {x.name} {x.number}</ul>
    }
    })}
    </div>
)
export default DisplayPeople