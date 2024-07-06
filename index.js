const { Client, Intents } = require('discord.js');
const config = require('./config.json');

const client = new Client({
    intents: [ 3276799 ],
});

client.once('Soul DMALL Work', async () => {
    console.log('');
    const guild = client.guilds.cache.get(config.guildId);
    if (!guild) {
        console.error('Guild not found.');
        return;
    }
    try {
        await guild.members.fetch();
        guild.members.cache.forEach(member => {
            if (member.user.bot) return;

            member.send(config.message)
                .then(() => {
                    console.log(`Message sent: ${member.user.tag}`);
                })
                .catch(error => {
                    console.error(`Failed to DM: ${member.user.tag}:`, error);
                });
        });
        console.log('All messages sent');
    } catch (error) {
        console.error('Error fetching guild members:', error);
    }
});
client.login(config.token);
