#!/bin/bash
INPUT=test-uuid.txt
OLDIFS=$IFS
IFS=,
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }

while read key
do
	echo $key,test,0,false >> test-uuid.csv	
done < $INPUT
IFS=$OLDIFS
