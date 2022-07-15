#Dragon-Quest

---Features---

-A search and find that is not where's waldo

-Stolen art from Dragon's Quest by Usborne

-Individual item tracking

-magnifying glass

-options menu with;
    -timer
    -total items found
    -leaderboard
    -highlighting options
    -magnifying options

-leaderboard, upload your times and compare with others!

-Custom styling that stays faithful to the original book

-Fun and cute animations as always!

---Devlog---

July 3rd, 2022

    Technically I'm writing this on the fourth just so that I can keep track of what I did on each day. 

    Spent a few minutes as usual coming up with a better idea for this project. Other projects were cool, some detailed graphic of pop culture references where you need to find the right guy. Fun, but kinda worthless past a few minutes of fun for the average adult. And the leaderboards are mostly worthless, since you only have to find 1-3 things, and it's always the same stuff. So you find them once, and then repeat the game until you can click them all in three seconds. Not very engaging.

    As a child, I had a handful of similar seek and find books. I've been on a mission to rediscover them, but most of the good ones have been seemingly lost to the sands of time. One which I was able to find is Dragon Quest, a fantasy book with incredible art and a larger list of things to find than other books. Like, 100 things to find compared to fewer than 10. And the few things you need to find to "progress" in the story can be some of the hardest, with red herrings and other tricks to fool you. The issue here, is that I don't own the book.

    Luckily, open library has a scan of it than I can use. The site is setup so that you have to borrow books, and aren't supposed to be able to save images from them. Of course, once you crack open devtools, saving them is trivial. All was going well, I stitched some of the pages back together, and I just needed to mark all the items somehow. Now, this was going to be tough. There are many items to find of many different shapes and sizes, so I couldn't just make little geometric hitboxes like I'm sure most did. I did a lot of googling, and a lot of tweaking my code, and got a color picker to work based on cursor position. 

    Why is this useful, you ask? Well, I started putting together a colour-key mask. Basically, I colour in each item to find, and then compare cursor position on the image with that key, and when you click on a coloured item, you got it! But how to differentiate between all 100 items? Easy! Since we have a colour picker that essentially return RGBA values, we simply set one of those values to be increased by one for each item. So item 1 could be 100, 0, 1 and item 56 could be 100, 0, 56. Not easy to differentiate adjacent items by eye, but the computer doesn't struggle at all!

    I began colouring in the items, but the original key I had to use was too low resolution to use, and the original image with the art was also too low resolution to even find things. So, I needed better resolution for both, but at the very least the key. By this time it was already the end of my study time, so this was a problem for tomorrow Seb.

    Also I used a magnifying glass that W3 had code for. Nice.

July 4th, 2022

    Spent the better part of an hour trying to find a better scan. Considered just buying the book, but then realized that I couldn't have it shipped in a reasonable time frame. Went back to open library, and found that by zooming in, the site uses a much higher resolution image. Around four times the pixels. Problem solved! Now I just need to restitch the main image, and colour in the key.

    Finished creating the colour key, which was a pain in the ass. Some of the items were gone because of the page fold. One literally wasn't in the art, but was included in the key, so I'm not gonna add it in. 

    Had to spend time adjusting everything to work with the new higher resolution. Once that was done, I noticed that the color picker was showing a sort of gradient between colours and on the edge of items, where it was a hard edge in my original png. For a regular image, this is one line of CSS to fix. For a canvas rendering an image, it's a little more work. Got it done anyway, but now there was a new problem. The getImageData call was reading info from the old render of the canvas/image, meaning nothing lined up. So I sat down, attempted some algebra, realized that I didn't remember anything from math class, and instead laid out an example and solved for X more holistically. This actually worked, and now I have a tidy little forumla with no hard-coded numbers at all. The whole thing works surprisingly well, and it's actually kinda crazy having it side by side with the original book key and seeing all the same numbers pop up on hover. 

    TOP says to incorporate this key check functionality into the back end, but I have a feeling that it will be a nightmare after all this, so I may skip that. 

July 5th, 2022

    Laptop keyboard is acting up. It was buggy before, so I switched to an external one, but now it's just spamming arrow keys. At least I have Vs. Sayu Vaporwave Mix.

    All the complex functionality got finished yesterday. Today, I just need to track what items the player have has actually found. Might spend the time splitting the key into layers so that I can mark them that way, cause it would look super cool and be useful when looking for stuff.

    A lot of work done in gimp today. But at least I got the look I was looking for. Basically, at a glance, the page should more or less look like the original scan of the book. But when you start interacting with things, you'' immediatly see all the little interations and animations that are there. And that the item counts at the bottom are dynamic. But when you go back to hunting, it all resets to look just like the scan. 

July 6th, 2022

    Spent this afternoon hand splitting and exporting and naming all the individual item mask keys, so that I could use them to show that items have been clicked. Very tedious work, but the code was super easy to implement after that. Only problem is, after I started messing around with it a bit I noticed that the site would basically crash after about a dozen items clicked, which is a problem, as the goal is to find about 100 items. If I had to hazard a guess, I would say the culprit is the massive pixel density of these images, as they are over 1080p and render the entire image despite the technically smaller size of the content itself. I may be able to simply crank down the resolution with CSS, we'll see.

July 7th, 2022

    Yesterday I restarted my laptop without shutting down my VM, and that realization scared the shit out of me. All is well though, everything got saved. 

    Also yesterday, I came up with the idea of using a canvas to draw my individual found item keys on, so that I could essentially render them as one image instead of stacking a hundred elements. Not sure yet if that's how canvas works, and I'm also running into some other issues, but we'll see what I can get done.

    I feel like I understand the canvas element even less than react useState. Good thing I have a chance to practice both here. Got the item key highlighting working pretty well. Still got a decent amount of work to do.

    It really is an incredible feeling. Brute forcing your way through a math problem until the answer shows itself. Makes you feel big.

July 8th, 2022

    Woke up early, couldn't fall back asleep, but I get to be tired. Had some sort of nightmare, not sure of what. Won't get a ton done today, but at least I can get cracking at the last few things.

July 14th, 2022

    Been a while since I've had to take a long break like this. Wasn't a fun one though.

    Saturday is my usual break day, and last saturday my mom had most of the family out the lake for a little picnic thing. I had a good time, mostly in the sun, but forgot to put on sunscreen for a large part of day, and it turns out that just slathering some several hours into a hot sunny day is not sufficient. Most of my exposed skin got burned pretty bad, but my shoulders in particular received second degree burns. The day after, I developed some pretty hideous blisters with some being the size of golf balls. I was more or less bedridden for half a week. Yesterday, those fuckers finally started to melt away from the lotion I was applying, and I literally would go lay down, feel the trickle of puss seeping down my torso, go wipe myself up, and then wait for this to happen again to rinse and repeat. Thanks to this, I was able to sleep properly for the first night in about five days. Just mild discomfort now, which is no big deal.

    The last major thing I need to add to this site is a functioning leaderboard. I've already set up firebase, and was able to succesfully read/write some test info at that time. Seems like it shouldn't be all that different than localStorage, except for react useState. 

    Sidenote about how score will be calculated. It seems pretty unlikely that anyone will actually find all 100 items seeing as close to zero people will play this, so the score uploaded to the leaderboards will be both your total items found and your time at the last item found. Then score can be sorted first by total items, and then subdivided by time. 

    I dicked around with the score timer for over an hour so that it wouldn't tick up with the regular timer. Finally got that working. Then spent about twenty minutes start to finish to get a working scoreboard where you could submit times and then have it displayed on reload. Crazy shit. Firebase is great.

    Leaderboard currently working great even with a custom nickname. Having a backend is the coolest fucking thing bro.


---To-Do---

CANCEL-Add firebase colour check
DONE-Add leaderboard
DONE-Add item get message
DONE-Add all items get message
DONE-Add effects
DONE-Add info
DONE-Ability to change magnifier size or toggle it
DONE-Mark found items.
DONE-fix top left snail
DONE-fix key
CANCEL-fix waiting for image load (getimagedata error timing)
DONE-speed up slow item count update
DONE-option for square magnifier
DONE-update title and favicon
DONE-timer
DONE-checked items opacity options
DONE-fix magnifier
CANCEL-adventure game mode where cursor changes if over an items
DONE-Add key logic
DONE-animate menu open/close
DONE-custom font
DONE-finalize styling
CANCEL-center layout
DONE-use last found item for time/score
DONE-hint to find the key
DONE-sort leaderboards
