#!/bin/bash

curl "https://www.ifixit.com/api/2.0/$1" | jq . | clip.exe
