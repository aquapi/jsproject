var smartPhones = [
    { name: 'iphone', price: 649 },
    { name: 'Galaxy S6', price: 576 },
    { name: 'Galaxy Note', price: 489 }
]

const prices = () => {
    let iprice = [];
    for (let i of smartPhones) iprice.push(i.price);
    return iprice;
}

console.log(prices());