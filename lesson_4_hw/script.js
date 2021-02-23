const rndText = `he: 'hello, how are you?'
she: 'hey! i'm fine thx!'`

console.log(rndText);

const regex = /\B'/gm;

console.log(rndText.replace(regex, '"'));

//частично работает... регулярное выражение сломается, если ковычка в конце строки стои сразу после слова (hello'), а не знака как сейчас (hello!'), как исправить не придумал=)