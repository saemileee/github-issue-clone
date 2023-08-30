import styled from 'styled-components';
import colorPalette from '../colorPalette.styled';

export const IssueListLi = styled.li`
    padding: 12px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid ${colorPalette.listBorder};
`;
