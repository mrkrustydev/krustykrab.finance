import React from 'react'
import useI18n from 'hooks/useI18n'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, Flex, Heading, Text } from '../../../pancake-uikit/src'

const NoProfileCard = () => {
  const TranslateString = useI18n()

  return (
    <Card mb="32px" isActive>
      <CardBody>
        <Flex
          alignItems={['start', null, 'center']}
          justifyContent={['start', null, 'space-between']}
          flexDirection={['column', null, 'row']}
        >
          <div>
            <Heading size="lg" mb="8px">
              {TranslateString(999, "You haven't set up your profile yet!")}
            </Heading>
            <Text>
              {TranslateString(999, 'You can do this at any time by clicking on your profile picture in the menu')}
            </Text>
          </div>
          <Button as={Link} to="/profile" mt={['16px', null, 0]}>
            {TranslateString(999, 'Set up now')}
          </Button>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default NoProfileCard
