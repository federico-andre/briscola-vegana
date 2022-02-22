export class Utils {

    static getPointsColor(points: number) {
        if(points == 0) return "secondary";
        if(points < 0) return "danger";
    
        return "success";
    }
}