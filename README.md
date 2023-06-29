# 🏷️ konva-react Image Annotation Tool

> ℹ️ This project is a work in progress created using CodeSandbox, intended as a proof of concept.

The purpose of this project was to demonstrate the feasibility of implementing an image annotation tool using the HTML Canvas. We utilized the konva-react library to interact with the Canvas and incorporated components from MUI for the user interface.

## ⚙️ Tech used:
- react
- konva-react
- MUI

## ✨ Key Features:
- [x] Draw rectangles to highlight areas of the image
- [x] Enable/desable drawing using toggle
- [x] Cancel area selection using `esc` key
- [x] Show popover when an area is highlighted
- [ ] Toggle between tool types (incomplete)

## 🐞 Known bugs/feature requests
- Tool selection does not work (only the `Area` option works)
- The popover for the area in the canvas doesn't align because its `absolute` position in `CSS` is being miscalculated
- Image/canvas don't resize correctly (responsiveness)
- Hide or highlight areas on the canvas using the table
- Group shapes in the table by type 

- ## 📸 Screenshots:
![image](https://github.com/dynamic11/konva-react-experiment/assets/11470442/ccb02a0a-74ec-4695-aade-d2126aba277b)
![image](https://github.com/dynamic11/konva-react-experiment/assets/11470442/792cbac8-34f5-4c7c-9ef2-2ae6d5dc10e3)


