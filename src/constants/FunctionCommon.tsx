export function number2money(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const thumbnails = {
    'avatar0': require('../../assets/avatar/avatar0.png'),
    'avatar1': require('../../assets/avatar/avatar1.png'),
    'avatar2': require('../../assets/avatar/avatar2.png'),
    'avatar3': require('../../assets/avatar/avatar3.png'),
    'avatar4': require('../../assets/avatar/avatar4.png'),
    'avatar5': require('../../assets/avatar/avatar5.png'),
}