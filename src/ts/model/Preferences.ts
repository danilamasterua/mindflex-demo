export enum Sex{
    MALE, FEMALE, UNDEFINED,
}
export enum Hobie{
    UNDEFINED, CARDS, MONEY,
}
export enum WorkPlace{
    UNDEFINED, IT, PUBLIC_HEALTH,
}
export enum PsychoState{
    POSITIVE, NORMAL, DEPRESSIVE,
}

export class Preferences {
    birthday: number;
    sex: Sex;
    hobie: Hobie;
    workPlace: WorkPlace;
    psychoState: PsychoState;

    constructor(builder: PreferencesBuilder) {
        this.birthday = builder.birthday;
        this.sex = builder.sex;
        this.hobie = builder.hobie;
        this.workPlace = builder.workPlace;
        this.psychoState = builder.psychoState;
    }
}
export class PreferencesBuilder {
    public birthday: number = 1970;
    public sex: Sex = Sex.UNDEFINED;
    public hobie: Hobie = Hobie.UNDEFINED;
    public workPlace: WorkPlace = WorkPlace.UNDEFINED;
    public psychoState: PsychoState = PsychoState.NORMAL;

    public setBirthday(birthday: number): PreferencesBuilder {
        this.birthday = birthday;
        return this;
    }

    public setSex(sex: Sex): PreferencesBuilder {
        this.sex = sex;
        return this;
    }

    public setHobie(hobie: Hobie): PreferencesBuilder {
        this.hobie = hobie;
        return this;
    }

    public setWorkPlace(workPlace: WorkPlace): PreferencesBuilder {
        this.workPlace = workPlace;
        return this;
    }

    public setPsychoState(psychoState: PsychoState): PreferencesBuilder {
        this.psychoState = psychoState;
        return this;
    }

    public build(): Preferences {
        return new Preferences(this);
    }
}