export enum MovieId {
  F001 = "F001",
  F002 = "F002",
}

export enum MovieCode {
  CHILDRENS = "childrens",
  REGULAR = "regular",
  NEW = "new",
}

interface MovieDetails {
  title: string;
  code: MovieCode;
}

export type MovieCollection = {
  [MovieID in MovieId]: MovieDetails;
};


export function calculateAmount(cost:any, days:number):number {
  let {flatRate, dailyRate, minDays} = cost;
  if(minDays > 0)
    return days > minDays
        ? flatRate + (days - minDays) * dailyRate
        : flatRate;
  else
    return days * dailyRate;
}

export function calculateRenterPoints(points:any, days:number):number{
  let {base, bonus, minDays} = points;
  if(minDays > 0)
    return days > minDays
        ? base + bonus
        : base;
  else
    return base;
}