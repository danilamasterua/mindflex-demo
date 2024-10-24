import {type Achievement} from "@/ts/model/Achievement";

export class Statistic {
    weeklyProgress: number
    monthlyProgress: number
    avgTimeWeekly: number
    avgTimeMonthly: number
    achievements: Achievement[]

    constructor(builder: StatisticBuilder) {
        this.weeklyProgress = builder.weeklyProgress;
        this.monthlyProgress = builder.monthlyProgress;
        this.avgTimeWeekly = builder.avgTimeWeekly;
        this.avgTimeMonthly = builder.avgTimeMonthly;
        this.achievements = builder.achievements;
    }
}

export class StatisticBuilder{
    public weeklyProgress: number = 0;
    public monthlyProgress: number = 0;
    public avgTimeWeekly: number = 0;
    public avgTimeMonthly: number = 0;
    public achievements: Achievement[] = [];

    public setWeeklyProgress(weeklyProgress: number): this {
        this.weeklyProgress = weeklyProgress;
        return this;
    }

    public setMonthlyProgress(monthlyProgress: number): this {
        this.monthlyProgress = monthlyProgress;
        return this;
    }

    public setAvgTimeWeekly(avgTimeWeekly: number): this {
        this.avgTimeWeekly = avgTimeWeekly;
        return this;
    }

    public setAvgTimeMonthly(avgTimeMonthly: number): this {
        this.avgTimeMonthly = avgTimeMonthly;
        return this;
    }

    public setAchievements(achievements: Achievement[]): this {
        this.achievements = achievements;
        return this;
    }

    public build(): Statistic {
        return new Statistic(this);
    }
}