import './index.css'

const PasswordItem = props => {
  const {passwordDetails, showOrHide, deletePassword} = props
  const {id, website, username, password} = passwordDetails
  const websiteInitial = website.slice(0, 1)

  const onDeletePassword = () => {
    deletePassword(id)
  }
  return (
    <li className="password-list-item">
      <div className="password-details-container">
        <div className="initial-container">
          <p className="initial">{websiteInitial}</p>
        </div>
        <div className="password-credentials-container">
          <p className="website">{website}</p>
          <p className="username">{username}</p>
          {showOrHide ? (
            <p className="password">{password}</p>
          ) : (
            <img
              className="stars-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        data-testid="delete"
        onClick={onDeletePassword}
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
