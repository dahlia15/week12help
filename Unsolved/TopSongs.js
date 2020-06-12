const mysql = require ("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "password",
    database: "top_songsDB"
});


connection.connect(function(err, res) {
    if (err) throw err;
    songStart();
})

function songStart() {

    inquirer.prompt([{
        type: "list",
        name: "start",
        message: "What Do You Want To Do?",
        choices: ["View Songs By An Artist", "View Artists That Appear More Than Once", "View Songs Between Years", "Exit"]
    }]).then(function(answers) {
        switch (choices.start) {
            case "View Songs By An Artist": songView();
            case "View Artists That Appear More Than Once": songArtist();
            case "View Songs Between Years": songYear();
            case "Exit": songEnd();
            default: "Select";
        }
        
    })
}

function songView() {
    inquirer.prompt([{
        type: "input",
        name: "songName",
        message: "What Is The Artist's Name?"
    }]).then(function(answers){
        var query = connection.query("SELECT * FROM top_songsDB.top1000 WHERE ?", 
        {artist_name = answers.songName}, function(err, res) {
            if (err) throw err;
            console.log("Position: " + res[i].position + " | Artist Name: " + res[i].artist_name + " | Song Name: " + res[i].song_name);

        });
        
    });

    songStart();
}

function songArtist() {
    var query = connection.query("SELECT artists FROM top_songsDB.top1000 WHERE COUNT(*) AS numTimesOnChart > 1 ORDER BY COUNT(*) DESC", 
    function(err, res){
        if (err) throw err;
        console.log("Artist Name: " + res[i].artist_name + " | Number Of Times On Chart: " + res[i].numTimesOnChart)
    })
    songStart();
}

function songYear() {
    inquirer.prompt([

    {
        type:"input",
        name: "min",
        message: "What Is The Start Year?"
    },
    {
        type:"input",
        name: "max",
        message: "What Is The End Year?"
    },

]).then(function(answers){
    var query = connection.query("SELECT * FROM top_songsDB.top1000 WHERE year BETWEEN ? AND ?", {year = answers.min}, {year = answers.max}, 
    function (err, res) {
        if (err) throw err;
        console.log("Song Name: " + res[i].song_name + " | Year: " + res[i].year)
    })
})
    songStart();
}

function songEnd() {
    console.log("Bye!");
    connection.end();
}