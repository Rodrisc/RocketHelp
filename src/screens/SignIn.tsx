import { VStack, Heading, Icon, useTheme } from "native-base";
import { Alert } from "react-native";
import { useState } from "react";

import auth from '@react-native-firebase/auth'

import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';

import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignIn() {

    const [isLoading, setIsLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassord] = useState('')

    const { colors } = useTheme();

    function handleSignIn(){



        if(!email || !password){
            return Alert.alert('Entrar', 'Informe e-mail e senha.')
        }

        setIsLoading(true)

        auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error =>{
            console.log(error)
            setIsLoading(false)

            if(error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password'){
                return Alert.alert('Entrar', 'Email ou senha inválida')
                
            }

            if(error.code === 'auth/user-not-found'){
                return Alert.alert('Entrar', 'Usuário não cadastrado.')
            }

            return Alert.alert('Entrar', 'Não foi possivel entrar')
        }))
    }

    return (

        <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>

            <Logo />

            <Heading color='gray.100' fontSize='xl' mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input
                placeholder='E-mail'
                mb={4}
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
                onChangeText={setEmail}
                
            />

            <Input
                mb={4}
                placeholder='Senha'
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
                secureTextEntry
                onChangeText={setPassord}
            />

            <Button
                title="Entrar"
                w='full'
                onPress={handleSignIn}
                isLoading={isLoading} />
                

        </VStack>
    )
}

