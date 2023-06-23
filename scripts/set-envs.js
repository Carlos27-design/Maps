const {writeFileSync, mkdirSync} = require("fs")

require("dotenv").config();



const targetPath= "./src/environments/environments.ts";

const path = "./src/environments"

const envFileContent = `
export const environment = {

  mapbox_key: "${process.env["MAPBOX_KEY"]}"

};

`;


mkdirSync(path, {recursive: true});

writeFileSync(targetPath, envFileContent
  )
