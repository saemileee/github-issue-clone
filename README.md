# 무한스크롤과 실시간 상태 업데이트를 고려한 깃헙 이슈 클론

해당 레포지토리는 팀원들과 함께 Best Practice를 도출하고 팀 과제 구현을 위해 개인으로 진행한 과제
구현한 소스를 담고있습니다.

## 과제 소개

-   [특정 깃헙 레파지토리(React)의 이슈 목록](https://github.com/facebook/react/issues)과 상세
    내용을 확인하는 웹 사이트 구축 + Best Practice 도출
    > Best Practice란 모범사례라는 말로서, 특정 문제를 효과적으로 해결하기 위한 가장 성공적인 해결책
    > 또는 방법론을 의미합니다. 과제 수행 과정에서 Best Practice란 팀원들이 각자의 구현방법을
    > 설명하고 토론했을 때 팀 안에서 이 방법이 가장 효율적이라고 판단되는 것을 정하고 그것을 팀의
    > Best Practice로 삼는것입니다. 이때 특정한 팀원의 과제 전체를 Best Practice로 선정하는 것이
    > 아닌, 과제의 각 부분이나 중점을 둬야할 부분을 단위를 나눈뒤, 각 단위마다의 Best Practice를
    > 토론하고, 단위별로 Best Practice를 모아서 팀의 최종 결과물을 만들어내는 방식으로 진행해주세요.

## 목표 설정

-   API 모듈화
    -   axios.interceptor를 통한 모듈화
-   인피니티 스크롤
    -   데이터 무결성 유지
-   UX 고려
    -   로딩 상태 알려주기
-   에러처리
    -   api 호출 에러와 라우터 에러 분리
-   클린코드
    -   관심사 분리로 유지보수성 향상

## 개발 기간

2023.08.29-2023.08.31

## 시작 가이드
* [배포 주소](https://github-issue-clone-hazel.vercel.app/issues)


-   프로젝트 실행 방법
    ```
    1. 루트 경로에 .env 파일 추가 후 `REACT_APP_GIT_TOKEN = 개인 깃헙 토큰` 추가 (미설정 시 api 호출 횟수 제한)
    2. $ npm install
    3. $ npm start
    ```

## 구현 화면
|      구현 화면      |  
| :---------------------------------: |
| ![구현 이미지](https://github.com/saemileee/wanted-pre-onboarding-12th-2nd/assets/68241138/98f8cca2-437c-47a2-9cdb-f48840c9561b) |

## 과제 디테일을 위한 고민

### ✅ 상태관리

- [X] `useState`: 상태가 필요한 페이지인 이슈 리스트와 이슈 상세페이지는 컴포넌트 뎁스가 적어
    `props drilling`이 발생할 경우가 적어 `useState`로 상태를 관리해도 충분하다 판단하였습니다.
- [X] `recoil`: 다만, 이슈 리스트는 무한스크롤로 구현되어 사용자가 이슈 상세페이지에 진입하다가 다시
    이슈 리스트를 되돌아올 경우 기존의 페이지 정보를 유지하기 위해 모든 컴포넌트에서 공통적으로
    상태를 공유하도록 도와주는 `recoil`을 통해 전역적으로 이슈리스트 상태를 관리하고 보존하기로
    하였습니다.

### ✅ 관심사 분리

- [X]  프론트엔드 앱 구조
    <img width="1698" alt="깃헙 이슈 클론 앱구조" src="https://github.com/saemileee/wanted-pre-onboarding-12th-2nd/assets/68241138/15d10d3e-b9cd-419c-a3d2-dc1665e96a6a">
- [X]  커스텀 훅으로 상태 관리 로직을 분리하고 페이지, 컨테이너, 컴포넌트의 역할과 구조를 위와 같이
        구분하여 관심사를 분리하였습니다.
- [X] 위와 같이 관심사를 분리하여 코드를 작성하니, 추후 리팩토링하고, 버그를 수정하고, 팀원들에게
        제 코드를 설명하기가 수월해졌습니다.

### ✅ 무한스크롤과 데이터 무결성

- [X] 무한스크롤로 이슈 리스트 목록을 업데이트 할 때, 기존의 이슈 목록 상태에서 서버에서 받아온 다음
    페이지의 목록을 추가하는 방식으로 구현하였습니다.
- [X]  때문에 실시간으로 이슈 정보가 업데이트 되어 이슈 목록에 렌더링 되고 있는 타이틀/코멘트가
    업데이트 되었을 때, 코멘트 정렬 순이 뒤바뀌었을 때 추가적인 처리를 하며 데이터 무결성을 고려하고
    싶었습니다.

    -   방법 1. 저장 된 페이지 값을 기반으로 기존에 본 페이지 까지 다시 리패칭하기
        -   변경 된 한, 두개의 데이터 때문에 전체 페이지를 리패칭하는 것은 네트워크 통신 비용의
            효율이 떨어진다고 판단하였습니다.
    -   방법 2. 무한스크롤 중 서버의 이슈목록 정렬이 변경되어 새로 받은 데이터와 기존 목록이 중복
        된다면 새로운 목록으로 교체하는 로직 추가

        ```tsx
        const getIssues = async (page: number) => {
                try {
                    ...
                    const res = await api.getIssues(page);
                    const newIssues = res.data;

                    setIssuesState((prev: issuesStateType) => {
                        // 서버 통신 전 코멘트 정렬이 변경될 경우 기존 배열 필터링하고 새로운 값 받기
                        const filteredIssues = prev.issues.filter(
                            preIssue =>
                                !newIssues.some(
                                    (newIssue: issueItemType) => newIssue.number === preIssue.number
                                )
                        );
                        return {
                            ...prev,
                            moreData: true,
                            issues: [...filteredIssues, ...newIssues],
                        };
                    });
                    ...
                } catch (e) {
                   ...
                } finally {
                  ...
                }
            };
        ```

    -   방법 3. 사용자가 상세페이지에 진입하여 최신의 정보를 받아왔을 때 해당 정보가 이슈 목록의
        정보와 다름을 확인하고 이슈 목록을 업데이트

        ```tsx
        const updateIssues = useCallback(
            (newIssue: issueItemDetailType) => {
                const prevIssue = issuesState.issues.find(
                    issue => issue.number === newIssue.number
                );
                if (
                    prevIssue &&
                    (prevIssue.title !== newIssue.title || prevIssue.comments !== newIssue.comments)
                ) {
                    const {number, comments} = newIssue;
                    const newIssues = [
                        ...issuesState.issues.map(issue =>
                            issue.number === number ? newIssue : issue
                        ),
                    ];

                    // 코멘트 수가 변경된다면 재정렬
                    if (prevIssue?.comments !== comments) {
                        newIssues.sort((a, b) => b.comments - a.comments);
                    }
                    setIssuesState(prev => ({...prev, issues: newIssues}));
                }
            },
            [issuesState.issues, setIssuesState]
        );
        ```

### ✅ 에러처리

- [X]  `NotFound 페이지를 재사용`하기 위해 `errorStatus상태`를 활용하여 NotFound 페이지에서는
    `Props로 전달`받은 상태에 따라 에러 정보가 노출됩니다.
- [X]  `open` 상태인 이슈 목록만 리스팅하는 과제 요구사항에 따라 url을 통해 `open`상태가 아닌
    상세페이지에는 접근이 안되어야 된다고 판단하였고, 이 경우 새로운 error를 생성하여 errorStatus를
    변경하고 `NotFound` 페이지로 이동하게 하였습니다.

| Error(ErrorStatus에 따라 에러 코드 변경) |       Error(open 상태가 아닌 이슈)        |
| :---------------------------------: | :-----------------------------------: |
| <img width="400" alt="error-page" src="https://github.com/saemileee/wanted-pre-onboarding-12th-2nd/assets/68241138/b26fa272-8e81-40af-ad6e-206349eadde4"/> | <img width="400" alt="open-error-page" src="https://github.com/saemileee/wanted-pre-onboarding-12th-2nd/assets/68241138/d1715867-aedf-4b73-af2b-3d5386073f00"/> |


### ✅ 로딩 화면

- [X]  스켈레톤 UI: 이슈리스트, 상세페이지 내 큰 면적의 콘텐츠 로딩에 사용하여 로딩 중에도 사용자가
    콘텐츠의 형태를 예측할 수 있게 하였습니다.
- [X]  로딩 스피너: 무한스크롤 로딩에 사용하여 추후 셀이 추가될 것을 예측할 수 있도록 하였습니다.

## 기술스택

### Development

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">

### Library

<img src="https://img.shields.io/badge/styled%20components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/Axios-DA291C?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=Recoil&logoColor=white">
<img src="https://img.shields.io/badge/React%20markdown%20preview-000000?style=for-the-badge&logo=Markdown&logoColor=white">
<img src="https://img.shields.io/badge/React Router Dom-3178C6?style=for-the-badge&logo=&logoColor=white">
