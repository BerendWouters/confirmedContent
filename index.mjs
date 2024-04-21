import fetch from 'node-fetch';
import cron from 'node-cron';
import express from 'express';
import {readFileSync} from "fs"
const app = express();

app.set('view engine', 'ejs');

console.log(process.env);

// Function to fetch all submissions recursively
async function fetchAllSubmissions(url, allSubmissions = []) {
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': 'Token ' + process.env.AUTH_TOKEN
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching submissions: ${response.statusText}`);
        }

        const data = await response.json();
        allSubmissions.push(...data.results);

        // Check if there is a next page
        if (data.next) {
            return fetchAllSubmissions(data.next, allSubmissions); // Recursively fetch next page
        } else {
            return allSubmissions; // No more pages, return all submissions
        }
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}
let filteredSubmissions;
// Function to perform the scheduled task
async function scheduledFetch() {
    const submissions = await fetchAllSubmissions('https://content.fri3d.be/api/events/fri3dcamp2024/submissions/');
    console.log(`Fetched ${submissions.length} submissions.`);
    extractFilterTypes(submissions);
    // Filter submissions by state and exclude specific submission type
    filteredSubmissions = submissions.filter(submission => {
        const isConfirmed = submission.state === 'confirmed';
        const isNotNSFWWorkshop = !(submission.submission_type.en === 'NSFW workshop (120 min)' && submission.submission_type.nl === 'NSFW workshop (120 min)');
        return isConfirmed && isNotNSFWWorkshop;
    });
    for (let i = filteredSubmissions.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at indices i and j
        [filteredSubmissions[i], filteredSubmissions[j]] = [filteredSubmissions[j], filteredSubmissions[i]];
    }
    // Process the submissions as needed
//    for (let s of filteredSubmissions) {
//	    console.log(s.submission_type)
//    }
}

async function dummyFetch() {
	filteredSubmissions = JSON.parse(readFileSync("./data/dummy.json", 'utf8'));
    extractFilterTypes(filteredSubmissions);
	
}

function extractFilterTypes(submissions){
    
    const filterTypes = [...new Set(submissions.filter(s => s.submission_type).map(s => s.submission_type?.en))]
    console.log(filterTypes);
    
}

// Schedule the task to run every hour

if (process.env.USE_DUMMY) {
	cron.schedule('* * * * *', dummyFetch);
} else {
	cron.schedule('0 * * * *', scheduledFetch);
}

console.log('Scheduled task set to fetch submissions every hour.');

if (process.env.USE_DUMMY) {
	dummyFetch();
} else {
	scheduledFetch();
}

app.use(express.static('public'))

app.get('/', function(req, res) {
	res.render('submissions', { filteredSubmissions } );
});

app.listen(3000);
console.log("app listening on 3000");
