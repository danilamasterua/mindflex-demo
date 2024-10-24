import Cards from "@/ts/model/Game_Pairs/Cards";
import DataSource from "@/ts/DataSource";
import type {User} from "@/ts/model/User";
import {Hobie} from "@/ts/model/Preferences";
import Moneys from "@/ts/model/Game_Pairs/Moneys";

export default {
    genRandomPairs(): [[string, string], [string, string]][] {
        let currentUser: User = JSON.parse(localStorage.getItem("user"));
        let pairs: [string, string][];
        switch (currentUser.preferences.hobie){
            case Hobie.CARDS:
                pairs = Array.from(Cards.entries())
                break;
            case Hobie.MONEY:
                pairs = Array.from(Moneys.entries())
                break;
            default:
                const random = Math.floor(Math.random() * 2)
                switch (random) {
                    case 0:
                        pairs = Array.from(Cards.entries())
                        break
                    case 1:
                        pairs = Array.from(Moneys.entries())
                        break
                    default:
                        pairs = Array.from(Cards.entries())
                        break
                }
        }
        let result:[[string, string], [string, string]] = []
        while (result.length < 5){
            let resPairs: [string, string][] = []
            for(let i = 0; i < 2; i++) {
                let randomIndex = Math.floor(Math.random() * pairs.length)
                resPairs.push(pairs[randomIndex])
                pairs.splice(randomIndex, 1)
            }
            result.push(resPairs)
        }
        return result
    }
}