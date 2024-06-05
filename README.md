# Du it

May 2023, November 2023 (2 months)

With an intuitive UI, you can create and review your to-do lists. This project was inspired by my personal morning routine of listing three important tasks and reflecting on them briefly in the evening. I found it difficult to maintain a diary, so I created this application as a practice.

## Features

- **Auto Focusing**: The input field is automatically focused when the Enter key is pressed.
- **Delete To-Do**: A delete button appears when hovering over an item, allowing for easy deletion.
- **Drag and Drop Items**: To-do items can be reordered via drag and drop. If an item is dragged out of the drop zone, it returns to its original position.
- **Retrospective Section**: A retrospective section appears when all tasks are completed, allowing you to write brief reflections. Items in the retrospective can be listed by pressing the Enter key.
- **Delete Retrospective Items**: Retrospective items can be deleted.
- **Auto Date Transition**: The date automatically advances to the next day after 24 hours.
- **Data Storage and Load**: The list data is saved to `localStorage` and loaded when the page is reopened.

## Technical Focus

- Implemented the drag and drop feature for the list without using any libraries.
- Chose `UnoCSS` over `TailwindCSS` for a new utility-first CSS framework, leveraging its extensibility, readability, and custom features.
- Utilized the popular date formatting library `date-fns`.

## Demo

<video controls>
  <source src="https://github.com/urbanscratcher/project-todo/assets/17016494/0d359602-89e7-4ce7-be75-59b6978c2ba0" type="video/webm">
  Your browser does not support the video tag.
</video>

## Tech Stack

### Frontend

- **Framework**: React
- **Language**: JavaScript
- **Styling**: UnoCSS, Iconify
- **Utilities**: date-fns
- **Storage**: localStorage

### Backend X

### Database X

### Development Environment

- **Source Code**: GitHub
- **Build Tools**: Vite
- **Package Manager:** pnpm

### Cloud Services and Deployment

- **Hosting and Deployment**: Netlify

---

## Next

- Currently, data is stored in `localStorage`. It would be beneficial to integrate with Notion or Google Calendar in the future.
- Enable editing when clicking outside the text area of an item.
- Refactor `Input` and `List` components.
- Display data from previous dates.
- Add animation effects.
- Allow sub-tasks to be entered via the Tab key (using tree structures or recursive functions).
- Make completed lists collapsible.

## Development Notes

- **UnoCSS**

  - I learned about `UnoCSS` while researching CSS compilation/bundling and decided to apply it. It took a considerable amount of time to configure.
  - Using `attributify` caused IntelliSense to be unreliable, so I ended up reporting this issue.
  - Discovered other useful services like `FontShare` and `iconify`.
  - `UnoCSS` seems to be more flexible than `TailwindCSS`, making it more suitable for large projects with established design systems. The ability to extend naming rules with regular expressions is a significant advantage.
  - While promising, the ecosystem still feels somewhat immature, with official documentation and configuration details lacking.
  - It seems to be favored by those skilled with `TailwindCSS` or other preset libraries for more complex functionalities.

- **date-fns**

  - Although I was using native `Intl`, I decided to familiarize myself with a date library, and chose `date-fns`.
  - After researching alternatives like `dayjs`, `luxon`, and `moment`, I found `date-fns` to be the most flexible and performant.
  - It's well-modularized and has a small package size, which is advantageous for bundling.
  - However, running a bundling analyzer or checking the network tab revealed a significant size impact.
  - For this project, using a library was necessary due to the potential for a calendar feature. However, for simpler date calculations, custom functions might be more efficient.

- **Drag and Drop Feature**
  - Studied the `drag` event to implement the feature without a library.
  - Styling was particularly challenging, requiring further study.
