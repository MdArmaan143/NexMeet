let IS_PROD = true;



const servers = IS_PROD ?
"https://nexmeet-znmq.onrender.com" :
   "http://localhost:8000"
    

export default servers;