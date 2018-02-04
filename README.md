# divBow

### divBow is a page designed to practise a number of development skills;
* Flexbox
* CSS grid
* javascript animation
* set and clear interval

## Design
* When the page loads, the main components are contained within a Flexbox. The left div (20% of width) will hold the menu, and the right div (80%) will hold the animation.
* Once the size of the right div is known, the largest possible box that will fit inside, is appended to that right div.
* Then using the box size from the menu *(default 20px)*, we append as many small boxes as will fit inside the big box. These small boxes are laid out on the screen using CSS grid

## Animations
* all the animations are triggered from the buttons in the menu (the first is a "static" animation).
* each animation will act on the color of the small squares
* the speed of the animation is varied by the interval in the menu.
* for Rainbow, Diagonal and Heartbeat we use maths to make the colors change the squares in an organised manner.
* for Mesmerise and Hypnotise I let the maths be a bit weird to cycle through the colors in a disorganised manner.
