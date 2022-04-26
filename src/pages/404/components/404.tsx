import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const Page404 = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, main.400, main.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Link to={'/'} replace={true}>
        <Button
          colorScheme="main"
          bgGradient="linear(to-r, main.400, main.500, main.600)"
          color="white"
          variant="solid"
        >
          Quay về trang chủ
        </Button>
      </Link>
    </Box>
  );
};

export default Page404;
