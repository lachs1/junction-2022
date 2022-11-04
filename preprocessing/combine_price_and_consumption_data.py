#!/usr/bin/python
# -*- coding: utf-8 -*-

from collections import defaultdict
import json

import pandas as pd

def combine_data():
    consumption = pd.read_csv('data/Consumption_Data_Fingrid_Datahub.csv', sep=';')
    consumption.iloc[:,1] = pd.to_datetime(consumption.iloc[:,1])

    prices = pd.read_csv('data/ElectricityPrices_Finland.csv', header=None)
    prices.iloc[:,1] = pd.to_datetime(prices.iloc[:,1])

    data = defaultdict(dict)

    for row in prices.iterrows():
        price = row[1][0]
        datetime = row[1][1]

        data[datetime]["Price"] = price
        data[datetime]["Hour"] = datetime.hour
        data[datetime]["Day"] = datetime.day
        data[datetime]["Month"] = datetime.month
        data[datetime]["Year"] = datetime.year
        data[datetime]["Datetime"] = str(datetime)
        data[datetime]["Consumption"] = 0.0

    for row in consumption.iterrows():
        datetime = row[1][1]
        value = row[1][2]
        if datetime in data:
            data[datetime]["Consumption"] = float(value.replace(",", "."))

    with open('data/Prices_and_Consumption.json', 'w') as fp:
        json.dump(list(data.values()), fp, indent=4)

if __name__ == '__main__':
    combine_data()