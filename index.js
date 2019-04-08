const Discord = require('discord.js');
const bot = new Discord.Client();
const antispam = require('discord-anti-spam');
bot.login(process.env.BOT_TOKEN);

// For Members who Join/Leave
bot.on('guildMemberAdd', member => {
    let logChannel = member.guild.channels.find('name', 'join-left');
    
      let logEmbed = new Discord.RichEmbed()
      .setColor('00FF00')
      .setAuthor("The Realm | Logs") 
      .setDescription(member.user.username + ", " + " Welcome Weary Traveller!")
      .setTimestamp()
      logChannel.send(logEmbed);
    })
    bot.on('guildMemberRemove', member => {
    let logChannel = member.guild.channels.find('name', 'join-left');
    
      let logEmbed = new Discord.RichEmbed()
      .setColor('00FF00')
      .setAuthor("The Realm | Logs") 
        .setDescription(member.user.username + ", " + " Spiffling was lost in battle.. RIP")
      .setTimestamp()
      logChannel.send(logEmbed);
    });

// For List of Commands
bot.on('message', function(message){
  
    if(message.content.toUpperCase() == 's.help'.toUpperCase())
    {
     let helpEmbed = new Discord.RichEmbed()
      .setColor('00FF00')
      .setAuthor("The Realm | Help Desk") 
      .setDescription("This bot is currently only for moderation of spam and swearing. If you have any questions or concerns about this bot, fill free to direct message Bubbalays or TheLordSpiffy. Thank you!")
      .setTimestamp()
      return message.channel.send(helpEmbed)
    }
});

// For Anti-Swear
bot.on("message", async message => 
{
  if (message.author.bot) return
    const profanities = require('profanities');
    //let modlogChannel = message.guild.channels.get(564544648748597248)
    //let profEmbed = new Discord.RichEmbed()
        //.setColor('00FF00')
        //.setAuthor("The Realm | Spiff Security")
        //.setDescription("Warning Sent To ${message.author} about this message: ${message.content}") 
        //.setTimestamp()    
    for (x = 0; x < profanities.length; x++) 
    {
      if (message.content.toUpperCase() == profanities[x].toUpperCase())
        {
          message.author.send('Spiff Security, Swearing is not allowed here. Please refrain from swearing.')
          message.delete() 
          message.channels.get(564544648748597248).send("Test")
         return;
        }
    } 
  })

  // For Anti-Spam 
  // 5 messages in 8 seconds = 1 warning
  // 3 warnings = kick

    bot.on('ready', () => {
    // Module Configuration Constructor
     antispam(bot, {
          warnBuffer: 5, // Maximum ammount of messages allowed to send in the interval time before getting warned.
          interval: 8000, // Amount of time in ms users can send the maxim amount of messages(maxBuffer) before getting banned. 
          warningMessage: "please stop spamming!", // Message users receive when warned. (message starts with '@User, ' so you only need to input continue of it.) 
          banMessage: "has been hit by ban hammer for spamming!", // Message sent in chat when user is banned. (message starts with '@User, ' so you only need to input continue of it.) 
          maxDuplicatesWarning: 7,// Maximum amount of duplicate messages a user can send in a timespan before getting warned.
          maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned.
          deletMessagesAfterWarningForPastDays: 7, // Deletes the message history of the warned user in x days.
          exemptRoles: ["Moderator"], // Name of roles (case sensitive) that are exempt from spam filter.
          exemptUsers: ["MrAugu#9016"] // The Discord tags of the users (e.g: MrAugu#9016) (case sensitive) that are exempt from spam filter.
        });
  });
   
  bot.on('message', msg => {
    bot.emit('checkMessage', msg); // This runs the filter on any message bot receives in any guilds 
  })


