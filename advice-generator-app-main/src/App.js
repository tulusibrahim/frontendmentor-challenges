import divideMobile from './images/pattern-divider-mobile.svg'
import divideDesk from './images/pattern-divider-desktop.svg'
import dice from './images/icon-dice.svg'
import './App.css';
import { Flex, Image } from '@chakra-ui/react';
import { DarkBlue, DarkGrayishBlue, fontFamily, LightCyan, NeonGreen } from './helper';
import React, { useState, useEffect } from 'react';

function App() {
  const [quote, setQuote] = useState('')
  const [windowSize, setWindowSize] = useState(null)

  const getQuote = async (second) => {
    let data = await fetch('https://api.adviceslip.com/advice')
    let json = await data.json(data)
    console.log(json)
    setQuote(json.slip)
  }

  const handleResize = () => {
    setWindowSize(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    getQuote()
  }, [])

  return (
    <Flex w={'100vw'} h='100vh' bg={DarkBlue} justify='center' align={'center'} fontFamily={fontFamily} fontWeight={800} >
      <Flex w={['90%', '90%', 'fit-content']} maxW={['90%', '90%', '40%']} h='fit-content' bg={DarkGrayishBlue} borderRadius='10px' justify='center' align={'center'} direction='column' position='relative'>
        <Flex color={NeonGreen} letterSpacing={2} fontWeight='14px' py={'10px'} pt={'20px'}>
          ADVICE #{quote.id}
        </Flex >
        <Flex w={'80%'} py={'10px'} color={LightCyan} justify='center' textAlign={'center'} fontSize={'28px'}>
          {quote.advice}
        </Flex>
        <Flex w={'90%'} justify='center' align={'center'} my='10px' mb={'60px'}>
          {
            windowSize > 700 ?
              <Image src={divideDesk} objectFit='cover' alt='divider' />
              :
              <Image src={divideMobile} objectFit='cover' alt='divider' />
          }
        </Flex>
        <Flex w={'fit-content'} _hover={{ boxShadow: `0px 0px 20px 0px ${NeonGreen}` }} transition='.3s' cursor={'pointer'} onClick={getQuote} h='fit-content' position={'absolute'} bottom='-30px' p={'20px'} bg={NeonGreen} borderRadius='full'>
          <Image src={dice} alt='dice icon' />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
