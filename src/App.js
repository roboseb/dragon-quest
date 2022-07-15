import SearchImage from "./components/SearchImage";
import React from "react";

function App() {
  return (
    <div id="app">
        <div id='blurb'>
            <div>Hey, I'm Seb, and I made this thing you're looking at.</div>
            <div>As a kid, I read this book a ton and could never find half of the items, not even the key characters for the story. I spent a long time looking for this book online, not knowing the name, author, or series, but I eventually found it. It seems to have gone relatively forgotton in the public conscious, which is a shame, so here it is again.</div>
            <div>I "borrowed" the images used from openlibrary.org, which is honestly a pretty dope site if you've never used it.</div>
            <div>The font used is Old Newspaper Types by Manfred Klein on dafont.com. I think it's a decent match for the book's font.</div>
            <div>This project was assigned by the Odin Project, a free online curriculum for full-stack web development, which you should also check out.</div>
            <div>Most of the other projects I saw posted were using either a Where's Waldo page with about 1-3 characters or a similar modern graphic with pop culture characters in which you also had to find 1-3 characters. This isn't all that stimulating for most people as they can probably find everything in one or two minutes.</div>
            <div>I wanted to make a slightly different project, as I usually do. Thankfully, I remembered this book, "Dragon Quest" by Usborne. It has a story and way more stuff to find. It has gorgeous art. Best of all, it has stuff to find that is genuinely hidden and hard to find. Even the main three people to find on these pages should provide a challenge.</div>
            <div>On this site, you have some tools that should help you along the way. Hover over icons of things to find to expand them and show the amount remaining. Right click at any time to toggle a magnifiying glass. Click on the image below the shortsville title and you will see more options.</div>
            <div>In order, the menu lets you; see your total items found, see your current time, open the leaderboards, toggle found item highlighting, adjust found item opacity, toggle the magnifier, change the shape of the magnifier, and change the size of the magnifier.</div>
            <div>Oh yeah, that's right. Every time you find an item it will be highlighted on the image. This is related to my slightly over-engineered system of checking whether or not you've found an item in the first place.</div>
            <div>When you click, there is an invisble recreation of the image with only item silhouettes that your click is compared to. On that recreation, which is a canvas, a function checks the colour value of the canvas click point and return the B value of the RGB as a number between 1 and 100. As each of the silhouette has a unique b value, this can be used to mark the item as found and show the corresponding silhouette. This was a nightmare to assemble, but allows much more precison and scalability than other methods I considered.</div>
            <div>Opening the leaderboards will show a few things. It again reveals your current item count, but also shows what your timer the last time you found an item. This allow the site to score players both on time and amount of items found, which is pretty relevant when the total item count is nearly 100. You can then input a 1-3 character nickname, and submit your score to a public leaderboard.</div>
            <div>On that note, why nearly 100? The original book has 100 items find on these pages, but adding up all the items you have listed to find only adds up to 94, ignoring the numbers on the original page. In the original book, it's explained that you need to find a red key in each page, which you can find here. (Isn't that cool? You need to remember to find something that was mentioned outside of the actual image page!) In addition, there are four items which were absorbed by the page folds during the scanning process. Finally, The book's item key, which I used to build everything, show a burger near the snail counter, which is nowhere to be found in the actual image.</div>
            <div>One of my goals with this project was to retain as much of the style and art of the original book. With the right options set, you can play and have the art remain untouched and almost 100% original.</div>
            <div>This could have been a short project, however as I often do, I went massively out of my way to make something a little more special, and this took extra time. I also went to the lake and acquired second-degree burns on my shoulders, which also slowed down my progress. Because of the scope of the project, there are some known issues that I will likely not be fixing.</div>
            <div>The page must be refreshed to see leaderboard changes. The page does not save any sort of progress. The leaderboard has a default scrollbar for scores and I hate it. The listed item counts on the original page are now inaccurate, and I won't change it. Animations after clicking an item can be a little slow. The way I place many element means the site only works properly at 1080p, which is probably my biggest regret of them all. Also, depending on load order and timing, the page may break and force you to refresh.</div>
            <div>Anyway, have fun, and if you're reading this, you seriously need some better hobbies.</div>
        </div>
        <SearchImage />
    </div>
  );
}

export default App;
