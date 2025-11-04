import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table, AutoIncrement } from "sequelize-typescript";
import Team from "./Team";

@Table({
    underscored: true,
    tableName: 'meetings'
})
export default class Meeting extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number

    @ForeignKey(() => Team)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    teamId: number

    @AllowNull(false)
    @Column(DataType.DATE)
    startTime: Date

    @AllowNull(false)
    @Column(DataType.DATE)
    endTime: Date

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string

    @AllowNull(false)
    @Column(DataType.STRING)
    room: string

    @BelongsTo(() => Team)
    team: Team

}

