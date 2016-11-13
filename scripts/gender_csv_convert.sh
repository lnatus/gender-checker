#!/bin/bash
INPUT=genderdb.csv
OLDIFS=$IFS
IFS=,
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
rm output.csv

while read firstname male female gender
do
	if [[ $gender -lt 0 ]]; then
		echo $firstname,w >> output.csv
	else
		echo $firstname,m >> output.csv
	fi
	echo $firstname
done < $INPUT
IFS=$OLDIFS