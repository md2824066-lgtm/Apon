module.exports = {
  config: {
    name: "guess",
    version: "1.0",
    author: "A P O N",
    role: 0,
    shortDescription: {
      en: "Guess the number game",
    },
    category: "game",
  },

  onStart: async function({ message, event }) {
    const number = Math.floor(Math.random() * 100) + 1; // 1-100

    await message.reply("আমি ১ থেকে ১০০ এর মধ্যে একটি সংখ্যা ভাবছি। তোমার কাজ সেটা খুঁজে বের করা।\n\n'!try' লিখে সংখ্যা অনুমান করো।");

    global.guessNumbers = global.guessNumbers || {};
    global.guessNumbers[event.senderID] = number;
  },

  onReply: async function({ event, message, args }) {
    if (!global.guessNumbers || !global.guessNumbers[event.senderID]) {
      return await message.reply("তুমি এখনো গেম শুরু করো নাই। প্রথমে !guess কমান্ড চালাও।");
    }

    const guess = parseInt(args[0]);
    if (isNaN(guess)) {
      return await message.reply("অনুগ্রহ করে একটি সংখ্যা লিখো।");
    }

    const answer = global.guessNumbers[event.senderID];

    if (guess === answer) {
      await message.reply("🎉 বাহ! তুমি ঠিক অনুমান করেছো!");
      delete global.guessNumbers[event.senderID];
    } else if (guess < answer) {
      await message.reply("উপরের দিকে চিন্তা করো!");
    } else {
      await message.reply("নিচের দিকে চিন্তা করো!");
    }
  },
};
