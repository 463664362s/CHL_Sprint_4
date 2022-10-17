import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://challenge.denicola.repl.co/acao',
});

function Home({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
      }}>
      <Text>Bem-Vindo a nossa Home</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cadastro de Empresas')}
        style={{
          backgroundColor: '#007fff',
          padding: 10,
          marginBottom: 10,
          marginTop: 10,
          borderRadius: 10,
        }}>
        <Text>Cadastrar Empresa</Text>
      </TouchableOpacity>
    </View>
  );
}

function Cadastro() {
  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lista, setLista] = useState([]);


  const salvar = () => {
    if (id === null) {
      api
        .post('/', {id, nome, cnpj, email, senha})
        .then((info) => {
          lerLista();
          setId(id);
          setNome('');
          setCnpj('');
          setEmail('');
          setSenha('');
        })
        .catch((err) => {
          alert('Erro ' + err);
        });
    } else {
      api
        .put('/', {id, nome, cnpj, email, senha})
        .then((info) => {
          lerLista();
          setId(null);
          setNome('');
          setCnpj('');
          setEmail('');
          setSenha('');
        })
        .catch((err) => {
          alert('Erro ao atualizar o registro');
        });
    }
  };

  const lerLista = () => {
    api
      .get('/')
      .then((info) => {
        setLista(info.data);
      })
      .catch(() => {
        alert('Erro ao ler a lista');
      });
  };

  const editar = (obj) => {
    setId(obj.id);
    setNome(obj.nome);
    setCnpj(obj.cnpj);
    setEmail(obj.email);
    setSenha(obj.senha);
  };

  const remover = (obj) => {
    api
      .delete('/' + obj.id)
      .then((info) => {
        lerLista();
      })
      .catch((err) => {
        alert('Erro ao remover elemento');
      });
  };

  useEffect(() => {
    lerLista();
  }, []);

  let nomeBotao = "Cadastrar";
  if (id !== null){ 
    nomeBotao = "Salvar";
  }

  return (
    <View style={{ backgroundColor: 'lightblue', flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          justifyContent: 'space-evenly',
        }}>
        <Text
          style={{
            fontSize: 18,
            color: 'white',
            marginRight: 130,
            marginTop: 30,
          }}>
          Id:
        </Text>
        <Text
          style={{
            fontSize: 24,
            borderBottomWidth: 2,
            borderBottomColor: '#ffffff',
            width: 60,
            marginRight: 10,
            marginTop: 26,
            textAlign: 'center',
          }}>
          {id}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          justifyContent: 'space-evenly',
        }}>
        <Text style={{ fontSize: 18, color: 'white' }}>Nome:</Text>
        <TextInput
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            width: 175
          }}
          value={nome}
          onChangeText={setNome}
        />
        </View>
        <View
        style={{
          flexDirection: 'row',
          margin: 5,
          justifyContent: 'space-evenly',
        }}>
        <Text style={{ fontSize: 18, color: 'white' }}>CNPJ:</Text>
        <TextInput
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            marginLeft: 5,
            width: 175,
          }}
          value={cnpj}
          onChangeText={setCnpj}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          justifyContent: 'space-evenly',
        }}>
        <Text style={{ fontSize: 18, color: 'white' }}>Email:</Text>
        <TextInput
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            marginLeft: 5,
            width: 175,
          }}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          justifyContent: 'space-evenly',
        }}>
        <Text style={{ fontSize: 18, color: 'white' }}>Senha:</Text>
        <TextInput
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            width: 175
          }}
          value={senha}
          onChangeText={setSenha}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#007fff',
          color: 'white',
          alignItems: 'center',
          margin: 30,
          borderRadius: 10,
          marginHorizontal: 38,
          padding: 5,
        }}
        onPress={salvar}>
        <Text style={{ color: 'white' }}>{nomeBotao}</Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={lista}
          renderItem={(props) => (
            <Item {...props} onRemover={remover} onEditar={editar} />
          )}
        />
      </View>
    </View>
  );
}

function Item(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'yellow',
        borderWidth: 2,
        borderColor: 'green',
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 15,
      }}>
      <View style={{ flex: 3 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>
          {' '}
          {'(' + props.item.id + ') ' + props.item.nome + "\n"}
          {props.item.cnpj + "\n"}
          {props.item.email + "\n"}
          {props.item.senha}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
        <Ionicon
          name="clipboard"
          size={32}
          onPress={() => {
            props.onEditar(props.item);
          }}
        />
        <Ionicon
          name="trash"
          size={32}
          onPress={() => {
            props.onRemover(props.item);
          }}
        />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro de Empresas" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;