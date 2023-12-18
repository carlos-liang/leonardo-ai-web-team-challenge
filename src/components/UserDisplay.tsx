import React from 'react';
import { Editable, EditablePreview, EditableInput, Flex, Text, Stack } from '@chakra-ui/react';

const UserDisplay = ({ username, jobTitle, setUsername, setJobTitle }) => {
    const handleUsernameChange = (value) => {
        setUsername(value);
        localStorage.setItem('username', value);
        // Grab from Information page
        window.dispatchEvent(new Event('storage'));
    };

    const handleJobTitleChange = (value) => {
        setJobTitle(value);
        localStorage.setItem('jobTitle', value);
        // Grab from Information page
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <Flex minW='sm' bgColor='blue.100' p="5">
            <Stack>
            <Flex align="center">
                <Text marginRight="2" color="gray.600" as="b">Username: </Text>
                <Editable value={username} placeholder="Click to set username" onChange={handleUsernameChange}>
                    <EditablePreview />
                    <EditableInput />
                </Editable>
            </Flex>
            <Flex align="center">
                <Text marginRight="2" color="gray.600" as="b">Job Title: </Text>
                <Editable value={jobTitle} placeholder="Click to set job title" onChange={handleJobTitleChange}>
                    <EditablePreview />
                    <EditableInput />
                </Editable>
            </Flex>
            </Stack>
        </Flex>
    );
};

export default UserDisplay;
