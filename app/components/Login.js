/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Footer,
  Icon,
  CheckBox
} from 'native-base';

import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

import { connect } from 'react-redux';

import {
  toogleCreateAccountLoadingSpinner,
  loginFormData,
  startUserLoginProcess,
  loginUser,
  setAppAsOld
} from '../actions';

import SplashScreen from 'react-native-splash-screen';
import Spinner from 'react-native-loading-spinner-overlay';


class Login extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
        SplashScreen.hide();
  }

  onSubmitLoginForm(){
      this.props.startUserLogin(true);

      this.props.loginProcess(this.props.locateApplication.loginFormData);
  }



  handleFormChange(formData){
  /*
  formData will contain all the values of the form,
  in this example.

  formData = {
  first_name:"",
  last_name:"",
  gender: '',  this.setState({formData:formData});

  birthday: Date,
  has_accepted_conditions: bool
  }
  */

  this.props.setLoginData(formData)

  // this.setState({formData:formData});
  this.props.onFormChange && this.props.onFormChange(formData);

}

handleFormFocus(e, component){
  //console.log(e, component);
}
openTermsAndConditionsURL(){

}


checkNameValidation(field){
  let icon_name = 'ios-close-circle';
  ((self) => {

    if(Object.keys(self.refs).length !== 0){

        if(self.refs.createAccountForm.refs[field].valid == false)
        {
           icon_name = 'ios-close-circle';
        }else if (self.refs.createAccountForm.refs[field].valid == true) {

           icon_name = 'ios-checkmark-circle';
        }
    }
  })(this);
  return icon_name;
}

checkFieldValidation(field){
  let icon_name = 'ios-close-circle';
  ((self) => {

    if(Object.keys(self.refs).length !== 0){

        if(self.refs.createAccountForm.refs[field].valid == false)
        {
           icon_name = 'ios-close-circle';
        }else if (self.refs.createAccountForm.refs[field].valid == true) {

           icon_name = 'ios-checkmark-circle';
        }
    }
  })(this);
  return icon_name;
}


showFooter(){
  let validity;

  console.log(this.props.locateApplication.loginFormFields);
  ((self) => {

    if(Object.keys(self.refs).length !== 0){
        for (var i = 0; i < this.props.locateApplication.loginFormFields.length; i++) {
          if(self.refs.createAccountForm.refs[this.props.locateApplication.loginFormFields[i].field].valid == true)
          {
            console.log(i);
            if(i == 1){
              validity = true;
            }
          }
        }

    }
  })(this);

  if(validity == true){
    return (
      <Footer>
        <View >
        <Button style={{width: 180}} success onPress={() => this.onSubmitLoginForm()}>
            <Icon name="ios-checkmark-circle"></Icon>
            LOGIN TO MY ACCOUNT
        </Button>
        </View>
      </Footer>
    );
  }

}

showLoginError(){
  if(this.props.locateApplication.loginError.error != null){
    return(
      <View style={styles.errorView}>
      <Text style={styles.errorText}>The user credentials were incorrect</Text>
      </View>
    );
  }
}

showBackButton(){
  if(this.props.routes.scene.name != "login_from_reg"){
    return(
      <Button transparent onPress={() => Actions.pop()}>
          <Icon name="md-arrow-back"></Icon>
      </Button>
    );
  }
}

  render() {
    return (
        <Container>
          <Header>
            {this.showBackButton()}
            <Title>
                Login
            </Title>
          </Header>
          <Content>
          <View style={{ flex: 1, zIndex: 2 }} >
            <Spinner visible={this.props.locateApplication.registrationStarted}  textStyle={{color: '#FFF'}} overlayColor="blue"  />
          </View>

            <View style={styles.accountView}>
              <Text style={styles.accountInfoText}>
                Login using the form below
              </Text>

              <Text style={styles.accountInfoText}>
                You must provide your email and password
              </Text>

            </View>
            <View style={styles.accountFormView}>
      <ScrollView keyboardShouldPersistTaps={true} style={{height:100}}>
      <Form
        style={{paddingLeft:10}}
        ref='createAccountForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        >


  <View style={styles.fieldEmail}>
  <Icon
   name={this.checkFieldValidation('email')}
    size={30}
    style={[
      {opacity: 0, color:"#61d062", left: 250}
      ,
      ((self)=>{
        //console.log(self.refs.createAccountForm);
        //i can change the style of the component related to the attibute of example_input_field
        if(Object.keys(self.refs).length !== 0){
            if(self.refs.createAccountForm.refs.email.valid == false)
            {
              console.log(self.refs.createAccountForm.refs);
              console.log('email valid is '+ self.refs.createAccountForm.refs.email.valid);

               return {color:'#d52222', opacity: 1}
            }else if (self.refs.createAccountForm.refs.email.valid == true) {
              console.log(self.refs.createAccountForm.refs);

              console.log('email valid is'+ self.refs.createAccountForm.refs.email.valid);
                return {color:'#61d062', opacity: 1}
            }
        }
        }
      )(this)
    ]}
    />
    </View>
    <InputField
    placeholder='Email' // if label is present the field is rendered with the value on the left (see First Name example in the gif), otherwise its rendered with textinput at full width (second name in the gif).
    ref='email' // used in onChange event to collect
    keyboardType='email-address'
    validationFunction={(value)=>{
     console.log('email value is'+value);
      /*
      you can have multiple validators in a single function or an array of functions
       */
      if(value == '' || value == undefined){
        return "Required";
      }
      //Initial state is null/undefined
      if(!value){
        return true;
      }

      // Validate emai syntax
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(!re.test(value)){
          return 'Invalid email';
      }
      return true;
    }
  }
/>
<View>
<Text style={styles.helpText}>
{((self)=>{
     if(Object.keys(self.refs).length !== 0){
       if(self.refs.createAccountForm.refs.email.valid == false){
          // if(self.refs.createAccountForm.refs.email.validationErrors.length !== 0){
            return self.refs.createAccountForm.refs.email.validationErrors.join("\n");
          // }
       }
     }
     // if(!!(self.refs && self.refs.first_name.valid)){
     // }
   })(this)}
</Text>
</View>



<View style={styles.field}>
<Icon
 name={this.checkFieldValidation('password')}
  size={30}
  style={[
    {opacity: 0, color:"#61d062", left: 250}
    ,
    ((self)=>{
      //console.log(self.refs.createAccountForm);
      //i can change the style of the component related to the attibute of example_input_field
      if(Object.keys(self.refs).length !== 0){
          if(self.refs.createAccountForm.refs.password.valid == false)
          {
            console.log(self.refs.createAccountForm.refs);
            console.log('email valid is '+ self.refs.createAccountForm.refs.password.valid);

             return {color:'#d52222', opacity: 1}
          }else if (self.refs.createAccountForm.refs.password.valid == true) {
            console.log(self.refs.createAccountForm.refs);

            console.log('password valid is'+ self.refs.createAccountForm.refs.password.valid);
              return {color:'#61d062', opacity: 1}
          }

      }
      }
    )(this)
  ]}
  />
  </View>
  <InputField
  placeholder='Password' //if label is present the field is rendered with the value on the left (see First Name example in the gif), otherwise its rendered with textinput at full width (second name in the gif).
  ref='password' // used in onChange event to collect
  secureTextEntry={true}
  validationFunction={(value)=>{
   console.log('password value is'+value);
    /*
    you can have multiple validators in a single function or an array of functions
     */
    if(value == '' || value == undefined){
      return "Required";
    }
    //Initial state is null/undefined
    if(!value){
      return true;
    }

    if(value.length < 6){
      return "Password must contain at least 6 characters";
    }

    re = /[0-9]/;
    if(!re.test(value)) {
      return "Password must contain at least one number (0-9)!";
    }

    re = /[a-z]/;
     if(!re.test(value)) {
      return  "Password must contain at least one lowercase letter (a-z)!";
       return false;
     }
     re = /[A-Z]/;
    if(!re.test(value)) {
      return "Password must contain at least one uppercase letter (A-Z)!";
    }
     return true;
  }
}
/>
<View>
<Text style={styles.helpText}>
{((self)=>{
   if(Object.keys(self.refs).length !== 0){
     if(self.refs.createAccountForm.refs.password.valid == false){
        // if(self.refs.createAccountForm.refs.email.validationErrors.length !== 0){
          return self.refs.createAccountForm.refs.password.validationErrors.join("\n");
        // }
     }
   }
   // if(!!(self.refs && self.refs.first_name.valid)){
   // }
 })(this)}
</Text>
</View>

{this.showLoginError()}

</Form>

{/* <Text>{JSON.stringify(this.state.formData)}</Text> */}
 </ScrollView>
</View>
<View>
</View>

      </Content>
        {this.showFooter()}
        </Container>
    );
  }
}

const stateToProps = (state) => {
  return {
      routes: state.routes,
      locateApplication: state.locateApplication
 	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginData: (formData) => {
      dispatch(loginFormData(formData))
    },
    startUserLogin: (status) => {
      dispatch(startUserLoginProcess(status))
    },
    loginProcess: (formData) => {
      dispatch(loginUser(formData))
    },
    setOld: (status) => {
      dispatch(setAppAsOld(status))
    }
  }
}

// Styles
const styles = StyleSheet.create({
  accountView: {
    marginTop: 30,
    left: 25,
  },
  accountInfoText: {
    fontSize: 12
  },
  accountFormView: {
    top: 0,
    left: 10,
    width: 290,
    height: 380
  },
  termsAndConditions: {
    left: 35
  },
  acceptTermsAndConditions: {
    top: 15,
    left: 130,
    height: 50
  },
  createLocateAccount: {
    left: 43
  },
  fieldName: {
    top: 20
  },
  fieldEmail:{
    top: 20
  },
  helpText:{
    top: -5,
    left: 10,
    color: "#d52222",
    fontSize: 12,
    fontWeight: 'bold'
  },
  errorView:{
    marginLeft: 20
  },
  errorText:{
    color: 'red',
    fontWeight: 'bold'
  }
});
export default connect(stateToProps, mapDispatchToProps)(Login);
