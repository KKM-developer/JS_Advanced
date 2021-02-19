console.log('Запрос данных...');


const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Подготовка данных...');
        const backendData = {
            server: 'ans',
            port: 1816,
            status: true
        }
        resolve(backendData);
    }, 2000)
})

prom.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data.modified = true;
            resolve(data)
        }, 2000)
    })
}).then(clientData => {
    console.log('Данные получены ', clientData)
})

