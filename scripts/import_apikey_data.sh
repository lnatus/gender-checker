#!/bin/bash
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/trial-1-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/test-12-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/premium-6-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/premium-3-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/premium-12-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/basic-6-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/basic-3-uuid.csv --headerline
mongoimport -d gcdb -c Account --type csv --file ../data/apiKeys/basic-12-uuid.csv --headerline