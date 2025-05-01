// Run: npm run critical
import { generate } from 'critical';


generate({
    base: './',
    src: 'dist/index.html',
    target: {
        // Output file
        css: 'static/css/critical.min.css',
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
