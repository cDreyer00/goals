import "./input.scss"

export function Input(props) {
   const { value, type, placeHolder, onChange } = props;

   return (
      <input className="input" type={type} placeholder={placeHolder} value={value} onChange={onChange} />
   )
}

export function Button(props) {

   const { content, borderColor, handleClick } = props;

   return (
      <button className="button" style={{ border: `1px solid ${borderColor}` }}>{content}</button>
   )
}