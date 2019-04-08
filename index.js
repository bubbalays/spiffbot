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
      .setDescription(member.user.username + ", " + " Welcome Spiffling!")
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
    let modlogChannel = message.guild.channels.find('name', 'mod-logs')
    const profanities = require('profanities');
    let profEmbed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setAuthor("The Realm | Spiff Security")
        .setDescription("Warning Sent To ${message.author} about this message: ${message.content}") 
        .setTimestamp()    
    for (x = 0; x < profanities.length; x++) 
    {
      if (message.content.toUpperCase() == profanities[x].toUpperCase())
        {
          message.author.send('Spiff Security, Swearing is not allowed here. Please refrain from swearing.')
          message.delete()
         return;
        }
    } 
  })

  // For Anti-Spam 
    bot.on('ready', () => {
      // Module Configuration Constructor
       antispam(bot, {
            warnBuffer: 3, // Maximum ammount of messages allowed to send in the interval time before getting warned.
            maxBuffer: 10, // Maximum amount of messages allowed to send in the interval time before getting banned.
            interval: 2000, // Amount of time in ms users can send the maxim amount of messages(maxBuffer) before getting banned. 
            warningMessage: "please stop spamming!", // Message users receive when warned. (message starts with '@User, ' so you only need to input continue of it.) 
            banMessage: "has been banished from Lord Spiff's Kingdom for spamming!", // Message sent in chat when user is banned. (message starts with '@User, ' so you only need to input continue of it.) 
            maxDuplicatesWarning: 7,// Maximum amount of duplicate messages a user can send in a timespan before getting warned.
            maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned.
            deleteMessagesAfterBanForPastDays: 7, // Deletes the message history of the banned user in x days.
            exemptRoles: ["King's Hand", "Spiff Bot"],
            exemptUsers: ["TheLordSpiffy#4468"]
          })
        });
 bot.on('ready', function(){
      console.log("Ready");
    })

