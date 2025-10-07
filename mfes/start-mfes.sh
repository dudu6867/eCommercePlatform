#!/bin/bash

# Array of microfrontend directories
microfrontends=("eCommerce" "cart" "login" "navbar" "orders" "productCatalogue" "products")

# Loop through each microfrontend and start it
for mf in "${microfrontends[@]}"; do
  echo "Starting $mf..."

  cd "$mf"

  if [ "$mf" == "eCommerce" ]; then
    npm start &
  else
    npm run start:standalone &
  fi

  cd ..
done

# Wait for all background processes to finish
wait

echo "✅ All microfrontends have been started."