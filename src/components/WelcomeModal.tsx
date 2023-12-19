import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input
} from '@chakra-ui/react';
import UserDisplay from './UserDisplay';
import { KeyboardEvent } from "react"

const WelcomeModal = () => {
    const [username, setUsername] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isFirstSlide, setIsFirstSlide] = useState(true);

    useEffect(() => {
        onOpen();
        setUsername(localStorage.getItem('username'))
        setJobTitle(localStorage.getItem('jobTitle'))
    }, [])

    const handleUsernameSubmit = () => {
        setIsFirstSlide(false);
    };

    const handleJobTitleSubmit = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('username', username);
            localStorage.setItem('jobTitle', jobTitle);
            window.dispatchEvent(new Event('storage'));
        }
        onClose();
    };

    const goBack = () => {
        setIsFirstSlide(true);
    };

    const handleEnterPress = () => {
        return (e: KeyboardEvent) => {
            if(e.key === "Enter"){
                isFirstSlide ? handleUsernameSubmit() : handleJobTitleSubmit();
            }
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{isFirstSlide ? 'Welcome!' : 'Set Job Title'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {isFirstSlide ? (
                            <Input
                                placeholder="Enter username"
                                value={username || ''}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleEnterPress()}
                            />
                        ) : (
                            <Input
                                placeholder="Enter job title"
                                value={jobTitle || ''}
                                onChange={(e) => setJobTitle(e.target.value)}
                                onKeyDown={handleEnterPress()}
                            />
                        )}
                    </ModalBody>

                    <ModalFooter>
                        {isFirstSlide ? (
                            <Button colorScheme="blue" mr={3} onClick={handleUsernameSubmit}>
                                Next
                            </Button>
                        ) : (
                            <div>
                                <Button colorScheme="green" mr={3} onClick={handleJobTitleSubmit}>
                                    Save
                                </Button>
                                <Button variant="outline" onClick={goBack}>
                                    Back
                                </Button>
                            </div>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <UserDisplay username={username} jobTitle={jobTitle} setUsername={setUsername} setJobTitle={setJobTitle}/>
        </div>
    );
};

export default WelcomeModal;
