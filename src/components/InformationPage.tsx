import { useQuery, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    useDisclosure,
    Button, HStack, Grid, Heading, Box,
} from "@chakra-ui/react";
import CharacterInfo from "./CharacterInfo";
import CharacterCard from "./CharacterCard";


const InformationPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [page, setPage] = useState(1);
    const [loggedIn, setLoggedIn] = useState(false);
    const [character, setCharacter] = useState(null);

    const { data, loading, error } = useQuery(
        gql`
            query Characters($page: Int) {
                characters(page: $page) {
                    info {
                        count
                    }
                    results {
                        name
                        image
                        status
                        species
                        type
                        origin {
                            name
                        }
                        gender
                    }
                }
            }
        `,
        {
            variables: { page },
        }
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedIn(!!(localStorage.getItem("username") && localStorage.getItem("jobTitle")));
        };

        if (typeof window !== "undefined") {
            setLoggedIn(!!(localStorage.getItem("username") && localStorage.getItem("jobTitle")));
            window.addEventListener("storage", handleStorageChange);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("storage", handleStorageChange);
            }
        };
    }, []);

    const openCharacterDetails = (c) => {
        setCharacter(c);
        onOpen();
    };

    const goToNextPage = () => {
        setPage(page + 1);
    };

    const goToPrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    return (
        <Box mt={5} mx={5} p={5}>
            {loggedIn ? (
                <>
                    <Heading as='h3' size='lg' mb="5" color="gray" >
                        Rick and Morty Characters
                    </Heading>
                    <Grid templateColumns={{md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)'}} gap={6}>
                        {data?.characters?.results.map((character, i) => (
                            <CharacterCard
                                key={i}
                                character={character}
                                openCharacterDetails={openCharacterDetails}
                            />
                        ))}
                    </Grid>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <CharacterInfo info={character} />
                    </Modal>

                    <HStack mt={4} alignSelf='center'>
                        <Button onClick={goToPrevPage} disabled={page === 1}>
                            Back
                        </Button>
                        <Button onClick={goToNextPage}>
                            Next
                        </Button>
                    </HStack>
                </>
            ) : (
                <div>Please enter username and job title to view</div>
            )}
        </Box>
    );
};

export default InformationPage;
