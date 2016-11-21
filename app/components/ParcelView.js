import React, { Component } from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

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
  Spinner,
  Card,
  CardItem
} from 'native-base';

import { connect } from 'react-redux';



class ParcelView extends Component {


render() {
    return (

      <Container>

          <Header>
            <Button transparent onPress={() => Actions.pop()}>
                <Icon name="md-arrow-back"></Icon>
            </Button>
              <Title>{this.props.parcelName}</Title>
          </Header>


        <Content>
        <Card style={{marginLeft: 10, marginRight: 10, marginTop: 10, borderColor: 'green'}}>


                <CardItem style={{borderColor: 'green'}}>
                    <Text>
                     <Text style={{fontWeight: 'bold'}}>Checkout: </Text>
                     See a Locate checkout button somewhere,
                     click it and provide your locate email and password,
                     Locate will then deliver your items.
                    </Text>
                </CardItem>

           </Card>
        </Content>
      </Container>

    );
  }
}

const stateToProps = (state) => {
  return {
      locateApplication: state.locateApplication
 	}
}

// Styles
const styles = StyleSheet.create({
  features: {
    fontSize: 13,
    color: 'green'
  }
});

export default connect(stateToProps)(ParcelView);
