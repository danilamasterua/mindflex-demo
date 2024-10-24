import {type User, UserBuilder} from "@/ts/model/User";
import {Statistic, StatisticBuilder} from "@/ts/model/Statistic";
import {AchievementBuilder} from "@/ts/model/Achievement";
import {Hobie, PreferencesBuilder, PsychoState, Sex, WorkPlace} from "@/ts/model/Preferences";

export default {
    users: [
        new UserBuilder()
            .setLogin("john.Doe")
            .setEmail("Doe@example.com")
            .setPassword("DefaultPassword")
            .setStatistic(
                new StatisticBuilder()
                    .setWeeklyProgress(10)
                    .setMonthlyProgress(30)
                    .setAvgTimeWeekly(1.5)
                    .setAvgTimeMonthly(2.0)
                    .setAchievements(
                        [
                            new AchievementBuilder().setName("Майстер завдань").setDescription("Виконано 10 завдань цього тижня").build(),
                            new AchievementBuilder().setName("Найшвидший стрілець на Заході").setDescription("Пройти завдання менше ніж за 5 хвилин").build(),
                            new AchievementBuilder().setName("Я ніколи не сплю").setDescription("Виконувати завдання без пропусків продовж 7 днів").build()
                        ]
                    )
                    .build()
            )
            .setPreferences(
                new PreferencesBuilder()
                    .setBirthday(1974)
                    .setSex(Sex.MALE)
                    .setHobie(Hobie.MONEY)
                    .setWorkPlace(WorkPlace.IT)
                    .setPsychoState(PsychoState.NORMAL)
                    .build()
            )
            .build()
    ] as User[],
    statisticInfo: new Map([
        ['michael_jackson', new StatisticBuilder()
            .setWeeklyProgress(10)
            .setMonthlyProgress(30)
            .setAvgTimeWeekly(1.5)
            .setAvgTimeMonthly(2.0)
            .setAchievements([
                new AchievementBuilder().setName('Майстер завдань').setDescription('Виконано 10 завдань цього тижня').build(),
                new AchievementBuilder().setName('Найшвидший стрілець на Заході').setDescription('Пройти завдання менше ніж за 5 хвилин').build()
            ])
            .build()],

        ['jane_smith', new StatisticBuilder()
            .setWeeklyProgress(8)
            .setMonthlyProgress(25)
            .setAvgTimeWeekly(1.2)
            .setAvgTimeMonthly(1.8)
            .setAchievements([
                new AchievementBuilder().setName('Досягнення').setDescription('Виконано 8 завдань цього тижня').build()
            ])
            .build()],

        ['michael_brown', new StatisticBuilder()
            .setWeeklyProgress(12)
            .setMonthlyProgress(40)
            .setAvgTimeWeekly(2.1)
            .setAvgTimeMonthly(2.5)
            .setAchievements([
                new AchievementBuilder().setName('Кращий виконавець').setDescription('Виконано 12 завдань цього тижня').build(),
                new AchievementBuilder().setName('Я ніколи не сплю').setDescription('Виконувати завдання без пропусків протягом 7 днів').build()
            ])
            .build()],

        ['emily_davis', new StatisticBuilder()
            .setWeeklyProgress(6)
            .setMonthlyProgress(15)
            .setAvgTimeWeekly(1.1)
            .setAvgTimeMonthly(1.4)
            .setAchievements([
                new AchievementBuilder().setName('Зірка, що сходить').setDescription('Виконано 6 завдань цього тижня').build()
            ])
            .build()],

        ['daniel_johnson', new StatisticBuilder()
            .setWeeklyProgress(9)
            .setMonthlyProgress(28)
            .setAvgTimeWeekly(1.4)
            .setAvgTimeMonthly(1.9)
            .setAchievements([
                new AchievementBuilder().setName('Високі досягнення').setDescription('Виконано 9 завдань цього тижня').build()
            ])
            .build()],

        ['olivia_wilson', new StatisticBuilder()
            .setWeeklyProgress(15)
            .setMonthlyProgress(45)
            .setAvgTimeWeekly(2.8)
            .setAvgTimeMonthly(3.1)
            .setAchievements([
                new AchievementBuilder().setName('Швидкість').setDescription('Виконано 15 завдань цього тижня').build(),
                new AchievementBuilder().setName('Найшвидший стрілець на Заході').setDescription('Пройти завдання менше ніж за 5 хвилин').build()
            ])
            .build()],

        ['lucas_taylor', new StatisticBuilder()
            .setWeeklyProgress(5)
            .setMonthlyProgress(20)
            .setAvgTimeWeekly(1.0)
            .setAvgTimeMonthly(1.6)
            .setAchievements([
                new AchievementBuilder().setName('Стабільний виконавець').setDescription('Виконано 5 завдань цього тижня').build()
            ])
            .build()],

        ['ava_white', new StatisticBuilder()
            .setWeeklyProgress(7)
            .setMonthlyProgress(22)
            .setAvgTimeWeekly(1.3)
            .setAvgTimeMonthly(1.7)
            .setAchievements([
                new AchievementBuilder().setName('Послідовний').setDescription('Виконано 7 завдань цього тижня').build()
            ])
            .build()],

        ['jack_martin', new StatisticBuilder()
            .setWeeklyProgress(13)
            .setMonthlyProgress(37)
            .setAvgTimeWeekly(2.2)
            .setAvgTimeMonthly(2.6)
            .setAchievements([
                new AchievementBuilder().setName('Продуктивність').setDescription('Виконано 13 завдань цього тижня').build()
            ])
            .build()],

        ['mia_clark', new StatisticBuilder()
            .setWeeklyProgress(11)
            .setMonthlyProgress(32)
            .setAvgTimeWeekly(1.7)
            .setAvgTimeMonthly(2.3)
            .setAchievements([
                new AchievementBuilder().setName('Наполегливість').setDescription('Виконано 11 завдань цього тижня').build(),
                new AchievementBuilder().setName('Я ніколи не сплю').setDescription('Виконувати завдання без пропусків протягом 7 днів').build()
            ])
            .build()],

        ['ethan_lee', new StatisticBuilder()
            .setWeeklyProgress(4)
            .setMonthlyProgress(12)
            .setAvgTimeWeekly(0.8)
            .setAvgTimeMonthly(1.2)
            .setAchievements([
                new AchievementBuilder().setName('Початківець').setDescription('Виконано 4 завдання цього тижня').build()
            ])
            .build()],

        ['sophia_walker', new StatisticBuilder()
            .setWeeklyProgress(14)
            .setMonthlyProgress(38)
            .setAvgTimeWeekly(2.5)
            .setAvgTimeMonthly(2.9)
            .setAchievements([
                new AchievementBuilder().setName('Трудолюб').setDescription('Виконано 14 завдань цього тижня').build()
            ])
            .build()],

        ['benjamin_hall', new StatisticBuilder()
            .setWeeklyProgress(8)
            .setMonthlyProgress(21)
            .setAvgTimeWeekly(1.1)
            .setAvgTimeMonthly(1.6)
            .setAchievements([
                new AchievementBuilder().setName('Надійний виконавець').setDescription('Виконано 8 завдань цього тижня').build()
            ])
            .build()],

        ['amelia_king', new StatisticBuilder()
            .setWeeklyProgress(10)
            .setMonthlyProgress(33)
            .setAvgTimeWeekly(1.6)
            .setAvgTimeMonthly(2.0)
            .setAchievements([
                new AchievementBuilder().setName('Відданість').setDescription('Виконано 10 завдань цього тижня').build()
            ])
            .build()],
    ]) as Map<string, Statistic>
}