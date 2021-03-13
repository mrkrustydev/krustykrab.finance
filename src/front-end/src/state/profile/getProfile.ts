import { Nft, NftImages, Team, TeamImages } from 'config/constants/types'
import { getPancakeProfileAddress, getPancakeRabbitsAddress } from 'utils/addressHelpers'
import pancakeProfileAbi from 'config/abi/pancakeProfile.json'
import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import { getContract } from 'utils/web3'
import { Profile } from 'state/types'
import { getTeam } from 'state/teams/helpers'
import nfts from 'config/constants/nfts'
import { transformProfileResponse } from './helpers'

// const profileContract = getContract(pancakeProfileAbi, getPancakeProfileAddress())
// const rabbitContract = getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress())
// const profileApi = process.env.REACT_APP_API_PROFILE

const getProfile = async (address: string): Promise<Profile> => {
  try {
    /*
    const hasRegistered = await profileContract.methods.hasRegistered(address).call()

    if (!hasRegistered) {
      return null
    }

    const profileResponse = await profileContract.methods.getUserProfile(address).call()
    const { userId, points, teamId, tokenId, nftAddress, isActive } = transformProfileResponse(profileResponse)

    const [bunnyId, team] = await Promise.all([rabbitContract.methods.getBunnyId(tokenId).call(), getTeam(teamId)])
    const nft = nfts.find((nftItem) => nftItem.bunnyId === Number(bunnyId))
    const response = await fetch(`${profileApi}/api/users?address=${address}`)
    const { username = '' } = await response.json()

    // Save the preview image to local storage for the exchange
    localStorage.setItem(
      `profile_${address}`,
      JSON.stringify({
        username,
        avatar: `https://pancakeswap.finance/images/nfts/${nft.images.sm}`,
      }),
    )

    return {
      userId,
      points,
      teamId,
      tokenId,
      username,
      nftAddress,
      isActive,
      nft,
      team,
    } as Profile
    */

    const usrname = "testing..." as string
    const nftAddress = "" as string
    const isActive = true as boolean
    const emptyNftImg : NftImages = {
      blur: '',
      lg: '',
      sm: '',
      md: ''
    }    
    const nullNft : Nft = {
      name: "testing",
      description: "some test",
      bunnyId: 0,
      images: emptyNftImg,
      sortOrder: 0
    }
    const emptyTeamImg : TeamImages = {
      alt: '',
      lg: '',
      md: '',
      sm: '',
    }
    const emptyTeam: Team = {
      background: '',
      description: '',
      id: 1,
      images: emptyTeamImg,
      name: 'Empty Coffee Cup',
      points: 10,
      textColor: 'Blue',
      users: 1,
      isJoinable: true
    }
    const defaultProfile: Profile = {
      userId: 0 as number,
      points: 0 as number,
      teamId: 0 as number,
      tokenId: 0 as number,
      username: usrname,
      nftAddress,
      isActive,
      nft: nullNft,
      team: emptyTeam,
    }

    return defaultProfile
  } catch (error) {
    return null
  }
}

export default getProfile
