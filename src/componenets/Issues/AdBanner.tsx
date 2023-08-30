import styled from 'styled-components';

const AdBanner = () => {
    return (
        <StyledAdBannerContainer>
            <a href='https://www.wanted.co.kr/' target='_blank' rel='noreferrer'>
                <span className='ad-tag'>ad.</span>
                <img alt='ad_banner' src='/asset/images/ad_image.png' />
            </a>
        </StyledAdBannerContainer>
    );
};

const StyledAdBannerContainer = styled.div`
    border-bottom: 1px solid gray;
    cursor: pointer;
    a {
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;
        .ad-tag {
            padding: 4px;
            position: absolute;
            margin-top: 5px;
            right: 10px;
            color: gray;
            border-radius: 4px;
            background-color: lightgray;
        }
        img {
            width: 100%;
        }
    }
`;

export default AdBanner;
