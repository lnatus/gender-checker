#!/bin/bash
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/test-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/basic-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/premium-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/ultimate-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/one-test-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/one-trial-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/one-basic-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/one-premium-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/one-ultimate-uuid.csv --headerline
