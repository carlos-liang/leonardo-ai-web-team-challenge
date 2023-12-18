import {ChakraProvider} from '@chakra-ui/react'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import WelcomeModal from "../components/WelcomeModal";
import InformationPage from "../components/InformationPage";

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
});

export default function Page() {
    return (
        <ChakraProvider>
            <ApolloProvider client={client}>
                <WelcomeModal/>
                <InformationPage/>
            </ApolloProvider>
        </ChakraProvider>
    )
}
