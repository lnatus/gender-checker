#!/bin/bash
mongoimport -d gcdb -c Gender --type csv --file master.csv --headerline