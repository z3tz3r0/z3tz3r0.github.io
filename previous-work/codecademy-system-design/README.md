What to include here:
colors
fonts
and specific text styles

https://design.wonderflow.ai/get-started/documentation/get-started/introduction

https://www.ibm.com/design/language/typography/typeface

https://atlassian.design/get-started

# Page structure

## index.html

I'll skip the head part since it's not quite related

-   `Body`

    -   `header`

        -   nav.`header__nav`
            -   p.`nav__logo`

    -   main.`main__section`

        -   article.`section__hero`
            -   h1.`content__hero_title`
            -   p.`content__hero_desc`
        -   article.`section__content`
            -   section.`content__main_title`
            -   section.`content__main_desc`

    -   aside.`sidebar`

        -   ul.`sidebar__menu`
            -   li.`sidebar__menu_item`

    -   `footer`

So, other page should replace the main.content innerHTML
