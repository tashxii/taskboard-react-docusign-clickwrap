import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Input, Button, Select, Checkbox } from "antd"
import Modal from "../basics/Modal"
import { UserCreateRequest } from "../../libs/models/user"
import Avatar from "../basics/Avatar"
import ErrorCard from "../basics/ErrorCard"
import I18n from "../../libs/common/i18n"
import ApplicationSetting from "../../libs/common/applicationSetting"
import TermsOfConditionsView from "./TermsOfConditionsView" 

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      password: "",
      avatar: ApplicationSetting.getAvatars()[0],
      showTermsAndCondsDialog: false,
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleAvatarChange = this.handleAvatarChange.bind(this)
    this.toggleShowTermsAndCondsDialog = this.toggleShowTermsAndCondsDialog.bind(this)
  }

  render() {
    const avatars = ApplicationSetting.getAvatars()
    const registerLabel = (!this.props.loginState.isSignUpProcessing) ? I18n.get("登録") : I18n.get("登録中")
    const disabled = this.props.loginState.isSignUpProcessing || this.state.name === ""
    return (
      <div>
        <Col>
          <Row>
            <div style={{ fontSize: "20px", color: "dodgerblue", textDecoration: "underline", marginBottom: "10px" }}>
              {I18n.get("新しいユーザー")}
            </div>
          </Row>
          <Row >
            <Input
              placeholder={I18n.get("アカウント")}
              autoFocus={true}
              onChange={(e) => this.handleTextChange(e, "name")}
            />
          </Row>
          <Row>
            <Input.Password
              placeholder={I18n.get("パスワード")}
              onChange={(e) => this.handleTextChange(e, "password")}
            />
          </Row>
          <Row>
            <Select
              style={{ marginRight: "20px", width: "200px", verticalAlign: "top" }}
              onChange={this.handleAvatarChange}
              value={this.state.avatar}
              dropdownMatchSelectWidth={false}
            >
              {avatars.map(value => {
                return (
                  <Select.Option key={value}>
                    <Avatar avatar={value} size={"20px"} /> {value}
                  </Select.Option>
                )
              })}
            </Select>
            <div style={{ display: "inline-block", border: "solid 1px gray", marginTop: "5px" }}>
              <Avatar avatar={this.state.avatar} size={"100px"} />
            </div>
          </Row>
          {
            this.props.loginState.signUpError ?
              <ErrorCard errorMessage={this.props.loginState.signUpError} />
              : null
          }
          <Row>
            <Checkbox onChange={this.toggleShowTermsAndCondsDialog}>Agree Terms and Conditions</Checkbox>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              onClick={
                () => {
                  this.props.onSignUpButtonClick(
                    new UserCreateRequest(
                      this.state.name,
                      this.state.password,
                      this.state.avatar,
                    ))
                }
              }
              disabled={disabled}
              loading={this.props.loginState.isLoginProcessing}
              style={{ float: "right" }}
            >
              {registerLabel}
            </Button>
          </Row>
        </Col>

        <Modal
          visible={this.state.showTermsAndCondsDialog}
          onCancel={this.toggleShowTermsAndCondsDialog}
          footer={null}
          destroyOnClose
          width={500}
        >
          <div>
            Terms and Conditions is loading. Please wait a while.<br/>
            After press "Agree" button, close this window.
            <TermsOfConditionsView/>
          </div>
        </Modal>        
      </div>
    )
  }

  handleTextChange(e, key) {
    this.setState({ [key]: e.target.value })
  }

  handleAvatarChange(value) {
    this.setState({ avatar: value })
  }

  toggleShowTermsAndCondsDialog(e) {
    this.setState({
      showTermsAndCondsDialog: !this.state.showTermsAndCondsDialog,
    })    
  }
}

SignUpForm.propTypes = {
  loginState: PropTypes.object.isRequired,
  onSignUpButtonClick: PropTypes.func.isRequired,
}

export default SignUpForm
