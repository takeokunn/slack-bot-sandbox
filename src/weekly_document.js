const { postMessage } = require('./utils');

const handleWeeklyDocument = channel_id => {
    postMessage(channel_id, `\`\`\`
＜旧BPU＞
https://docs.google.com/presentation/d/1cOHWjmJUpcVWdMQ59RGDM6U7vqFYh4FH8qLK91bc9Fc/edit
＜旧LE＞
https://docs.google.com/presentation/d/1u-OOfLnQJAg6_pYTBtBxntme_CT7xl5pAhk4qessRGk/edit#slide=id.g36817b5f9d_0_0
＜アライアンス＞
https://docs.google.com/presentation/d/1RCUDL_drttfG-oVuDbZO6hXAhE92-nyE87TOrVvHMr8/edit#slide=id.p
＜旧メディア＞
https://docs.google.com/presentation/d/16VHWikbaW3Fyd4IM-A7M98klQ9r6JjgI9cpKDZwxOhM/edit#slide=id.gbafe4e202a_1_390
＜旧社長室＞
https://docs.google.com/presentation/d/1EgaahgETIpJ7WZgIpjScSVHHfjqmaqcYscfx7nlVQ4E/edit#slide=id.p
\`\`\``);
};

module.exports = handleWeeklyDocument;
