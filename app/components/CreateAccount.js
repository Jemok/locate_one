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
  setAppAsOld
} from '../actions';

import SplashScreen from 'react-native-splash-screen';
// import Spinner from 'react-native-loading-spinner-overlay';


class CreateAccount extends Component {
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

  this.props.setRegistrationData(formData)

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
        for (var i = 0; i < this.props.locateApplication.createAccountFormFields.length; i++) {
          if(self.refs.createAccountForm.refs[this.props.locateApplication.createAccountFormFields[i].field].valid == true)
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
      <Button transparent onPress={() => Actions.email_and_phone()}>
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
                Create account
            </Title>

            {this.showSuccessButton()}

          </Header>
          <Content>
          {/* <View style={{ flex: 1, zIndex: 2 }} >
            <Spinner visible={this.props.locateApplication.registrationStarted}  textStyle={{color: '#FFF'}} overlayColor="blue"  />
          </View> */}

            <View style={styles.accountView}>
              <Text style={styles.accountInfoText}>
                This account will:
              </Text>
              <Text style={styles.accountInfoText}>
              1. Allow you to checkout on e-commerce websites
              </Text>
              <Text style={styles.accountInfoText}>
              2. Let you Log in to your Locate Account
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

        <View style={styles.fieldName}>
        <Icon
         name={this.checkFieldValidation('first_name')}
          size={30}
          style={[
            {opacity: 0, color:"#61d062", left: 250}
            ,
            ((self)=>{
              //console.log(self.refs.createAccountForm);
              //i can change the style of the component related to the attibute of example_input_field
              if(Object.keys(self.refs).length !== 0){
                  if(self.refs.createAccountForm.refs.first_name.valid == false)
                  {
                    console.log(self.refs.createAccountForm);
                    console.log('name valid is '+ self.refs.createAccountForm.refs.first_name.valid);

                     return {color:'#d52222', opacity: 1}
                  }else if (self.refs.createAccountForm.refs.first_name.valid == true) {
                    console.log(self.refs.createAccountForm.refs);

                    console.log('name valid is'+ self.refs.createAccountForm.refs.first_name.valid);
                      return {color:'#61d062', opacity: 1}
                  }

              }
              }
            )(this)
          ]}
          />
          </View>
          <InputField

          placeholder='First Name' // if label is present the field is rendered with the value on the left (see First Name example in the gif), otherwise its rendered with textinput at full width (second name in the gif).
          ref='first_name' // used in onChange event to collect

         validationFunction={(value)=>{

           console.log('name value is '+ value);
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

            var words = 255;

            if(value.length > words){
              return "Name can't be long than "+words+" words.";
            }

            //Check if First Name Contains Numbers
            var matches = value.match(/\d+/g);
            if (matches != null) {
                return "Name can't contain numbers";
            }

            return true;
          }
        }
  />
  <View>
  <Text style={styles.helpText}>
  {((self)=>{
           if(Object.keys(self.refs).length !== 0){
             if(self.refs.createAccountForm.refs.first_name.valid == false){
              //  if(self.refs.createAccountForm.refs.name.validationErrors.length !== 0){
                 //console.log(Object.keys(self.refs.createAccountForm.refs.name.validationErrors).length);
                 return self.refs.createAccountForm.refs.first_name.validationErrors.join("\n");
              //  }
             }

           }
           // if(!!(self.refs && self.refs.first_name.valid)){
           // }
         })(this)}
  </Text>
  </View>


  <View style={styles.fieldName}>
  <Icon
   name={this.checkFieldValidation('last_name')}
    size={30}
    style={[
      {opacity: 0, color:"#61d062", left: 250}
      ,
      ((self)=>{
        //console.log(self.refs.createAccountForm);
        //i can change the style of the component related to the attibute of example_input_field
        if(Object.keys(self.refs).length !== 0){
            if(self.refs.createAccountForm.refs.last_name.valid == false)
            {
              console.log(self.refs.createAccountForm);
              console.log('name valid is '+ self.refs.createAccountForm.refs.last_name.valid);

               return {color:'#d52222', opacity: 1}
            }else if (self.refs.createAccountForm.refs.last_name.valid == true) {
              console.log(self.refs.createAccountForm.refs);

              console.log('name valid is'+ self.refs.createAccountForm.refs.last_name.valid);
                return {color:'#61d062', opacity: 1}
            }

        }
        }
      )(this)
    ]}
    />
    </View>
    <InputField

    placeholder='Last Name' // if label is present the field is rendered with the value on the left (see First Name example in the gif), otherwise its rendered with textinput at full width (second name in the gif).
    ref='last_name' // used in onChange event to collect

   validationFunction={(value)=>{

     console.log('name value is '+ value);
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

      var words = 255;

      if(value.length > words){
        return "Last Name can't be long than "+words+" words.";
      }

      //Check if First Name Contains Numbers
      var matches = value.match(/\d+/g);
      if (matches != null) {
          return "Last Name can't contain numbers";
      }

      return true;
    }
  }
/>
<View>
<Text style={styles.helpText}>
{((self)=>{
     if(Object.keys(self.refs).length !== 0){
       if(self.refs.createAccountForm.refs.last_name.valid == false){
        //  if(self.refs.createAccountForm.refs.name.validationErrors.length !== 0){
           //console.log(Object.keys(self.refs.createAccountForm.refs.name.validationErrors).length);
           return self.refs.createAccountForm.refs.last_name.validationErrors.join("\n");
        //  }
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
    setRegistrationData: (formData) => {
      dispatch(registrationFormData(formData))
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
export default connect(stateToProps, mapDispatchToProps)(CreateAccount);
