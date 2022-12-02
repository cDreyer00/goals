import "./goal.scss"

export default function Goal(props) {
   const { status, title, description, date, price } = props;
   
   return (
      <div className="goalContainer">
         <section className="goalInformations">
            <p className="goalDate">{date}</p>
            <section className="goalMainInfos">
            <h1>{title}</h1>
            <p>{description}</p>
            </section>
            <p className="goalPrice">R${price}</p>
         </section>

         <section className="goalStatusBackground">
            <div className="goalCheckBackground">
               <span className="goalCheck" />
            </div>
         </section>

      </div>
   )
}