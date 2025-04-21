import { generate } from 'critical';


generate({
    base: './',
    src: 'index.html',
    target: {
        // Output file
        css: 'critical.css',
    },
    width: 1300,
    height: 900,
    inline: true,
})
    .then(() => {
        console.log('Critical CSS сгенерирован!');
    })
    .catch(err => {
        console.error('Ошибка:', err);
    });
