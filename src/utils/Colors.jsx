const colors = [
    '#F44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
    '#3f51b5',
    '#2196F3',
    '#00bcd4',
    '#009688',
    '#2196F3',
    '#32c787',
    '#00BCD4',
    '#ff5652',
    '#ffc107',
    '#ff85af',
    '#FF9800',
    '#39bbb0',
    '#4CAF50',
    '#ffeb3b',
    '#ffc107',
];

export default function getColor(input) {
    let hash = 0,
        len = input.length;
    for (let i = 0; i < len; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i);
        hash |= 0; // to 32bit integer
    }
    return colors[Math.abs(hash % 23)];
}
