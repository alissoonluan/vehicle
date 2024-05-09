import { randomUUID } from 'node:crypto';
import { Replace } from '@helpers/Replace';
import { User } from './user';

export interface VehicleProps {
  user?: User;
  plate: string;
  renavam: string;
  model: string;
  brand: string;
  year: number;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  userId: string;
}

export class Vehicle {
  private _id: string;
  private props: VehicleProps;

  constructor(props: Replace<VehicleProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set plate(place: string) {
    this.props.plate = place;
  }

  public get plate(): string {
    return this.props.plate;
  }

  public set renavam(renavam: string) {
    this.props.renavam = renavam;
  }

  public get renavam(): string {
    return this.props.renavam;
  }

  public set model(model: string) {
    this.props.model = model;
  }

  public get model(): string {
    return this.props.model;
  }

  public set brand(brand: string) {
    this.props.brand = brand;
  }

  public get brand(): string {
    return this.props.brand;
  }

  public set year(year: number) {
    this.props.year = year;
  }

  public get year(): number {
    return this.props.year;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  public get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  public set user(user: User) {
    this.props.user = user;
  }

  public get user(): User {
    return this.props.user;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public update(props: Partial<VehicleProps>): void {
    this.props = {
      ...this.props,
      ...props,
      updatedAt: new Date(),
    };
  }

  public delete() {
    this.props.deletedAt = new Date();
  }
}
