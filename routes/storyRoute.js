const express = require("express");
const router = express.Router();  
const https = require('https');

router.get('/', (req,res)=>{
    
    if(latestStories.length === 0)
    {
        fetchLatestStories();
        // dummy()
    }
    res.status(200).json(latestStories);
})

const latestStories = [] 
const url = 'https://time.com/';


function dummy() 
{

    const url = 'https://time.com/';

    https.get(url, (response) => {

        let htmlData = '';

        response.on('data', (chunk) => {
            htmlData += chunk;
        });

        response.on('end', () => {

            const startMarker = '<div class="partial latest-stories"';
            const endMarker = '</div>';

            const startIndex = htmlData.indexOf(startMarker);
            const endIndex = htmlData.indexOf(endMarker, startIndex);
            const latestStoriesSection = htmlData.slice(startIndex, endIndex + endMarker.length);

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
    })
    .on('error', (error) => {
        console.error(`Error fetching data: ${error.message}`);
    });

}

function fetchLatestStories()
{
    fetch('https://time.com/')
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
            response.status);
            return;
        }

        // Examine the text in the response
        response.text().then(function(htmlData) {
            // data contains all the plain html of the url you previously set, 
            // you can use it as you want, it is typeof string
            const startMarker = '<div class="partial latest-stories"';
            const endMarker = '</div>';

            const startIndex = htmlData.indexOf(startMarker);
            const endIndex = htmlData.indexOf(endMarker, startIndex);
            const latestStoriesSection = htmlData.slice(startIndex, endIndex + endMarker.length);

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
        console.log('Fetch Error :-S', err);
    });
}


module.exports = router;