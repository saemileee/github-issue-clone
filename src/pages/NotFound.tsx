const NotFound = ({errorStatus}: {errorStatus?: number | string} = {errorStatus: 404}) => {
    return (
        <div>
            <p>{errorStatus}</p>
            <p>페이지를 찾을 수 없습니다</p>
        </div>
    );
};

export default NotFound;
