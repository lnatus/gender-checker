#!/bin/bash
INPUT=basic-12-uuid.txt
OLDIFS=$IFS
IFS=,
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }

while read key
do
	echo $key,basic,12 >> basic-12-uuid.csv	
done < $INPUT
IFS=$OLDIFS