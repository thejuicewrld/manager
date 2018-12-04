const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});
const fs = require("fs");
client.commands = new Discord.Collection();
var prefix = "%"


// Command Handler :

fs.readdir("./cmd", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.lenght <= 0){
        console.log("Il n'y a aucune commande.")
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./cmd/${f}`);
        console.log(`${f} chargé !`)
        client.commands.set(props.help.name, props);
    })
})

client.on("ready", async () => {
    console.log(`Connecté en tant que ${client.user.username} !`)
    

});


client.on("message", async message => {


    


    // autres

    let msgArray = message.content.split(" ");
    let cmd = msgArray[0];
    let args = msgArray.slice(1);


    //Command Handler :
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);


});

client.login("NTE4Nzg4NTExMTI2NTE5ODA4.DuV3BQ.dTnCECDSIvs1jDhnp4KnnfNUQc0")
