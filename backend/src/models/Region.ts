import { AllowNull, Column, DataType, HasMany, Model, PrimaryKey, Table, AutoIncrement } from "sequelize-typescript";
import HikingSite from "./HikingSite";

@Table({
    underscored: true,
    tableName: 'regions'
})
export default class Region extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string

    @HasMany(() => HikingSite, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    hikingSites: HikingSite[]


}