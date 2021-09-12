export class Helpers {

    static getRandomNumber(from: number, to: number) {
        if (to && from && from < to) {
            let random = Math.floor(Math.random() * (to - from + 1)) + 1
            return random;
        }
        return null;
    }

}