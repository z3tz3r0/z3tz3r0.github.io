# Frontend Mentor - Social links profile solution

This is a solution to the [Social links profile challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/social-links-profile-UG32l9m6dQ). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Continued development](#continued-development)
    -   [Useful resources](#useful-resources)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

-   See hover and focus states for all interactive elements on the page

### Links

-   Live Site URL: [Live Site](https://z3tz3r0.github.io/social-links-profile-main/index.html)

## My process

### Built with

-   Semantic HTML5 markup
-   CSS custom properties
-   Flexbox
-   Mobile-first workflow
-   BEM naming convention
-   CSS `clamp()` function

### What I learned

My main goal for this challenge was to implement the **BEM naming convention** while keeping the HTML as semantic as possible. Using BEM helped me organize my CSS and made it easier to style elements from top to bottom. I found that it significantly streamlined the development process when starting from scratch.

I also focused on being more precise with sizes and responsiveness for both mobile and desktop views. I used Image editing software to measure possible exact sizes and leveraged the inspect dev tools more frequently to adjust sizes quickly. This time, I felt less scared compared to previous challenges, and even without a Figma file, I took a step further in precision.

One technique I learned from YouTube was using the universal selector `*` to select all child elements, which helped me show box outlines around blocks during development. This, combined with increased use of the inspect dev tool, made it easier to visualize and adjust my layout.

Additionally, I utilized the CSS `clamp()` function for responsive sizing, which I found very useful. Here's an example of how I used it:

```css
.card {
    width: clamp(20.5rem, 19.048rem + 6.2vw, 24.625rem);
    height: clamp(37rem, 30.828rem + 12.16vw, 38.125rem);
}
```

### Continued development

I'm currently in a bootcamp, and I want to continue improving on CSS transitions and animations, including keyframes. I also aim to strengthen my understanding of Flexbox and CSS Grid to enhance my layout skills. These are areas I find fascinating and believe will greatly improve my frontend development capabilities.

### Useful resources

-   [Clamp function generator](https://min-max-calculator.9elements.com/) - This tool helped me generate the `clamp()` functions for responsive sizing by taking both `px` or `rem` and viewport size as input.
-   [Make your CSS variable names suck less](https://www.fixate.it/blog/make-your-css-variable-names-suck-less) - This article gave me ideas on how to properly name CSS variables in the `:root`.
-   [BEM Naming Convention](https://www.youtube.com/watch?v=N1TYlM0GA5E) - Easy Tutorial - This YouTube video clearly explained the BEM naming convention and helped me have a breakthrough in understanding and applying it.

## Author

-   Website - [z3tz3r0](https://z3tz3r0.github.io/)
-   Frontend Mentor - [@z3tz3r0](https://www.frontendmentor.io/profile/z3tz3r0)

## Acknowledgments

I want to give a hat tip to the creator of the YouTube tutorial on BEM naming conventions. His explanation helped me understand and effectively implement BEM in this project. Also, thanks to the resources that guided me in using the `clamp()` function and naming CSS variables more effectively.
