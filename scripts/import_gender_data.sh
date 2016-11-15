#!/bin/bash
mongoimport -d gcdb -c Gender --type csv --file ../data/gender/master.csv --headerline