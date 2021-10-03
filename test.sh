echo -e "\nRunning docker container:\n"
echo `docker run a1-302-container`
echo -e "\nRunning test:"
echo `docker run a1-302-container npm run test` 
echo -e "\nRunning code coverage for test:"
echo `docker run a1-302-container npm run coverage`