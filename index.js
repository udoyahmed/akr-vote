import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/thank-you", (req, res) => {
    let user = req.body.voter_id;
    let vote = req.body.member_id;
    console.log(user, vote);

    // Prepare the data to be written to the file
    const data = `Voter ID: ${user}, Member ID: ${vote}\n`;

    // Append the data to a text file
    fs.appendFile("votes.txt", data, (err) => {
        if (err) {
            console.error("Error writing to file", err);
            return res.status(500).send("Server error");
        }
        console.log("Data saved to votes.txt");
    });

    res.render("index.ejs", {
        voter_id: user,
        member_id: vote
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
