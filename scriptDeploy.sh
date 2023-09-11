#Login a Cloud Foundry
cf api https://api.cf.us10-001.hana.ondemand.com
cf login

#Cosas necesarias de NPM
npm update --package-lock-only

#Crea archivo necesario para Deploy
mbt build -t gen --mtar mta.tar

#Deploy
cf deploy gen/mta.tar