import type {User} from "@/ts/model/User";
import DataStorage from "@/ts/DataStorage";
import type {Statistic} from "@/ts/model/Statistic";

export default {
    proceedLogin(login: string, password: string): User {
        if ((login === null || login === "") || (password === null || password === "")) {
            return null;
        }
        const user = DataStorage.users
            .find(user =>
                (user.email === login && user.password === password) ||
                (user.login===login && user.password === password)
            );
        if (user) {
            return user;
        }
        return null;
    },
    proceedRegister(user: User): boolean {
        DataStorage.users.push(user);
        return DataStorage.users.contains(user);
    },
    getStatisticInfo(): [string, Statistic][] {
        return Array.from(DataStorage.statisticInfo)
    }
}