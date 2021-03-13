import addresses from 'config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getMrKrabsAddress = () => {
  return addresses.mrKrabs[chainId]
}
export const getSousChefAddress = () => {
  return addresses.sousChef[chainId]
}
export const getKrustyAddress = () => {
  return addresses.krusty[chainId]
}
export const getPattyAddress = () => {
  return addresses.patty[chainId]
}
export const getCakeAddress = () => {
  return addresses.cake[chainId]
}
export const getSyrupAddress = () => {
  return addresses.syrup[chainId]
}
export const getMasterChefAddress = () => {
  return addresses.masterChef[chainId]
}
export const getMulticallAddress = () => {
  return addresses.mulltiCall[chainId]
}
export const getWbnbAddress = () => {
  return addresses.wbnb[chainId]
}
export const getLotteryAddress = () => {
  return addresses.lottery[chainId]
}
export const getLotteryTicketAddress = () => {
  return addresses.lotteryNFT[chainId]
}
export const getPancakeProfileAddress = () => {
  return addresses.pancakeProfile[chainId]
}
export const getPancakeRabbitsAddress = () => {
  return addresses.pancakeRabbits[chainId]
}
export const getRabbitMintingFarmAddress = () => {
  return addresses.rabbitMintingFarm[chainId]
}
export const getClaimRefundAddress = () => {
  return addresses.claimRefund[chainId]
}
