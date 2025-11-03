import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table, AutoIncrement } from "sequelize-typescript";
import Region from "./Region";

@Table({
    underscored: true,
    tableName: 'hiking_sites'
})
export default class HikingSite extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number

    @ForeignKey(() => Region)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    regionId: number

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string

    @AllowNull(false)
    @Column(DataType.DECIMAL(10, 2))
    adultPrice: number

    @AllowNull(false)
    @Column(DataType.DECIMAL(10, 2))
    childPrice: number

    @BelongsTo(() => Region)
    region: Region

}