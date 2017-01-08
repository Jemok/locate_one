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
  CheckBox,
  Spinner
} from 'native-base';

import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

import { connect } from 'react-redux';

import {
  toogleCreateAccountLoadingSpinner,
  registrationFormData,
  startRegistrationProcess,
  registerAccount,
  setAppAsOld,
  showPassword,
  registrationPasswordData
} from '../actions';

import SplashScreen from 'react-native-splash-screen';


class Password extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
        SplashScreen.hide();
  }

  onSubmitRegistrationForm(){
      this.props.userRegistration(true);

    //  console.log(registrationFormData);

    console.log(this.props.locateApplication.registrationFormDataPassword);

      this.props.accountCreation(
          this.props.locateApplication.registrationFormData,
          this.props.locateApplication.registrationFormDataContact,
          this.props.locateApplication.registrationFormDataPassword,
         this.props.locateApplication.myAgentDetails
       );
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

  this.props.savePasswordFormData(formData)

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


checkFormValidity(){
  let validity;

  //console.log(this.props.locateApplication.createAccountFormFields);
  ((self) => {

    if(Object.keys(self.refs).length !== 0){
        for (var i = 0; i < this.props.locateApplication.passwordFormFields.length; i++) {
          if(self.refs.createAccountForm.refs[this.props.locateApplication.passwordFormFields[i].field].valid == true)
          {
            console.log(i);
            if(i == 0){
              validity = true;
            }
          }
        }
    }
  })(this);


  return validity;


  // if(validity == true){
  //   return (
  //     <Footer>
  //       <View >
  //       <Button style={{width: 180}} success onPress={() => this.onSubmitRegistrationForm()}>
  //           <Icon name="ios-checkmark-circle"></Icon>
  //           CREATE MY ACCOUNT
  //       </Button>
  //       </View>
  //     </Footer>
  //   );
  // }

}

showSuccessButton(){
  if(this.checkFormValidity() == true){
    return(
      <Button transparent onPress={() => this.onSubmitRegistrationForm()}>
          <Icon name="md-checkmark"  style={{fontSize: 30}}></Icon>
      </Button>
    );
  }
}

showMyPassword(value){
  this.props.viewPassword(value);
}

passwordText(){
  if(this.props.locateApplication.showPassword){
    return(
    <Text success style={styles.showPassword} onPress={() => this.showMyPassword(false)}>Show Password</Text>
    )
  }else {
    return(
    <Text success style={styles.showPassword} onPress={() => this.showMyPassword(true)}>Hide Password</Text>
  )
  }
}

showSpinner(){

  if(this.props.locateApplication.registrationStarted){

    return (
        <Spinner color='green' />
    );
  }
}


  render() {
    return (
        <Container>
          <Header style={styles.navHeader}>
              <Button transparent onPress={() => Actions.pop()}>
                  <Icon name="md-arrow-back"></Icon>
              </Button>
            <Title>
                Password
            </Title>

            {this.showSuccessButton()}

          </Header>
          <Content>


            <View style={styles.accountView}>
              <Text style={styles.accountInfoText}>
                Password will be used for:
              </Text>
              <Text style={styles.accountInfoText}>
              1. Securing your account
              </Text>
              <Text style={styles.accountInfoText}>
              2. Login into your account
              </Text>
            </View>
            <View style={styles.accountFormView}>


            <View style={{zIndex: 2 }} >
              {this.showSpinner()}
            </View>
      <ScrollView keyboardShouldPersistTaps={true} style={{height:100}}>
      <Form
        style={{paddingLeft:10}}
        ref='createAccountForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        >

        <View style={styles.field}>
        {this.passwordText()}

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
  secureTextEntry={this.props.locateApplication.showPassword}
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



</Form>
{/* <Text>{JSON.stringify(this.state.formData)}</Text> */}
 </ScrollView>
</View>
<View>
</View>

      </Content>
        {/* {this.showFooter()} */}
        </Container>
    );
  }
}

const stateToProps = (state) => {
  return {
      locateApplication: state.locateApplication
 	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    savePasswordFormData: (formData) => {
      dispatch(registrationPasswordData(formData))
    },
    userRegistration: (status) => {
      dispatch(startRegistrationProcess(status))
    },
    accountCreation: (formData, formDataContact, formDataPassword, myAgentDetails) => {
      dispatch(registerAccount(formData, formDataContact, formDataPassword,  myAgentDetails))
    },
    setOld: (status) => {
      dispatch(setAppAsOld(status))
    },
    viewPassword: (status) => {
      dispatch(showPassword(status))
    }
  }
}

// Styles
const styles = StyleSheet.create({
  accountView: {
    marginTop: 20,
    left: 25
  },
  navHeader: {
    backgroundColor: '#3aaf85'
  },
  accountInfoText: {
    fontSize: 12
  },
  accountFormView: {
    marginTop: 40,
    left: 10,
    width: 290,
    height: 200
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
    top: 15
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
  showPassword: {
    alignSelf: 'center',
    color: '#3aaf85',
    padding: 20
  }
});
export default connect(stateToProps, mapDispatchToProps)(Password);
