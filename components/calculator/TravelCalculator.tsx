import React, { ChangeEvent, forwardRef, useState } from 'react'
import { Contract, ethers } from 'ethers'
import {
	Heading,
	Flex,
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Box,
	Button,
	useToast
} from '@chakra-ui/react'

import { EmissionDetails } from '../../models/emission-details-model'
import { calculatorInitialValues } from '../../models/initial-data'
import ResultsChart from '../charts/ResultsChart'
import { ConfirmationModal } from '../modal/ConfirmationModal'
import { CalculatorConfirmation } from '../modal/CalculatorConfirmation'
import { useAccount, useChainId } from 'wagmi'
import { getSigner } from '../../helpers/getSigner'
import CarbonContractJson from '../../assets/deployments/mumbai/Carbon.json'
import CalculatorContractJson from '../../assets/deployments/mumbai/Calculator.json'
import { Calculator } from '../../@types/typechain-types'
import { storeMetadata } from '../../functions/storeData'
import { getSource } from '../../functions/getSource'
interface TravelInput {
	distance: string
	nights: string
}
const TravelCalculator = () => {
	const toast = useToast()
	const { address } = useAccount()
	const chainId = useChainId()
	const [loading, setLoading] = useState(false)
	const [calculated, setCalculated] = useState(false)
	const [modalVerify, setModalVerify] = useState<boolean>(false)
	const [loadingVerify, setLoadingVerify] = useState<boolean>(false)
	const [verifyFinished, setVerifyFinished] = useState<boolean>(false)
	const [verifyTx, setVerifyTx] = useState<string>('')
	const [verificationAmount, setVerificationAmount] = useState<string>('')
	const [action, setAction] = useState<string>('OFFSET')
	const [selectedNetworkConfirm, setSelectedNetworkConfirm] =
		useState<number>(0)

	const [results, setResults] = useState<EmissionDetails>(
		calculatorInitialValues
	)
	const [inputValues, setInputValues] = useState<TravelInput>({
		distance: '',
		nights: ''
	})
	const [inputErrors, setInputErrors] = useState<TravelInput>({
		distance: '',
		nights: ''
	})
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setInputValues(prevValues => ({ ...prevValues, [id]: value }))
	}
	const validateAndSubmit = () => {
		let hasErrors = false
		const newErrors: TravelInput = {
			distance: '',
			nights: ''
		}
		const mandatoryFields = ['distance', 'nights']
		mandatoryFields.forEach(key => {
			if (!inputValues[key as keyof TravelInput]) {
				newErrors[key as keyof TravelInput] = 'Field is required'
				hasErrors = true
			}
		})
		setInputErrors(newErrors)
		if (!hasErrors) {
			fetchData()
		}
	}
	const fetchData = async () => {
		setLoading(true)
		console.log(inputValues.distance, inputValues.nights)

		try {
			const url = '/api/calculator'
			const body = {
				type: 'fetchTravel',
				distance: inputValues.distance,
				nights: inputValues.nights
			}
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
			const data = await response.json()
			const results: EmissionDetails = {
				grocery: {
					active: false,
					co2: {
						proteins: 0,
						fats: 0,
						carbs: 0
					},
					total: 0,
					units: 'Tons'
				},
				travel: {
					active: true,
					co2: {
						hotelEmissionFactor: data.data.co2.hotelEmissionFactor,
						flightEmissionFactor: data.data.co2.flightEmissionFactor
					},
					total: data.data.co2.total,
					units: 'Tons'
				}
			}
			setResults(results)
			setCalculated(true)
		} catch (error) {
			console.log('error fetching data is ', error)
		}
	}
	const openVerifyModal = () => {
		setModalVerify(true)
	}
	const onOffset = () => {
		if (chainId === 80001) {
			offsetPolygonFunctions()
		} else {
			offsetOthers()
		}
	}
	const offsetPolygonFunctions = async () => {
		try {
			setLoadingVerify(true)
			const web3Signer = await getSigner()
			const contractAddress =
				process.env.NEXT_PUBLIC_POLYGON_MUMBAI_CALCULATOR_CONTRACT_ADDRESS
			if (!contractAddress || contractAddress === undefined) {
				toast({
					title:
						'Something is wrong with this network setting (no contract address).',
					status: 'warning',
					duration: 5000,
					isClosable: true
				})
				return
			}
			const contract = new Contract(
				CalculatorContractJson.address,
				CalculatorContractJson.abi,
				web3Signer
			) as Calculator
			const flag = 'travel'

			const url = '/api/getSource'
			const body = {
				type: 'travel'
			}
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
			console.log(response)

			const donId = 'fun-polygon-mumbai-1'

			const source = await response.json()
			console.log(source.content)
			console.log(inputValues.distance, inputValues.nights)
			const offsetTravel = await contract.sendRequest(
				address!,
				flag,
				source.content,
				'0x',
				0,
				0,
				[inputValues.distance, inputValues.nights],
				[],
				476,
				3000000,
				ethers.utils.formatBytes32String(donId),
				{ gasLimit: 2500000 }
			)
			setVerifyTx(offsetTravel.hash)
			setLoadingVerify(false)
			setVerifyFinished(true)
		} catch (error) {
			console.log(error)
			toast({
				title: 'There was an error trying to offset.',
				status: 'error',
				duration: 5000,
				isClosable: true
			})
			setLoadingVerify(false)
		}
	}
	const offsetOthers = async () => {
		try {
			setLoadingVerify(true)
			const web3Signer = await getSigner()
			const contractAddress =
				process.env.NEXT_PUBLIC_POLYGON_MUMBAI_CARBON_CONTRACT_ADDRESS
		} catch (error) {
			console.log(error)
			toast({
				title: 'There was an error trying to offset.',
				status: 'error',
				duration: 5000,
				isClosable: true
			})
			setLoadingVerify(false)
		}
	}
	const closeModal = () => {
		setLoadingVerify(false)
		setVerifyFinished(false)
		setVerifyTx('')
		setModalVerify(false)
	}
	const getCarbonAddress = (newworkIndex: number) => {
		switch (newworkIndex) {
			case 0:
				return process.env.NEXT_PUBLIC_POLYGON_MUMBAI_CARBON_CONTRACT_ADDRESS
			case 1:
				return process.env.NEXT_PUBLIC_SEPOLIA_CARBON_CONTRACT_ADDRESS
			case 2:
				return process.env.NEXT_PUBLIC_OPTIMISM_GOERLI_CARBON_CONTRACT_ADDRESS
			case 3:
				return process.env.NEXT_PUBLIC_ARBITRUM_GOERLI_CARBON_CONTRACT_ADDRESS
			default:
				return process.env.NEXT_PUBLIC_POLYGON_MUMBAI_CARBON_CONTRACT_ADDRESS
		}
	}
	return calculated ? (
		<Box w={600} mx='auto' alignItems='center' justifyContent='center'>
			<ResultsChart emissions={results} />
			{chainId === 80001 && (
				<Button
					colorScheme='green'
					variant='outline'
					mt={4}
					width='full'
					onClick={openVerifyModal}
				>
					{' '}
					Offset
				</Button>
			)}
			{modalVerify && (
				<CalculatorConfirmation
					isOpen={modalVerify}
					onClose={closeModal}
					loading={loadingVerify}
					finished={verifyFinished}
					tx={verifyTx}
					amount={results.travel.total.toString()}
					action={action}
					onConfirm={onOffset}
				/>
			)}
		</Box>
	) : (
		<Box>
			<Heading w='100%' fontWeight='medium' fontSize='xl' mb='2%'>
				Calculate Trip Emissions
			</Heading>
			<Flex mt='2%' flexDirection={{ base: 'column', md: 'row' }}>
				<FormControl mr='2%' isRequired isInvalid={!!inputErrors.distance}>
					<FormLabel htmlFor='distance' fontWeight='medium' fontSize='md'>
						Distance (Kilometers)
					</FormLabel>
					<Input
						id='distance'
						placeholder='Distance ...'
						type='number'
						required
						value={inputValues.distance}
						onChange={handleInputChange}
						borderColor='white'
						focusBorderColor='green.500'
						disabled={loading}
					/>
					<FormErrorMessage>{inputErrors.distance}</FormErrorMessage>
				</FormControl>
				<FormControl mr='2%' isRequired isInvalid={!!inputErrors.nights}>
					<FormLabel htmlFor='nights' fontWeight='medium' fontSize='md'>
						Number Of Nights
					</FormLabel>
					<Input
						id='nights'
						placeholder='Nights ...'
						type='number'
						required
						value={inputValues.nights}
						onChange={handleInputChange}
						borderColor='white'
						focusBorderColor='green.500'
						disabled={loading}
					/>
					<FormErrorMessage>{inputErrors.nights}</FormErrorMessage>
				</FormControl>
			</Flex>
			<Button
				colorScheme='teal'
				variant='outline'
				onClick={validateAndSubmit}
				isLoading={loading}
				mt={4}
			>
				Calculate
			</Button>
		</Box>
	)
}

export default forwardRef(TravelCalculator)
