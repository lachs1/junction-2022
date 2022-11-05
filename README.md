# ENOP - advanced machine learning aided ENergy OPtimization tool ⚡️🌿

Live preview available here 🔥: https://whale-app-c4q9y.ondigitalocean.app/

## 1. Introduction

![Preview](preview.png)

The majority of Europe is highly dependent on Russia in terms of energy, and as we all know, the situation is currently far from ideal. Especially during this year, the price of electricity has risen because of the high demand for natural gas and uncertainty in the energy markets. Even Finland's transmission system operator (Fingrid Oyj) has announced that Finnish people should be prepared for electric outages during the coming winter [1].

It's self-evident that situations like these require fast, effective, and simple solutions so we don't have to suffer from electric outages and high electricity prices. In addition, solving issues has also a positive effect on reducing CO2 emissions: if we can schedule our consumption to the hours when the price of electricity is cheap, we are most likely using renewable energy sources, like wind power. In addition, smart scheduling like this brings also financial benefits.

This prototype project aims to solve **two** main problems related to the energy crisis:

1. *How can individuals and businesses have more freedom and power in optimizing their energy consumption?*
2. *How can everyone participate to energy savings effortlessly and intuitively?*

In this guide we provide solutions to the aforementioned questions, discuss about our approach to the problems, and finally, give instructions on how to play with the prototype.

## 2. Project description

Since the price of electricity is available only one day ahead, the first question that came to our mind was the following: How can individuals and businesses have more freedom and power in optimizing their energy consumption? This lead us to more questions: What is the most effective way to optimize energy consumption in order to save money? How can we support the grid's supply-demand based stability? Can we optimize our energy consumption behavior to be more environmental friendly?

In our solution, we decided to implement a machine-learning algorithm that can predict the price of electricity based on simple parameters: temperature, wind speed, date, and time. With this flexibility in hand, individuals, businesses, schools, and factories can schedule their consumption with more freedom.

By knowing the electricity prices one day ahead can help a bit in optimization and bring savings, but what if prices are just between low and high today and tomorrow? How do you know is it worth to heat up the house, crank up you water boilers, charge your electric vehicle (EV) and even possibly store energy? What if the prices drop dramatically for the rest of the week? In such case, you would probably want to consume energy moderately during today and tomorrow, but consume more aggresively for the rest of the week. This type of next-level optimization is only possible through having reliable predictions, which our prototype provides.

This would even help environmentally: it's more environmentally friendly to consume energy during the low electricity prices, since the prices are strongly affected by the amount of renewable energy source production.

The second point our team tackled was to come up with an idea on how can we get all, individuals and businesses to participate in saving energy. An average person doesn't how much is high consumption? What does it mean to consume 2 kWh or 2000 kWh in a certain time period. It is also difficult to estimate when is it cost- and environmentally-wise time to consume energy. We address this issue by first of all providing a simple **Energy Optimization Score (EOS)**, which is a number between 0-100. The higher the score, the more optimal the energy consumption behavior.

The score is based on a mathematical approach that we developed - it takes into account whether the energy is mainly consumed during pricy high demand hours, which are not environmentally optimal, or if it's consumed during low-price high supply and environmentally friendly hours. In other words, ideally you would want to charge your EV, heat up your house/building and water during the low-price hours: this way you save money, energy, grid and the environment!

Measure, track, reduce & repeat. It is as simple as that.

## 3. Solution

This section is divded in two parts. In the first subsection the machine-learning based technique is described. The second subsection describes the intuitive score Energy Optimization Score that we invented to help everyone participate in energy savings.

### 3.1. Machine-learning electricity price prediction

In order to predict the electricity prices in range more than one day ahead something about the system must be understood. We know that the penetration of renewbale energy sources, i.e., increasing amount of wind power is affecting the prices. Thus, we decided to use wind speed measurements at the west shore at Finland. The following data sources were used in this part:

1. ENTSO-e Transparency Platform for electricity prices in Finland [2]
2. Statistics Finland for weather observations [3]

As a cherry on top, ENOP uses a state-of-the-art machine-learning algorithm to predict the price of electricity more than one day ahead so individuals and businesses can schedule their consumption with more flexibility.

### 3.2. Energy Optimization Score (EOS)

1. Fingrid Datahub for fetching electricity consumption data [4]

Initially when we were looking at the data

- Machine learning XGBoost,
- Load scheduling
- React app
- Fingrid datahub

## 4. Live preview & setup on local machine

Feel free to check out the live preview here: https://whale-app-c4q9y.ondigitalocean.app/

If you want to play with the prototype on your local machine please follow the steps below:

1. clone/download the repository onto your device
2. cd into the project directory `junction-2022/enop-app`
3. install the needed dependencies with the command `npm install`
4. start the development server with the command npm start

## 5. References

[1] https://www.fingrid.fi/ajankohtaista/tiedotteet/2022/tulevan-talven-sahkon-riittavyydessa-useita-epavarmuustekijoita--suomalaisten-on-hyva-varautua-sahkopulan-aiheuttamiin-mahdollisiin-sahkokatkoihin/

[2] https://transparency.entsoe.eu/

[3] https://www.stat.fi/index_en.html

[4] https://www.fingrid.fi/en/electricity-market/datahub/

change behavior based on simple guiding score, what you can't measure you can't manage, automatic control system (integrated in the app), automatic scheduling, strenght of transmission grid, everything is automatically fetched into aiven cloud..processed there,..