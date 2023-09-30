class Node {
    id;
    title;
    stage;

    constructor(title){
        this.id = this.generateRandomString(); 
        this.title = title; 
    }
  
    generateRandomString(length = 8) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters[randomIndex];
        }
        
        return randomString;
    }

}

export default Node; 