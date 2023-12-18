import React from "react";
import {
    Card,
    Text,
    Image,
    GridItem,
} from "@chakra-ui/react";

const CharacterCard = ({ character, openCharacterDetails }) => {
    return (
        <GridItem>
            <Card
                onClick={() => {
                    openCharacterDetails(character);
                }}
                _hover={{ bg: "gray.200", cursor: "pointer" }}
            >
                <Image src={character.image} alt={character.name} boxSize="150px" mr={2} alignSelf='center' />
                <Text textAlign='center'>{character.name}</Text>
            </Card>
        </GridItem>
    );
};

export default CharacterCard;
