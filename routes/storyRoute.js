const express = require("express");
const router = express.Router();  

const latestStories = [] 

router.get('/', async(req,res)=>{
    
    if(latestStories.length === 0)
    {
        await fetchLatestStories();
    }
    res.status(200).json(latestStories);
})


function fetchLatestStories()
{
    const url = 'https://time.com/';
    fetch(url)
    .then(function(response) 
    {
        if (response.status !== 200) {
            console.log('Looks like there was a problem, Error: ' + response.status);
            return;
        }

        response.text().then(function(data) 
        {

            const startMarker = '<div class="partial latest-stories"';
            const endMarker = '</div>';

            const startIndex = data.indexOf(startMarker);
            const endIndex = data.indexOf(endMarker, startIndex);
            const latestStoriesSection = data.slice(startIndex, endIndex + endMarker.length);

            const stories = latestStoriesSection.split('<li class="latest-stories__item">').slice(1, 7);

            stories.map((story) => {

                const titleStart = story.indexOf('<h3 class="latest-stories__item-headline">') + '<h3 class="latest-stories__item-headline">'.length;
                const titleEnd = story.indexOf('</h3>', titleStart);
                const title = story.slice(titleStart, titleEnd);

                const linkStart = story.indexOf('<a href="') + '<a href="'.length;
                const linkEnd = story.indexOf('">', linkStart);
                let link = story.slice(linkStart, linkEnd);
                let originalLink = url + link;

                latestStories.push({"title" : title, "link" : originalLink });

            });

            console.log(latestStories);
        });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error : ', err);
    });
}


module.exports = router;