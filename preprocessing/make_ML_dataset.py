#!/usr/bin/python
# -*- coding: utf-8 -*-
from collections import defaultdict

import pandas as pd


def make_dataset():
    prices = pd.read_csv('data/ElectricityPrices_Finland.csv', header=None)
    wind_speed = pd.read_csv('data/WindSpeed_Raahe_Lapaluoto.csv')
    temperature = pd.read_csv('data/Temperature_Helsinki_Kaisaniemi.csv')

    prices.iloc[:,1] = pd.to_datetime(prices.iloc[:,1])

    data = defaultdict(dict)

    for row in prices.iterrows():
        price = row[1][0]
        datetime = row[1][1]
        key = f"{datetime.year}-{datetime.month}-{datetime.day} {datetime.hour}"
        data[key]["Price"] = price
        data[key]["Hour"] = datetime.hour
        data[key]["Day"] = datetime.day
        data[key]["Month"] = datetime.month
        data[key]["Year"] = datetime.year
        data[key]["Datetime"] = str(datetime)


    for row in wind_speed.iterrows():
        year = row[1][0]
        month = row[1][1]
        day = row[1][2]
        hour = int(row[1][3].split(":")[0])
        try:
            value = float(row[1][5])
        except ValueError:
            continue
        key = f"{year}-{month}-{day} {hour}"

        if key in data:
            data[key]["WindSpeed"] = value

    for row in temperature.iterrows():
        year = row[1][0]
        month = row[1][1]
        day = row[1][2]
        hour = int(row[1][3].split(":")[0])
        try:
            value = float(row[1][5])
        except ValueError:
            continue

        key = f"{year}-{month}-{day} {hour}"

        if key in data:
            data[key]["Temperature"] = value

    with open("data/ML_dataset.csv", mode="w") as file:
        file.write("Datetime;Price;Year;Month;Day;Hour;WindSpeed;Temperature\n")
        for _, values in data.items():
            if "WindSpeed" in values and "Temperature" in values:
                # data is OK
                row = [
                    values['Datetime'],
                    values['Price'],
                    values['Year'],
                    values['Month'],
                    values['Day'],
                    values['Hour'],
                    values['WindSpeed'],
                    values['Temperature']
                ]
                file.write(';'.join(str(d) for d in row))
                file.write("\n")


if __name__ == '__main__':
    make_dataset()
    df = pd.read_csv('data/ML_dataset.csv', sep=';')
    print(df)