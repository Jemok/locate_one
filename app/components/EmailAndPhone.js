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
  registrationFormData,
  startRegistrationProcess,
  registerAccount,
  setAppAsOld,
  registrationContactData
} from '../actions';

import SplashScreen from 'react-native-splash-screen';
// import Spinner from 'react-native-loading-spinner-overlay';


class EmailAndPhone extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
        SplashScreen.hide();
  }

  // onSubmitRegistrationForm(){
  //     this.props.userRegistration(true);
  //
  //     this.props.accountCreation(this.props.locateApplication.registrationFormData, this.props.locateApplication.myAgentDetails);
  // }



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

  this.props.saveContactFormData(formData)

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
        for (var i = 0; i < this.props.locateApplication.emailAndPhoneFormFields.length; i++) {
          if(self.refs.createAccountForm.refs[this.props.locateApplication.emailAndPhoneFormFields[i].field].valid == true)
          {
            console.log(i);
            if(i == 1){
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
      <Button transparent onPress={() => Actions.password()}>
          <Icon name="md-checkmark"  style={{fontSize: 30}}></Icon>
      </Button>
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
                Email and Phone
            </Title>

            {this.showSuccessButton()}

          </Header>
          <Content>
          {/* <View style={{ flex: 1, zIndex: 2 }} >
            <Spinner visible={this.props.locateApplication.registrationStarted}  textStyle={{color: '#FFF'}} overlayColor="blue"  />
          </View> */}

            <View style={styles.accountView}>
              <Text style={styles.accountInfoText}>
                Email and Phone number will be used for:
              </Text>
              <Text style={styles.accountInfoText}>
              1. Email for notifications and login in
              </Text>
              <Text style={styles.accountInfoText}>
              2. Phone number for notifications
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
        name={this.checkFieldValidation('phone_number')}
         size={30}
         style={[
           {opacity: 0, color:"#61d062", left: 250}
           ,
           ((self)=>{
             //console.log(self.refs.createAccountForm);
             //i can change the style of the component related to the attibute of example_input_field
             if(Object.keys(self.refs).length !== 0){
                 if(self.refs.createAccountForm.refs.phone_number.valid == false)
                 {
                   console.log(self.refs.createAccountForm.refs);
                   console.log('email valid is '+ self.refs.createAccountForm.refs.phone_number.valid);

                    return {color:'#d52222', opacity: 1}
                 }else if (self.refs.createAccountForm.refs.phone_number.valid == true) {
                   console.log(self.refs.createAccountForm.refs);

                   console.log('email valid is'+ self.refs.createAccountForm.refs.phone_number.valid);
                     return {color:'#61d062', opacity: 1}
                 }

             }
             }
           )(this)
         ]}
         />
         </View>
         <InputField

         //placeholder='Phone ' if label is present the field is rendered with the value on the left (see First Name example in the gif), otherwise its rendered with textinput at full width (second name in the gif).
         ref='phone_number' // used in onChange event to collect
         value='254'
         validationFunction={(value)=>{
          console.log('phone number value is'+value);
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

           characters = 13;
           if(value.length > characters){
             return "Phone number can't be long than "+characters+" characters.";
           }
           if(value.length < 13){
             return "Phone number can't be less than "+characters+" characters.";
           }

           if (/\D/.test(value)) {
               return "Phone number can only be numbers";
           }

            return true;
         }
       }
       />
       <View>
       <Text style={styles.helpText}>
       {((self)=>{
          if(Object.keys(self.refs).length !== 0){
            if(self.refs.createAccountForm.refs.phone_number.valid == false){
               // if(self.refs.createAccountForm.refs.email.validationErrors.length !== 0){
                 return self.refs.createAccountForm.refs.phone_number.validationErrors.join("\n");
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
    saveContactFormData: (formData) => {
      dispatch(registrationContactData(formData))
    },
    userRegistration: (status) => {
      dispatch(startRegistrationProcess(status))
    },
    accountCreation: (formData, myAgentDetails) => {
      dispatch(registerAccount(formData, myAgentDetails))
    },
    setOld: (status) => {
      dispatch(setAppAsOld(status))
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
    marginTop: 20,
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
  }
});
export default connect(stateToProps, mapDispatchToProps)(EmailAndPhone);
