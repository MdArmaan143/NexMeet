let IS_PROD = true;



const servers = IS_PROD ?
"https://nexmeet-w2t6.onrender.com" :
   "http://localhost:8000"
    

export default servers;