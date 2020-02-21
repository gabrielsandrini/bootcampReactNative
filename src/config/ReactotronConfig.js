import Reactotron from 'reactotron-react-native';

/* se n funcionar,
rodar o seguinte comando no shell: adb reverse tcp:9090 tcp:9090
e/ou passar o parametro {host: ip.do.seu.dispositivo} no .configure() */

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron;
}
