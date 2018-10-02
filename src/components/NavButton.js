import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button,Text,View } from 'react-native';
import { NavigationActions } from 'react-navigation';

const AuthButton = (props) => {
  const { logout, loginScreen, isLoggedIn  } = props
  console.log(props)
  return (
    <View>
      <Text>{isLoggedIn}</Text>
      <Button
        title={isLoggedIn ? 'Log Out' : 'Open Login Screen'}
        onPress={true ? logout : loginScreen}
      />
    </View>
    )




};

// AuthButton.propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired,
//   logout: PropTypes.func.isRequired,
//   loginScreen: PropTypes.func.isRequired,
// };

const mapStateToProps = state => ({
  isLoggedIn: state.nav.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  logout: () => console.log(dispatch({ type: 'Logout2' })),
  loginScreen: () =>{
    // console.log(NavigationActions.navigate({ routeName: 'FOUND' }))
    console.log(dispatch(NavigationActions.navigate({ routeName: 'FOUND' }),{A:1}))
  }


});

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);