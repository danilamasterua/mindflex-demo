export class Achievement {
    name: string;
    description: string;

    private constructor(builder: AchievementBuilder) {
        this.name = builder.name;
        this.description = builder.description;
    }
}

export class AchievementBuilder {
    public name: string = "";
    public description: string = "";

    public setName(name: string): this {
        this.name = name;
        return this;
    }

    public setDescription(description: string): this {
        this.description = description;
        return this;
    }

    public build(): Achievement {
        return new Achievement(this);
    }
}
