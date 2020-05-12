import {Chart} from "chart.js"

export interface IPerson {
  readonly _id: number,
  age: number,
  eyeColor: string,
  name: string,
  gender: string,
  location: { latitude: number, longitude: number },
  preferences: { pet: string, fruit: string }
}

export interface IFilter {
  men: boolean,
  women: boolean
}

export interface IGenderRepartition {
  men: number,
  women: number
}

export interface IDataChart {
  labels: Array<string>,
  datasets: Array<{
    data: Array<number>,
    backgroundColor: Array<string>,
    label?: string
  }>
}

declare global {
  interface Window {
    petRepartitionChart: Chart
  }
}