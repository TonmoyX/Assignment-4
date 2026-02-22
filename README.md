1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: The difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll is under the write:

getElementById - Uses getElementById when selecting by Id.
getElementsByClassName - Uses getElementsByClassName when selecting single or multiple by ClassName.
querySelector / querySelectorAll - Uses querySelector/querySelectorAll for almost everything else.

2. How do you create and insert a new element into the DOM?

Ans: Create a new element -> const div = document.createElement('div');
const h1 = document.createElement('h1');
h1.innerText = "Hello World";
insert -> div.appendChild(h1);
document.body.append('div');


3. What is Event Bubbling? And how does it work?

Ans: When we click on an element (or trigger any event), the event doesn't just effect that one element the event travels UP through all its parent elements, all the way to the top of the DOM tree.


4. What is Event Delegation in JavaScript? Why is it useful?

Ans: Instead of adding click listeners to every button/list item,
we add one single listener to their common parent — when a child is clicked, the event "bubbles up" and the parent checks which child was actually clicked.
Why it's useful:
1-Saves memory.
2-Automatically works for new elements added later.

5. What is the difference between preventDefault() and stopPropagation() methods?

Ans: preventDefault() just stop the browser default action.
     stopPropagation() just stop the bubbling up to the parent element.