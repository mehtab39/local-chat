import React, { useState, useCallback } from 'react';
import {
    Box, Button, FormControl, FormLabel, Input, Textarea, Image, VStack, HStack, useToast, Flex
} from '@chakra-ui/react';
import { Map, fromJS } from 'immutable';

const initialProfileState = Map({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    profileImage: null,
});

const Profile = ({existingProfile}) => {
    const [profile, setProfile] = useState(existingProfile ? fromJS(existingProfile) : initialProfileState);
    const [previewImage, setPreviewImage] = useState(null);
    const toast = useToast();

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => prevProfile.set(name, value));
    }, []);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile(prevProfile => prevProfile.set('profileImage', file));
            setPreviewImage(URL.createObjectURL(file));
        }
    }, []);


    const handleSubmit = () => {
        toast({
            title: 'Profile updated.',
            description: 'Your profile information has been updated.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        });
    };

    return (
        <HStack spacing={8}>
            <Box p={5} borderWidth={1} borderRadius="md" boxShadow="md">
                <FormControl>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        id="name"
                        name="name"
                        value={profile.get('name')}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.get('email')}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={profile.get('phone')}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <Input
                        id="address"
                        name="address"
                        value={profile.get('address')}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel htmlFor="bio">Bio</FormLabel>
                    <Textarea
                        id="bio"
                        name="bio"
                        value={profile.get('bio')}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel htmlFor="profileImage">Profile Image</FormLabel>
                    <Input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </FormControl>
                <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
                    Save Profile
                </Button>
            </Box>

            <Box p={5} minWidth='300px' borderWidth={1} borderRadius="md" boxShadow="md">
                <VStack spacing={4} align="start">
                    <h2>Profile Preview</h2>
                    {previewImage && (
                        <Image
                            src={previewImage}
                            alt="Profile Preview"
                            boxSize="150px"
                            objectFit="cover"
                            borderRadius="md"
                        />
                    )}
                    <Box>
                        <strong>Name:</strong> {profile.get('name')}
                    </Box>
                    <Box>
                        <strong>Email:</strong> {profile.get('email')}
                    </Box>
                    <Box>
                        <strong>Phone:</strong> {profile.get('phone')}
                    </Box>
                    <Box>
                        <strong>Address:</strong> {profile.get('address')}
                    </Box>
                    <Box>
                        <strong>Bio:</strong> {profile.get('bio')}
                    </Box>
                </VStack>
            </Box>
        </HStack>
    );
};

export default Profile;
