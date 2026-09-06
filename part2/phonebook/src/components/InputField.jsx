const InputField = ({ field, value, onChange }) => (
  <div>
    {field}: <input value={value} onChange={onChange} />
  </div>
)

export default InputField