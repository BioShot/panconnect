//Made By BioShot\\


/*
  #UPDATE 1.0.2 CHANGELOG BY BIOSHOT

  [BEGIN $CHANGELOG]
    [BEGIN $STATUS]
      $SECTION1: NO CHANGE, LAST CHANGE: #1.0;
      $SECTION2: NO CHANGE, LAST CHANGE: #1.0;
      $SECTION3: CHANGE: @"UPDATE START FUNCTION TO CREATE A NEW SESSION!";
      $SECTION4: BROKEN;
    [END $STATUS]

  [END $CHANGELOG]

*/

//SECTION: 1\\
const express = require("express");
const crypto = require('crypto');
const cors = require('cors');
const exec = require("child_process").exec;
const os = require("os");
const axios = require('axios');
var app = express();

app.use(cors({
    origin: '*'
}));
//SECTION: 2\\
var ip='http://192.168.190.1:32012';

let sessionID;

app.get('/system', (req,res)=>{
  sessionID=req.query.sessionID;
  var command = req.query.command;
        if(command != undefined){
        if(command.includes("sudo")){
          res.send(`Error! Unable to run command ${command}, because it includes and invalid keyword: 'sudo'! Line 31 client.js.`);
        }else{
          exec(command, (err, stdout, stderr)=>{
            if(err){
              res.send(err);
              return;
            }
            if(stdout){
              res.send(stdout);
            }else{

            }

          });

          };
        }else if(req.query.getMachineName != undefined){
          const hostName = os.hostname();
          res.send(hostName ?? os.hostName);
        }
})
//SECTION: 3\\
app.listen(32012, '0.0.0.0', ()=>{
  axios.get(`http://localhost:8080/newSession?sessionInfo={"about":"blank"}`)
  .then (response => console.log(`Session ID: ${response.data}`));
});
//SECTION: 4\\
process.on('SIGHUP', function() {
  axios.get(`http://localhost:8080/session/${sessionID}/system?close=1`)
  .then (response => res.send(response.data));

  process.exit();
});
