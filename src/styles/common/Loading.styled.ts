import styled from 'styled-components';

export const StyledLoadingAnimationBar = styled.div<{blur: string}>`
    @keyframes shine {
        from {
            transform: translateX(-15%);
        }

        to {
            transform: translateX(800%);
        }
    }
    position: absolute;
    z-index: 1;
    width: 15%;
    height: 100%;
    display: block;
    background: white;
    filter: blur(${props => props.blur});
    animation: shine 1.2s infinite;
`;
