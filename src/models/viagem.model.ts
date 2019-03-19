import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Viagem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( "bigint" )
    dataAgendada: number;

    @Column()
    linhaId: number;

    @Column()
    itinerarioId: number;

    @Column( "bigint" )
    dataChegadaEstimada: number;

    @Column()
    veiculo: string;

    @Column( { nullable: true } )
    acessibilidade: boolean;
}
