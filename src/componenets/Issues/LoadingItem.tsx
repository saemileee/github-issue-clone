interface LoadingItemProps {
    innerRef?: any;
}

const LoadingItem = ({innerRef}: LoadingItemProps) => {
    return (
        <li ref={innerRef}>
            <div>next page</div>
        </li>
    );
};

export default LoadingItem;
