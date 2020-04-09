//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
// import { connect } from 'react-redux';

// create a component
class SplashOriginal extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('AuthLanding')
        }, 3000)
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/images/logo.jpg')} style={styles.logo} />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebb9e6',
    },
    logo: {
        width: 90,
        height: 90,
        borderRadius: 10
    }
});

let Splash = withNavigation(SplashOriginal)

// const mapStateToProps = state => {
//     return {
//         auth: state.auth,
//     }
// }

//make this component available to the app
// export default connect(mapStateToProps)(Splash);
export default Splash
