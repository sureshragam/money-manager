// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {name, amount, image, color, type} = props
  const moneyDetail = `money-detail ${color}`
  let SpecificTestId = 'balanceAmount'
  if (name !== 'Balance') {
    SpecificTestId = name === 'Income' ? 'incomeAmount' : 'expensesAmount'
  }

  return (
    <div className={moneyDetail}>
      <div className="amount-tab-col1">
        <img src={image} alt={type} />
      </div>
      <div className="amount-tab-col2">
        <p>Your {name}</p>
        <p data-testid={SpecificTestId}>Rs {amount}</p>
      </div>
    </div>
  )
}

export default MoneyDetails
