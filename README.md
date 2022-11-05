# ENOP - advanced machine learning aided ENergy OPtimization tool

## 1. Introduction

The majority of Europe is highly dependent on Russia in terms of energy, and as we all know, the situation is currently far from ideal. Especially during this year, the price of electricity has risen because of the high demand for natural gas and uncertainty in the energy markets. Even Finland's transmission system operator (Fingrid Oyj) has announced that Finnish people should be prepared for electric outages during the coming winter [1].

It's self-evident that situations like these require fast, effective, and simple solutions so we don't have to suffer from electric outages and high electricity prices. In addition, solving issues has also a positive effect on reducing CO2 emissions: if we can schedule our consumption to the hours when the price of electricity is cheap, we are most likely using renewable energy sources, like wind power. In addition, smart scheduling like this brings also financial benefits.

This prototype project aims to solve 2 main issues:

1. How can individuals and businesses have more freedom and power in optimizing their energy consumption?
2. How can everyone participate to energy savings effortlessly and intuitively?

## 2. Project description

Since the price of electricity is available only one day ahead, the first question that came to our mind was the following: "How can individuals and businesses have more freedom and power in optimizing their energy consumption?" This lead us to more questions: What is the most effective  way to optimize energy consumption in order to save money? How can we support the grid's supply-demand based stability? Can we optimize our energy consumption behavior to be more environmental friendly? 

In our solution, we decided to implement a machine-learning algorithm that can predict the price of electricity based on simple parameters: temperature, wind speed, date, and time. With this flexibility in hand, individuals, businesses, schools, and factories can schedule their consumption with more freedom. 
 
By knowing the electricity prices one day ahead can help a bit in optimization and bring savings, but what if prices are just between low and high today and tomorrow? How do you know is it worth to heat up the house, water, charge the car and even possibly store energy? What if the prices drop dramatically for the rest of the week? In such case, you would probably want to consume energy moderately during today and tomorrow, but consume more aggresively for the rest of the week. This type of next-level optimization is only possible through having reliable predictions, which our prototype provides. 

This would even help environmentally: it's more environmentally friendly to consume energy during the low electricity prices, since the prices are strongly affected by the amount of renewable energy source production.  

The second point our team tackled was to come up with an idea on how can we get all, individuals and businesses to participate in saving energy. An average person doesn't how much is high consumption? What does it mean to consume 2 kWh or 2000 kWh in a certain time period. It is also highly difficult to estimate when is it cost- and environmentally-wise optimal to consume energy. We address this issue by first of all providing a simple energy optimization score, which is a number between 0-100. The higher the score, the more optimal the energy consumption behavior. The score is based on a new and unique mathematical approach that we developed - it takes into account whether the energy is mainly consumed during pricy high demand hours, which are not environmentally optimal, or if it's consumed during low-price high supply and environmentally friendly hours. In other words, ideally you would want to charge your car, heat up your house/building and water during the low-price hours: this way you save money, energy grid and environment!  

change behavior based on simple guiding score, what you can't measure you can't manage, automatic control system (integrated in the app), automatic scheduling, strenght of transmission grid, everything is automatically fetched into aiven cloud..processed there,..


Measure, track, reduce & repeat. It is as simple as that to reduce CO2 emissions, save money and stop overloading the electric grids.

## 3. How we came up with the solution

## 4. Setup on local machine

## 5. References

[1] https://www.fingrid.fi/ajankohtaista/tiedotteet/2022/tulevan-talven-sahkon-riittavyydessa-useita-epavarmuustekijoita--suomalaisten-on-hyva-varautua-sahkopulan-aiheuttamiin-mahdollisiin-sahkokatkoihin/

Measure, track, reduce & repeat.  ENOP (ENergy OPtimizer)  is an energy consumption optimizer that can display the electricity consumption measurements of an individual or business user, no matter which electricity provider supplies the electricity. In addition, the optimizer tracks how well the energy consumption has been scheduled during the past day, week, month, and year and indicates the outcome using intuitive "energy points". As a cherry on top, ENOP uses a state-of-the-art machine-learning algorithm to predict the price of electricity more than one day ahead so individuals and businesses can schedule their consumption with more flexibility.

What challenges do we precisely solve with our solution?
Electricity prices can be fetched, but only up to one day ahead. This enables users to optimize their energy usage depending on the prices. But how do you know 