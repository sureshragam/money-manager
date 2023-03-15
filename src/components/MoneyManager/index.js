import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionsList: [],
    title: '',
    amount: '',
    type: 'INCOME',
    yourIncome: 0,
    yourExpense: 0,
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const id = uuidV4()
    const newTransaction = {id, title, amount, type}
    if (type === 'INCOME') {
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        title: '',
        amount: '',
        type: 'INCOME',
        yourIncome: prevState.yourIncome + parseInt(amount),
        yourExpense: prevState.yourExpense,
      }))
    } else {
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        title: '',
        amount: '',
        type: 'INCOME',
        yourExpense: prevState.yourExpense + parseInt(amount),
        yourIncome: prevState.yourIncome,
      }))
    }
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onAmountChange = event => {
    this.setState({amount: event.target.value})
  }

  onTypeChange = event => {
    this.setState({type: event.target.value})
  }

  onTransactionDelete = id => {
    console.log(id)

    this.setState(prevState => {
      const {amount, type} = prevState.transactionsList.filter(
        eachTransaction => eachTransaction.id === id,
      )[0]
      console.log(amount, type)

      const updatedList = prevState.transactionsList.filter(
        eachTransaction => eachTransaction.id !== id,
      )
      if (type === 'INCOME') {
        return {
          transactionsList: updatedList,
          yourIncome: prevState.yourIncome - amount,
          yourExpense: prevState.yourExpense,
        }
      }
      return {
        transactionsList: updatedList,
        yourIncome: prevState.yourIncome,
        yourExpense: prevState.yourExpense - amount,
      }
    })
  }

  render() {
    const {
      transactionsList,
      title,
      amount,
      type,
      yourIncome,
      yourExpense,
    } = this.state
    return (
      <div className="money-manager">
        <div className="row1">
          <h1 className="name">Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <div className="row2">
          <MoneyDetails
            name="Balance"
            amount={yourIncome - yourExpense}
            image="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
            color="green"
            type="balance"
          />
          {transactionTypeOptions.map(eachType => {
            const image = `https://assets.ccbp.in/frontend/react-js/money-manager/${eachType.displayText.toLowerCase()}-image.png`
            const color = eachType.displayText === 'Income' ? 'blue' : 'violet'
            const amountOut = color === 'blue' ? yourIncome : yourExpense
            return (
              <MoneyDetails
                name={eachType.displayText}
                amount={amountOut}
                image={image}
                color={color}
                type={eachType.displayText.toLowerCase()}
                key={eachType.displayText}
              />
            )
          })}
        </div>

        <div className="row3">
          <div className="col-1">
            <h1>Add Transaction</h1>
            <form onSubmit={this.onFormSubmit}>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                onChange={this.onTitleChange}
                value={title}
              />
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="text"
                onChange={this.onAmountChange}
                value={amount}
              />
              <label htmlFor="type">Type</label>
              <select id="type" onChange={this.onTypeChange} value={type}>
                <option value="INCOME">Income</option>
                <option value="EXPENSES">Expenses</option>
              </select>
              <button type="submit">Add</button>
            </form>
          </div>
          <div className="col-2">
            <h1>History</h1>
            <ul>
              <li>
                <p className="transaction-head">Title</p>
                <p className="transaction-head">Amount</p>
                <p className="transaction-head">Type</p>
                <p className="transaction-head"> </p>
              </li>
              {transactionsList.map(eachTransaction => (
                <TransactionItem
                  title={eachTransaction.title}
                  amount={eachTransaction.amount}
                  type={eachTransaction.type}
                  id={eachTransaction.id}
                  key={eachTransaction.id}
                  onTransactionDelete={this.onTransactionDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
