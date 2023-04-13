import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  safeView: {flex: 1},
  container: {
    ...StyleSheet.absoluteFillObject,
    height: height,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  formButton: {
    position: 'absolute',
    top: 100,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonLocation: {
    marginVertical: 4,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 30,
    height: 30,
  },
  formBottom: {
    position: 'absolute',
    bottom: 0,
    height: height / 4,
    width: width,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
    flexDirection: 'row',
    flex: 1,
  },
  formText: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  titleText: {fontWeight: 'bold', fontSize: 16},
  buttonBottom: {justifyContent: 'center', alignItems: 'center', flex: 1},
  buttonCheckIn: {
    width: 150,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
