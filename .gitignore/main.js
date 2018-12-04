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


client.on("guildMemberAdd", member => {

    var joinrole = member.guild.roles.find('name', 'Client')
    member.addRole(joinrole);

    var joinembed = new Discord.RichEmbed()
    .setColor('#020202')
    .setAuthor('MultiBot', client.user.avatarURL)
    .setFooter('MultiBot, développé par Angel 🐢#2344')
.setThumbnail(member.user.avatarURL)
.setDescription(`Bienvenue ${member.user} sur le serveur !`)
.addField("Passe du bon temps sur **MultiBot || Support**", "si tu as une question, pose la dans <#518805117387145219> !")

    member.guild.channels.find("name", "bienvenue").send(joinembed)
})


client.on("guildMemberRemove", member => {

    var leaveembed = new Discord.RichEmbed()
.setThumbnail(member.user.avatarURL)
.setAuthor('MultiBot', client.user.avatarURL)
    .setFooter('MultiBot, développé par Angel 🐢#2344')
.setDescription(`**${member.user.username}** nous a quitté !`)
.addField(" J'espère qu'il reviendra nous voir !", '** **')
.setColor('#020202')

    member.guild.channels.find("name", "aurevoire").send(leaveembed)
})
client.on("guildMemberAdd", member => {
    member.addRole(member.guild.roles.find(role => role.name === "Client"));
})

client.on("message", async msg => {

    //Command Handler :

    let msgArray = msg.content.split(" ");
    let cmd = msgArray[0];
    let args = msgArray.slice(1);
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,msg,args);


});

client.login(process.env.token)
