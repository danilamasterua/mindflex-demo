import type {Statistic} from "@/ts/model/Statistic";
import type {Preferences} from "@/ts/model/Preferences";
import {PreferencesBuilder} from "@/ts/model/Preferences";

export class User {
    login: string;
    email: string;
    password: string;
    statistic: Statistic;
    isTodayTaskEnded: boolean;
    preferences: Preferences;

    constructor(builder: UserBuilder) {
        this.login = builder.login;
        this.email = builder.email;
        this.password = builder.password;
        this.sex = builder.sex;
        this.age = builder.age;
        this.statistic = builder.statistic
        this.isTodayTaskEnded = builder.isTodayTaskEnded;
        this.preferences = builder.preferences;
    }
}

export class UserBuilder {
    login: string;
    email: string;
    password: string;
    statistic: Statistic;
    isTodayTaskEnded: boolean;
    preferences: Preferences;

    constructor() {
        // Provide default values if needed
        this.login = '';
        this.email = '';
        this.password = '';
        this.isTodayTaskEnded = false;
        this.preferences = new PreferencesBuilder().build();
    }

    setLogin(login: string): UserBuilder{
        this.login = login;
        return this;
    }

    setEmail(email: string): UserBuilder {
        this.email = email;
        return this;
    }

    setPassword(password: string): UserBuilder {
        this.password = password;
        return this;
    }

    setStatistic(statistic: Statistic){
        this.statistic = statistic;
        return this;
    }

    setIsTodayTaskEnded(isTodayTaskEnded: boolean): this {
        this.isTodayTaskEnded = isTodayTaskEnded;
        return this;
    }

    setPreferences(preferences: Preferences): this {
        this.preferences = preferences;
        return this;
    }

    build(): User {
        return new User(this);
    }
}
