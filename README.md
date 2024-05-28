# Du it

- Simple to-do list creation with retrospective capabilities
- Created using UnoCSS for personal use and as a practice project
- My morning routine involves writing down three important tasks, and in the evening, I briefly reflect on them. I made this because I haven't been using my notebook lately. The data is stored in localStorage, but it would be nice to integrate it with Notion or Google Calendar in the future.

# 기능

- Enter를 누르면 인풋에 자동 포커싱
- Hovering 시 delete 가능
- 리스트 드래그 앤 드롭 가능
  - 드롭 영역에서 벗어날 시 원래 리스트가 보여짐
- 모두 done인 경우 회고란이 나타남
- localStorage 저장 & 로드

## 데모 영상

[Nov-19-2023 11-50-07.webm](https://github.com/urbanscratcher/project-todo/assets/17016494/0d359602-89e7-4ce7-be75-59b6978c2ba0)

## Technologies & Libraries

- React + JavaScript + Vite
- date-fns
- UnoCSS

## To be added

- Inline editing feature
- Refactor input
- Refactor list
- Display data from previous days
- Add animation effects
- Nested structure
- Drop down events

## Development Notes

- UnoCSS
  - While learning about CSS compilation/bundling, I came across UnoCSS and decided to apply it. It took quite a while to set up.
  - Using attributify was somewhat unstable, with IntelliSense working intermittently.
  - I discovered FontShare and iconify, which are excellent.
  - UnoCSS is more flexible than Tailwind, making it suitable for large projects with a design system. Its ability to extend naming rules using regex is a significant advantage.
  - As the ecosystem matures, its potential will grow, but the official documentation and setup details are currently a bit lacking.
  - Overall, it seems to be more suitable for advanced users familiar with Tailwind or other presets.
- date-fns
  - Although I have been using the native Intl, I decided to become familiar with a date library, so I chose date-fns.
  - Among the mentioned moment alternatives (dayjs, date-fns, luxon), benchmarks suggest this library is the most flexible and performant.
  - It is well modularized and has a small package size, making it favorable for bundling.
  - However, running a bundle analyzer or checking the network tab reveals that its size can still be significant.
  - This project considers future calendar functionality, but for simple date calculations, custom functions might be more efficient.
- Drag and Drop
  - I studied drag events to implement this feature without a library.
  - Styling was quite challenging and unclear, so I need to study more.
