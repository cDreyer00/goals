import "./goal.scss"

export default function Goal(props) {
   const { status, title, description, date, value } = props;

   return (
      <div className="goalContainer">
         <section className="goalInformations">
            <p className="goalDate">2023/01/01</p>
            <section className="goalMainInfos">
            <h1>Goal title</h1>
            <p>Goal descriptionGoal description Goal descriptionGoal descriptionGoal description</p>
            <p>R$ 999,99</p>
            </section>
         </section>

         <section className="goalStatusBackground">
            <div className="goalCheckBackground">
               <span className="goalCheck" />
            </div>
         </section>

      </div>
   )
}