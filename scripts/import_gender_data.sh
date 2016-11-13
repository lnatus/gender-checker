#!/bin/bash
mongoimport -d genderdb -c Gender --type csv --file gender_pretty.csv --headerline