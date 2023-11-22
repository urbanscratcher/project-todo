# Du it

- 간단히 투두 리스트를 작성하고 회고가 가능
- UnoCSS를 사용해볼 겸 개인적으로 사용할 겸 만드는 중이다.
- 내 아침 루틴이 3가지 중요한 일을 적고, 저녁에 짧게 회고하는 식인데 요즘 노트를 잘 안쓰게 돼서 연습삼아 만들어 보았다. localStorage에 저장되는데 추후 노션이나 구글 캘린더와 연동하면 좋을 것 같다.

## 데모 영상

[Nov-19-2023 11-50-07.webm](https://github.com/urbanscratcher/project-todo/assets/17016494/0d359602-89e7-4ce7-be75-59b6978c2ba0)

## 기술 & 라이브러리

- React + JavaScript + Vite
- date-fns
- UnoCSS

## 개발 여담

- UnoCSS
  - CSS 컴파일/번들링에 대해서 알아보다 UnoCSS를 알게 되어 적용해 보았다. 역시 설정에만 오랜 시간이 걸렸다.
  - attributify를 적용하면 인텔리센스가 작동했다 안 했다 해서 은근 불안정한 듯
  - FontShare, iconify를 알게 되었는데 정말 좋았다.
  - 테일윈드보다도 유연한 편이라 디자인 시스템이 갖춰진 대형 프로젝트가 더 알맞을 것 같다. 특히 정규식으로 네이밍 룰을 추가해서 확장이 가능하다는 게 큰 장점인 듯
  - 생태계가 성숙해질수록 가능성이 커질 것 같은데 공식문서나 설정의 디테일함이 2% 부족했다
  - 어쨌든 테일윈드나 기타 preset의 숙련자용인 듯
- date-fns
  - 네이티브 Intl을 사용하고 있긴 했지만, 어차피 date 라이브러리 하나쯤에는 익숙해져야 한다고 판단해서 사용해 보았다
  - moment 대체 라이브러리로 dayjs, day-fns, luxon 등이 언급되고 있어서 벤치마크 등을 찾아보니 이 라이브러리가 가장 유연하고 성능적으로도 우수한 것 같았다
  - 모듈화가 잘 돼 있고, 패키지 사이즈도 작아서 번들링에도 유리한 듯
  - 그럼에도 번들링 애널라이저를 돌리거나 네트워크 탭을 보면 용량 비중이 높음을 알 수 있다
  - 이 프로젝트는 캘린더화 할 것을 염두해두고 설치했지만, 날짜 계산이 필요 없을 때는 커스텀 함수를 구현해 놓는 것이 나을 수도 있을 것 같다
