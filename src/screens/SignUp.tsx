import { Heading, VStack, Icon, ScrollView, useTheme, Text } from 'native-base';
import { Input } from '../components/Input';

import { Envelope, Key, UserCirclePlus } from 'phosphor-react-native';
import { useState } from 'react';
import { Button } from '../components/Button';

import auth from '@react-native-firebase/auth'

import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export function SignUp() {

  const navigation = useNavigation()

  const { colors } = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPassordAgain] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  function handleSignUp() {
    

    if (!email || !password || !passwordAgain) {
      return Alert.alert('Criar conta', 'Por favor, preencha todos os campos')
    }

    if (password != passwordAgain) {
      return Alert.alert('Criar conta', 'A senha não confere')
    }

    setIsLoading(true)


    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Criar conta', 'Sua conta foi criada com sucesso.')
        
      })
      .catch(error => {

        setIsLoading(false)

        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert('Criar conta', 'Esse E-mail já está sendo usado.')
        }

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Criar conta', 'E-mail inválido')
        }

        console.log(error)
        return Alert.alert('Criar conta', 'Não foi possível criar sua conta.')

      })
  }

  return (
    <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>

      <UserCirclePlus size={120} color={colors.green[400]} />

      <Heading color='gray.100' fontSize='xl' mt={16} mb={6}>
        Criar uma nova conta
      </Heading>

      <ScrollView w='full' showsVerticalScrollIndicator={false}>
        <Input
          placeholder='E-mail'
          mb={4}
          InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
          onChangeText={setEmail}
        />

        <Input
          mb={4}
          placeholder='Crie sua senha'
          InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
          secureTextEntry
          onChangeText={setPassword}
          color='green.300'
        />

        <Input
          mb={4}
          placeholder='Digite a senha novamente'
          InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
          secureTextEntry
          onChangeText={setPassordAgain}
          value={passwordAgain}
          color={password != passwordAgain ? 'red.300' : 'green.300'}
        />

        <Button
          title='Criar conta'
          w='full'
          mb={4}
          mt={5}
          isLoading={isLoading}
          onPress={handleSignUp}
        />

        <Button
          title='Voltar'
          w='full'
          bg='gray.400'
          _pressed={{ bg: 'gray.500' }}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>

    </VStack>
  );
}