import React from 'react'
import PropTypes from "prop-types";
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { Timeline } from 'react-twitter-widgets'
import useI18n from 'hooks/useI18n'

const StyledYoutubeCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  border-radius: 0px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const VideoResponsive = styled.div`
  overflow: hidden;
  padding - bottom: 56.25 %;
  position: relative;
  height: 0;
`

const videoResponsiveIframe = styled.div`
  overflow: hidden;
  padding - bottom: 56.25 %;
  position: relative;
  height: 0;
`

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width="400"
      height="240"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

const YoutubeVideoCard = () => {
  const TranslateString = useI18n()

  return (
    <StyledYoutubeCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(10003, 'How-to Guide')}
        </Heading>
        <YoutubeEmbed embedId="u0HfWDLR-hI" />
      </CardBody>
    </StyledYoutubeCard>
  )
}

export default YoutubeVideoCard
