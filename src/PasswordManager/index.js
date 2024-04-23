import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    noOfPasswords: 0,
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    isChecked: false,
    searchInput: '',
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput, isChecked} = this.state
    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      noOfPasswords: prevState.noOfPasswords + 1,
    }))
  }

  deletePassword = id => {
    const {passwordsList} = this.state
    const updatedPasswordList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState(prevState => ({
      passwordsList: updatedPasswordList,
      noOfPasswords: prevState.noOfPasswords - 1,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  renderNoPasswordsContainer = () => {
    return (
      <>
        <img
          className="no-passwords-img"
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
        />
        <p className="no-passwords-text">No Passwords</p>
      </>
    )
  }

  renderPasswordsContainer = () => {
    const {passwordsList, isChecked, searchInput} = this.state
    const searchResults = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (searchResults.length === 0) {
      return this.renderNoPasswordsContainer()
    }
    return (
      <ul className="password-list-container">
        {searchResults.map(eachPassword => (
          <PasswordItem
            key={eachPassword.id}
            passwordDetails={eachPassword}
            showOrHide={isChecked}
            deletePassword={this.deletePassword}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {websiteInput, usernameInput, passwordInput, noOfPasswords, searchInput}= this.state
    return (
      <div className="app-container">
        <div className="password-manager-app-container">
          <img
            className="logo-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
          <div className="add-password-container">
            <img
              className="password-manager-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
            <form className="form" onSubmit={this.onAddPassword}>
              <h1 className="add-password-text">Add New Password</h1>
              <div className="input-container">
                <div className="input-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-image"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteInput}
                  value={websiteInput}
                />
              </div>
              <div className="input-container">
                <div className="input-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-image"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsernameInput}
                  value={usernameInput}
                />
              </div>
              <div className="input-container">
                <div className="input-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-image"
                  />
                </div>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.onChangePasswordInput}
                  value={passwordInput}
                />
              </div>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="password-manager-container">
            <div className="password-manager-header-container">
              <div className="your-passwords-container">
                <h1 className="your-passwords-text">Your Passwords</h1>
                <p className="passwords-count">{noOfPasswords}</p>
              </div>
              <div className="password-search-container">
                <div className="search-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-icon"
                  />
                </div>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="line" />
            <div className="show-passwords-container">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onChange={this.toggleShowPassword}
              />
              <label className="show-passwords-text" htmlFor="checkbox">
                Show Passwords
              </label>
            </div>
            <div className="passwords-container">
              {noOfPasswords === 0 && this.renderNoPasswordsContainer()}
              {noOfPasswords > 0 && this.renderPasswordsContainer()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
