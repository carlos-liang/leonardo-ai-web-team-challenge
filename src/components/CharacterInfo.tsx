import {
    Flex,
    Image,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Table, TableContainer, Tbody, Td, Tr
} from "@chakra-ui/react";
import React from "react";

const CharacterInfo = ({info}) => {

    return (
        <ModalContent>
            <ModalHeader>{info.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex justifyContent="center">
                    <Image src={info.image} alt={info.name} boxSize="200px" />
                </Flex>
                <TableContainer>
                    <Table variant='simple'>
                        <Tbody>
                            <Tr>
                                <Td>Status</Td>
                                <Td>{info.status}</Td>
                            </Tr>
                            <Tr>
                                <Td>Species</Td>
                                <Td>{info.species}</Td>
                            </Tr>
                            <Tr>
                                <Td>Type</Td>
                                <Td>{info.type || 'N/A'}</Td>
                            </Tr>
                            <Tr>
                                <Td>Gender</Td>
                                <Td>{info.gender}</Td>
                            </Tr>
                            <Tr>
                                <Td>Origin</Td>
                                <Td>{info.origin.name}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </ModalBody>
        </ModalContent>
    )
}

export default CharacterInfo
