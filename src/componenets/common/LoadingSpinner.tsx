import styled from 'styled-components';

const LoadingSpinner = ({innerRef}: {innerRef?: any}) => {
    return (
        <StyledLoaidngSpinnerContainer>
            <StyledLoadingSpinner
                ref={innerRef}
                alt='loading-spinner'
                src='/asset/svg/loading_spinner.svg'
            />
        </StyledLoaidngSpinnerContainer>
    );
};

const StyledLoaidngSpinnerContainer = styled.div`
    padding: 4px 0 4px 0;
    display: flex;
    justify-content: center;
`;

const StyledLoadingSpinner = styled.img`
    width: 80px;
`;

export default LoadingSpinner;
