import { extendTheme } from '@chakra-ui/react';

const customThemes = extendTheme({
  colors: {
    main: {
      100: '#9ae6b4',
      200: '#85e0a5',
      300: '#71da96',
      400: '#5dd587',
      500: '#34cb69',
      600: '#2fb65e',
      700: '#2aa254',
      800: '#258e4a',
      900: '#238646'
    },
    mainScheme: {
      100: '#9ae6b4',
      200: '#85e0a5',
      300: '#71da96',
      400: '#5dd587',
      500: '#34cb69',
      600: '#2fb65e',
      700: '#2aa254',
      800: '#258e4a',
      900: '#238646'
      // 900: '#207e41'
    },
    richText: {
      100: '#1c1c1c'
    }
  },
  components: {
    Button: {
      defaultProps: { colorScheme: 'mainScheme' }
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'main.100'
      },
      variants: {
        flushed: {
          backGroundColor: 'main.100'
        }
      }
    }
  }
});
export default customThemes;
