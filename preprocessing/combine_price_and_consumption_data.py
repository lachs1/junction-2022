#!/usr/bin/python
# -*- coding: utf-8 -*-

from collections import defaultdict
from datetime import datetime, timedelta, timezone
import json

import pandas as pd


def combine_data():
    consumption = pd.read_csv(
        'data/Consumption_Data_Fingrid_Datahub.csv', sep=';')
    consumption.iloc[:, 1] = pd.to_datetime(consumption.iloc[:, 1])

    prices = pd.read_csv('data/ElectricityPrices_Finland.csv', header=None)
    prices.iloc[:, 1] = pd.to_datetime(prices.iloc[:, 1])

    pricePredictions = pd.read_csv(
        'data/ML_predictions_Validation.csv', header=None)
    pricePredictions.iloc[:, 0] = pd.to_datetime(pricePredictions.iloc[:, 0])

    data = defaultdict(dict)

    last_consumption_dt = datetime(2022, 10, 31, tzinfo=timezone.utc)
    last_price_dt = last_consumption_dt + timedelta(days=1)

    for row in prices.iterrows():
        price = row[1][0]
        dt = row[1][1]

        if dt > last_price_dt:
            data[dt]["Price"] = None
        else:
            data[dt]["Price"] = price
        data[dt]["Hour"] = dt.hour
        data[dt]["Day"] = dt.day
        data[dt]["Month"] = dt.month
        data[dt]["Year"] = dt.year
        data[dt]["Datetime"] = dt.isoformat()
        data[dt]["Consumption"] = None
        data[dt]["PricePrediction"] = None

    for row in pricePredictions.iterrows():
        price = row[1][1]
        dt = row[1][0]
        if dt in data:
            data[dt]["PricePrediction"] = price

    for row in consumption.iterrows():
        dt = row[1][1]
        value = row[1][2]
        if dt in data and dt <= last_consumption_dt:
            data[dt]["Consumption"] = float(value.replace(",", "."))

    with open('data/Prices_and_Consumption.json', 'w') as fp:
        json.dump(list(data.values()), fp, indent=4)


if __name__ == '__main__':
    combine_data()
