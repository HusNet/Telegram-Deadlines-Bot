const D = require('./data');
const DateFormat = require('moment');

exports.list = function (ctx) {

    let extended = ctx.message.text.split(" ");
    extended = (extended[1] === "-e");

    let dateToCompare = new Date();
    dateToCompare.setDate(dateToCompare.getDate() -1);

    let str = 'Tu pourrais dire /merci avant quand même ;)\r\n\r\n';

    let thx = D.data.getInfos(ctx)['thx'];

    if (thx.indexOf(ctx.from.id) >= 0){
        str = '';
    }


    let deadlines = D.data.getInfos(ctx)['deadlines'];

    let deadlinesToCome = [];
    let deadlinesindexes = [];
    let j = 0;
    for (let i = 0; i<deadlines.length; i++) {
        if(new Date(deadlines[i].date) > dateToCompare) {
            deadlinesindexes[j] = [i];
            deadlinesToCome[j] = deadlines[i];
            j++;
        }
    }

    deadlinesToCome.sort(function (a,b){
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? 1 : a<b ? -1 : 0;
    });

    for (let i = 0; i<deadlinesToCome.length; i++) {
        if (extended)
            str += "👁 " + deadlinesindexes[i] + "\n";
        str += "📆 " + DateFormat(deadlinesToCome[i].date, 'L').format('DD-MM-YYYY') + " \r\n";
        str += "📋 " + deadlinesToCome[i].subject + " \r\n";
        str += "📝 " + deadlinesToCome[i].theme + " \r\n";
        str += "\r\n";
    }

    if (str == ''){
        str = 'Aucune deadline à venir!';
    }

    return ctx.reply(str);
}