// Write your code here
import './index.css'

const TransactionItem = props => {
  const {title, amount, type, id, onTransactionDelete} = props
  const onDelete = () => {
    onTransactionDelete(id)
  }
  return (
    <li>
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>
        {type[0].toUpperCase() + type.substring(1, type.length).toLowerCase()}
      </p>
      <button
        className="delete-button"
        type="button"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
