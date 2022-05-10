import { Flex, Box, Avatar, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({showProfileData = true}: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
        <Text>Nós</Text>
      </Box>
      )}
      <Avatar size="md" name="nos" src="../../nos.jpg" />
    </Flex>
  );
}
