import React, { useEffect, useState } from 'react'
import { Contract } from 'ethers'
import { useAccount } from 'wagmi'
import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	SimpleGrid,
	useColorModeValue,
	useToast
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import CertificateContractJson from '../../assets/contracts/Certificate.json'
import NFTComponent from '../nft/NFTComponent'
import { getSigner } from '../../helpers/getSigner'
import { AvailableNetworks } from '../../models/networks-model'
import { Certificate } from '../../@types/typechain-types'
const MyCertificates = () => {
	const toast = useToast()
  const { address } = useAccount();
	const [selectedNetworkIndex, setSelectedNetworkIndex] = useState<number>(0)

	useEffect(() => {
		readMyNfts()
	}, [])
	const readMyNfts = async () => {
		try {
			const web3Signer = await getSigner()
			const contractAddress = getAddress(selectedNetworkIndex)
      if (!contractAddress || contractAddress === undefined) {
        toast({
          title: "Error reading NFT balance contract.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      const contract = new Contract(
        contractAddress,
        CertificateContractJson.abi,
        web3Signer
      ) as Certificate;
			const purchaseCarbonCreditsTX = await contract.tokensOfOwner(
				address!, 
				{ gasLimit: 2500000 }
			);
			console.log(purchaseCarbonCreditsTX);
		} catch (error) {
			console.log(error)
			toast({
				title: 'Error reading your NFTs.',
				status: 'error',
				duration: 5000,
				isClosable: true
			})
		}
	}
	const getAddress = (newworkIndex: number) => {
		switch (newworkIndex) {
			case 0:
				return process.env.NEXT_PUBLIC_POLYGON_MUMBAI_CERTIFICATE_CONTRACT_ADDRESS
			case 1:
				return process.env.NEXT_PUBLIC_SEPOLIA_CERTIFICATE_CERTIFICATE_ADDRESS
			case 2:
				return process.env.NEXT_PUBLIC_OPTIMISM_GOERLI_CERTIFICATE_CONTRACT_ADDRESS
			case 3:
				return process.env.NEXT_PUBLIC_ARBITRUM_GOERLI_CERTIFICATE_CONTRACT_ADDRESS
			default:
				return process.env.NEXT_PUBLIC_POLYGON_MUMBAI_CERTIFICATE_CONTRACT_ADDRESS
		}
	}
	return (
		<Box
			bg={useColorModeValue('brand.newBlack', 'rgba(4,56,80, 0.5)')}
			px={4}
			width='90vw'
			maxWidth={{ base: '100%', md: '100%', lg: '96%' }}
			margin='15px auto'
			borderRadius='2xl'
			backgroundImage={
				'linear-gradient(rgba(4,56,80, 0.6), rgba(4,56,80, 0.8)), url(/Images/PanelBG.jpeg)'
			}
			backgroundSize={'cover'}
			backgroundPosition={{ base: '100%', md: 'left top' }}
			mb={'20'}
		>
			<Card bg={'transparent'} align='center'>
				<CardHeader>
					<Flex alignItems='center' justifyContent='space-between' width='100%'>
						<Heading size='lg'> My Certificates</Heading>
						<Menu>
							<MenuButton
								as={Button}
								rightIcon={<ChevronDownIcon />}
								colorScheme='teal'
								ml={4}
							>
								{AvailableNetworks[selectedNetworkIndex]}
							</MenuButton>
							<MenuList>
								{AvailableNetworks.map((network, index) => (
									<MenuItem
										key={network}
										onClick={() => setSelectedNetworkIndex(index)}
									>
										{network}
									</MenuItem>
								))}
                <MenuItem
										onClick={() => setSelectedNetworkIndex(-1)}
									>
										{"All networks"}
									</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</CardHeader>
				<CardBody>
					<SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
						<NFTComponent />
						<NFTComponent />
						<NFTComponent />
						<NFTComponent />
						<NFTComponent />
						<NFTComponent />
						<NFTComponent />
						<NFTComponent />
						{/* ... Add as many NFTComponent as you need */}
					</SimpleGrid>
				</CardBody>
				<CardFooter>
					<Flex justifyContent='center' gap={4}>
						<Button colorScheme='teal' variant='outline'>
							Purchase New Certificate
						</Button>
					</Flex>
				</CardFooter>
			</Card>
		</Box>
	)
}

export default MyCertificates
