const PersonForm = ({onSubmit, onChange, formData}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input name="name" value={formData.name} onChange={onChange}/>
    </div>
    <div>
      number: <input name="number" value={formData.number} onChange={onChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)
export default PersonForm