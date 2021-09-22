
const movieTypes:any = require("./data/movie-type.json");

import {calculateAmount, calculateRenterPoints} from "./Movie";

export const statement = (customer: any, movies: any, html:boolean): string => {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = html ? `<h1>Rental Record for <em>${customer.name}</em></h1>\n`
      : `Rental Record for ${customer.name}\n`;

  if(customer.rentals.length > 0){
    result += html ? "<ul>\n" : "";

    for (let r of customer.rentals) {
      let movie = movies[r.movieID];
      let movieType = movieTypes[movie.code];
      let thisAmount = 0;

      if(movieType !== undefined) {
        thisAmount = calculateAmount(movieType.cost, r.days);
        frequentRenterPoints += calculateRenterPoints(movieType.points, r.days);
      }
      else
        continue;

      result += html ? `\t<li>${movie.title} \- ${thisAmount}</li>\n`
          : `\t${movie.title}\t${thisAmount}\n`;
      totalAmount += thisAmount;
    }

    result += html ? "</ul>\n" : "";
  }
  result += html ? `<p>Amount owed is <em>${totalAmount}</em></p>\n`
      : `Amount owed is ${totalAmount}\n`;
  result += html ? `<p>You earned <em>${frequentRenterPoints}</em> frequent renter points</p>\n`
      : `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
};

