#!/usr/bin/python
# -*- coding: utf-8 -*-

"""
Reference: https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html
"""

from datetime import datetime, timedelta, timezone

import requests
import xmltodict


def get_prices():
    now = datetime.utcnow()

    response = requests.get(
        url="https://web-api.tp.entsoe.eu/api",
        params={
            "securityToken": '',
            "documentType": "A44",
            "in_Domain": "10YFI-1--------U",
            "out_Domain": "10YFI-1--------U",
            "periodStart": (now - timedelta(days=370)).strftime("%Y%m%d%H00"),
            "periodEnd": now.strftime("%Y%m%d%H00"),
        },
        timeout=20,
    )

    # convert to dict
    xml_dict = xmltodict.parse(response.text)

    # Get the time series
    time_series = xml_dict["Publication_MarketDocument"]["TimeSeries"]

    data_list = list()

    for series in time_series:
        start_time = datetime.strptime(series["Period"]["timeInterval"]["start"], "%Y-%m-%dT%H:%MZ").replace(
            tzinfo=timezone.utc)

        points = series["Period"]["Point"]
        for hour_delta, point in enumerate(points):
            # Convert to c/kWh
            value = float(point["price.amount"]) / 10
            price_start_time = start_time + timedelta(hours=hour_delta)
            data_list.append([value, price_start_time])

    with open('data/ElectricityPrices_Finland.csv', mode='w') as file:
        for row in data_list:
            file.write(','.join((str(value) for value in row)))
            file.write('\n')


if __name__ == '__main__':
    get_prices()
