const Discord = require('discord.js');
const ffmpeg = require('ffmpeg');
const fs = require('fs');
const nodeopus = require('node-opus');
const opusscript = require('opusscript');
const ytdl = require('ytdl-core');
const bot = client;
const client = new Discord.Client();
const dispatcher = connection.playFile('./music/Cant-Stop-The-Feeling.mp3');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => { 
    if (!message.guild) return;

    if (message.content === `!join`) {
      if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection =>{
          message.reply('Connected to the voice channel! Im gonna play Cant Stop The Feeling');
          dispatcher.on('end', () => {
            // The song has finished
          });
          
          dispatcher.on('error', e => {
            // Catch any errors that may arise
            console.log(e);
          });
          
          dispatcher.setVolume(0.5); // Set the volume to 50%
          dispatcher.setVolume(1); // Set the volume back to 100%
          
          console.log(dispatcher.time); // The time in milliseconds that the stream dispatcher has been playing for
          
          dispatcher.pause(); // Pause the stream
          dispatcher.resume(); // Carry on playing
          
          dispatcher.end(); // End the dispatcher, emits 'end' event
        })
        .catch(console.log);
    } else {
      message.reply('You nned to join a voice channel first!');
    }
  }
});

client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === '!whatismyavatar') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
});

client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === '!ping') {
    // Send the user's avatar URL
    msg.reply('Pong');
  }
});

client.on('message', msg => {
  if (msg.content === '!rbxacademygroup') {
    msg.reply('The command is valid, but not avilable at this time.');
  }
});

client.on('message', msg => {
  if (msg.content === '!rbxacademy') {
    msg.reply('The command is valid, but not avilable at this time.');
  }
});

client.on('message', msg => {
  if (msg.content === '!rbxacademyoffices') {
    msg.reply('The command is valid, but not avilable at this time.');
  }
});

client.on('message', msg => {
  if (msg.content === '!github') {
    msg.reply('The Github is: https://github.com/roblox-academy');
  }
});

client.on('message', msg => {
  if (msg.content === '!website') {
    msg.reply('The website is: https://robloxacademy.tk');
  }
});

client.on('message', msg => {
  if (msg.content === '!commands') {
    msg.reply('Here are the commands: !rbxacademy !rbxacademygroup !rbxacademyoffices !github !website | Moderators and Admins: !kick !ban');
  }
});


client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('!kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick('Optional reason that will display in the audit logs').then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to kick the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
});

client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith('!ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
         */
        member.ban({
          reason: 'They were bad!',
        }).then(() => {
          // We let the message author know we were able to ban the person
          message.reply(`Successfully banned ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to ban the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    } else {
    // Otherwise, if no user was mentioned
      message.reply('You didn\'t mention the user to ban!');
    }
  }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to Roblox Academy, ${member}`);
});

// Create an event listener for new guild members
client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Bye ${member}, Hope to see you again!`);
});

client.login(process.env.BOT_TOKEN);
