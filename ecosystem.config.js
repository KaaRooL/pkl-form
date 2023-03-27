module.exports = {
  apps : [{
    name   : "pkl-solina",
    script : "./app.js",
	time: true,
    env: {
            "PORT": 4000,
            "NODE_ENV": "production"
    },    
    env_development: {
       NODE_ENV: "development"
    }
  }]
}
