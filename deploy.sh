GOOGLE_PROJECT_ID=endless-bolt-388502
CLOUD_RUN_SERVICE=formulari-frontend


gcloud auth configure-docker \
    southamerica-east1-docker.pkg.dev

docker build -t gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE:v1 .

# Enviar la imagen al registro de Artifact Registry
docker push gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE:v1


gcloud run deploy $CLOUD_RUN_SERVICE \
   --image gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE:v1 \
   --platform managed \
   --region southamerica-east1 \
   --allow-unauthenticated 

gcloud run services update-traffic $CLOUD_RUN_SERVICE \
  --region southamerica-east1 \
  --to-latest

docker image rm gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE:v1


SERVICE_URL=$(gcloud run services describe $CLOUD_RUN_SERVICE --region southamerica-east1 --format 'value(status.url)')

echo "El servicio se ha desplegado correctamente en la siguiente URL:"
echo $SERVICE_URL